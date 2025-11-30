const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const multer = require('multer');
const os = require('oci-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Firebase Admin SDK 초기화
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// --- OCI Object Storage 설정 ---
const { SimpleAuthenticationDetailsProvider, Region } = require('oci-common');

// Private Key 처리: 환경변수에 직접 넣거나 파일 경로를 사용
let privateKey = process.env.OCI_PRIVATE_KEY;
if (!privateKey && process.env.OCI_PRIVATE_KEY_PATH) {
  try {
    privateKey = fs.readFileSync(path.resolve(process.env.OCI_PRIVATE_KEY_PATH), 'utf8');
  } catch (e) {
    console.error('Failed to read private key file:', e);
  }
} else if (privateKey) {
  // 환경변수에서 줄바꿈 문자 처리 (\n -> 실제 줄바꿈)
  privateKey = privateKey.replace(/\\n/g, '\n');
}

const region = process.env.OCI_REGION ? Region.fromRegionId(process.env.OCI_REGION) : undefined;

// Debug: Check environment variables
console.log('--- OCI Configuration Check ---');
console.log('OCI_TENANCY_ID:', process.env.OCI_TENANCY_ID ? 'Set' : 'Missing');
console.log('OCI_USER_ID:', process.env.OCI_USER_ID ? 'Set' : 'Missing');
console.log('OCI_FINGERPRINT:', process.env.OCI_FINGERPRINT ? 'Set' : 'Missing');
console.log('OCI_REGION:', process.env.OCI_REGION ? 'Set' : 'Missing');
console.log('OCI_PRIVATE_KEY_PATH:', process.env.OCI_PRIVATE_KEY_PATH ? 'Set' : 'Missing');
console.log('OCI_PRIVATE_KEY:', process.env.OCI_PRIVATE_KEY ? 'Set' : 'Missing');
if (privateKey) {
  console.log('Private Key Loaded. Length:', privateKey.length);
  console.log('Private Key Start:', privateKey.substring(0, 30));
} else {
  console.log('Private Key NOT Loaded');
}
console.log('-------------------------------');

const provider = new SimpleAuthenticationDetailsProvider(
  process.env.OCI_TENANCY_ID,
  process.env.OCI_USER_ID,
  process.env.OCI_FINGERPRINT,
  privateKey,
  null, // passphrase (if any)
  region
);

const objectStorageClient = new os.objectstorage.ObjectStorageClient({ authenticationDetailsProvider: provider });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB 제한
});

// --- API 엔드포인트 ---

