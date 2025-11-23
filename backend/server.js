const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

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

// [GET] /api/instructors - 모든 강사 정보 조회 (카테고리 및 우선순위 정렬)
app.get('/api/instructors', async (req, res) => {
  try {
    const instructorsRef = db.collection('instructors');
    // 카테고리별로 정렬 후, 각 카테고리 내에서 priority(우선순위)로 정렬
    const snapshot = await instructorsRef.orderBy('category').orderBy('priority').get();

    const instructors = [];
    snapshot.forEach(doc => {
      instructors.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json(instructors);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