// 테스트용 기본 API
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// [GET] /api/announcements - 모든 공지사항 조회
app.get('/api/announcements', async (req, res) => {
  try {
    const announcementsRef = db.collection('announcements');
    const snapshot = await announcementsRef.orderBy('createdAt', 'desc').get();

    const announcements = [];
    snapshot.forEach(doc => {
      announcements.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// [POST] /api/announcements - 공지사항 추가
app.post('/api/announcements', async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const newAnnouncement = {
      title,
      content,
      category: category || 'general',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('announcements').add(newAnnouncement);

    res.status(201).json({
      id: docRef.id,
      ...newAnnouncement,
      message: 'Announcement added successfully'
    });

  } catch (error) {
    console.error('Error adding announcement:', error);
    res.status(500).json({ message: 'Failed to add announcement', error: error.message });
  }
});

// [GET] /api/instructors - 모든 강사 정보 조회
app.get('/api/instructors', async (req, res) => {
  try {
    console.log('Fetching instructors from Firestore...');
    const instructorsRef = db.collection('instructors');
    const snapshot = await instructorsRef.get();

    console.log('Snapshot size:', snapshot.size);

    const instructors = [];
    snapshot.forEach(doc => {
      instructors.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log('Instructors fetched:', instructors.length);
    res.status(200).json(instructors);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      message: 'Something went wrong.',
      error: error.message,
      stack: error.stack
    });
  }
});

// [POST] /api/instructors - 강사 추가 (이미지 업로드 포함)
app.post('/api/instructors', upload.single('image'), async (req, res) => {
  try {
    const { name, cardBio, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    // 1. OCI Object Storage에 파일 업로드
    const namespace = process.env.OCI_NAMESPACE;
    const bucketName = process.env.OCI_BUCKET_NAME;
    const objectName = `instructors/${Date.now()}_${file.originalname}`;

    const putObjectRequest = {
      namespaceName: namespace,
      bucketName: bucketName,
      objectName: objectName,
      putObjectBody: file.buffer,
      contentLength: file.size,
      contentType: file.mimetype
    };

    await objectStorageClient.putObject(putObjectRequest);

    // 2. 퍼블릭 URL 생성
    const region = process.env.OCI_REGION || 'ap-seoul-1';
    const imageUrl = `https://objectstorage.${region}.oraclecloud.com/n/${namespace}/b/${bucketName}/o/${encodeURIComponent(objectName)}`;

    // 3. Firestore에 데이터 저장
    let parsedCategory = [];
    try {
      parsedCategory = JSON.parse(category);
    } catch (e) {
      parsedCategory = [category];
    }

    const newInstructor = {
      name,
      cardBio,
      category: parsedCategory,
      image: imageUrl,
      priority: 999,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('instructors').add(newInstructor);

    res.status(201).json({
      id: docRef.id,
      ...newInstructor,
      message: 'Instructor added successfully'
    });

  } catch (error) {
    console.error('Error adding instructor:', error);
    res.status(500).json({ message: 'Failed to add instructor', error: error.message });
  }
});

// [GET] /api/student-works - 모든 수강생 작품 조회
app.get('/api/student-works', async (req, res) => {
  try {
    const worksRef = db.collection('student_works');
    const snapshot = await worksRef.orderBy('createdAt', 'desc').get();

    const works = [];
    snapshot.forEach(doc => {
      works.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json(works);
  } catch (error) {
    console.error('Error fetching student works:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// [POST] /api/student-works - 수강생 작품 등록
// 50MB 제한, coverImage(필수), mediaFile(선택: 영상/음원)
app.post('/api/student-works', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'mediaFile', maxCount: 1 }]), async (req, res) => {
  try {
    const { category, title, studentName } = req.body;
    const files = req.files;

    if (!files || !files.coverImage) {
      return res.status(400).json({ message: 'Cover image is required.' });
    }

    const namespace = process.env.OCI_NAMESPACE;
    const bucketName = process.env.OCI_BUCKET_NAME;
    const region = process.env.OCI_REGION || 'ap-seoul-1';

    // 1. Cover Image Upload
    const coverFile = files.coverImage[0];
    const coverObjectName = `student-works/covers/${Date.now()}_${coverFile.originalname}`;

    await objectStorageClient.putObject({
      namespaceName: namespace,
      bucketName: bucketName,
      objectName: coverObjectName,
      putObjectBody: coverFile.buffer,
      contentLength: coverFile.size,
      contentType: coverFile.mimetype
    });

    const coverUrl = `https://objectstorage.${region}.oraclecloud.com/n/${namespace}/b/${bucketName}/o/${encodeURIComponent(coverObjectName)}`;

    // 2. Media File Upload (if exists)
    let mediaUrl = null;
    if (files.mediaFile) {
      const mediaFile = files.mediaFile[0];
      const mediaObjectName = `student-works/media/${Date.now()}_${mediaFile.originalname}`;

      await objectStorageClient.putObject({
        namespaceName: namespace,
        bucketName: bucketName,
        objectName: mediaObjectName,
        putObjectBody: mediaFile.buffer,
        contentLength: mediaFile.size,
        contentType: mediaFile.mimetype
      });

      mediaUrl = `https://objectstorage.${region}.oraclecloud.com/n/${namespace}/b/${bucketName}/o/${encodeURIComponent(mediaObjectName)}`;
    }

    // 3. Firestore Save
    const newWork = {
      category, // 'Video', 'Recording', 'Album'
      title,
      studentName,
      coverImage: coverUrl,
      mediaFile: mediaUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('student_works').add(newWork);

    res.status(201).json({
      id: docRef.id,
      ...newWork,
      message: 'Student work registered successfully'
    });

  } catch (error) {
    console.error('Error adding student work:', error);
    res.status(500).json({ message: 'Failed to add student work', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
