const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 11개의 더미 공지사항 데이터
const dummyAnnouncements = [
  { author: '관리자', title: '11월 정기 휴무 안내', content: '11월 25일은 학원 전체 정기 휴무일입니다. 이용에 착오 없으시길 바랍니다.' },
  { author: '관리자', title: '새로운 보컬 특강 개설!', content: 'R&B 보컬리스트 김미지 선생님의 특강이 12월 1일부터 시작됩니다. 많은 관심 바랍니다.' },
  { author: '관리자', title: '연말 공연 참가 신청 안내', content: '2024년 연말 정기 공연 참가 신청을 받습니다. 데스크에 문의해주세요.' },
  { author: '관리자', title: '시설 점검 안내 (11/20)', content: '11월 20일 오전 9시부터 11시까지 연습실 시설 점검이 있습니다.' },
  { author: '관리자', title: '주차장 이용 규칙 변경 안내', content: '2024년 12월 1일부터 학원 건물 주차장 이용 규칙이 변경됩니다. 자세한 내용은 공지사항을 확인해주세요.' },
  { author: '관리자', title: '새로운 기타 강사님 소개', content: '핑거스타일 전문 김준태 강사님이 새로 오셨습니다. 많은 응원 부탁드립니다.' },
  { author: '관리자', title: '오디션반 모의 오디션 일정', content: '오디션반 3분기 모의 오디션은 11월 마지막 주 금요일에 진행됩니다.' },
  { author: '관리자', title: '수강료 결제 시스템 변경 안내', content: '이제부터 온라인 카드 결제를 지원합니다.' },
  { author: '관리자', 'title': '학원 운영 시간 변경 안내', content: '동절기를 맞아 12월부터 학원 운영 시간이 오후 10시까지로 단축됩니다.' },
  { author: '관리자', title: '분실물 찾아가세요 (에어팟 프로)', content: '연습실에서 에어팟 프로가 발견되었습니다. 분실하신 분은 데스크에 문의해주세요.' },
  { author: '관리자', title: '홈페이지 리뉴얼 오픈!', content: '더욱 편리해진 새로운 홈페이지가 오픈되었습니다. 많은 이용 바랍니다.' },
];

// 강사 더미 데이터 (이미지 필드를 파일명으로 변경)
const dummyInstructors = [
  // Vocal Instructors
  {
    id: 'vocal1', name: '이대영', specialty: '팝, 발라드 전문',
    cardBio: '당신만의 목소리 톤과 감성을 찾아드립니다.',
    bio: '서울예술대학교 실용음악과 졸업. 다수 앨범 코러스 및 가이드 녹음 참여. 개인의 목소리 톤과 감성을 살리는 레슨으로 정평.',
    image: 'v_daeyoung_lee.jpg', // 파일명만 저장
    category: 'Vocal',
    priority: 1,
  },
  {
    id: 'vocal2', name: '추은경', specialty: 'R&B, 소울, 재즈',
    cardBio: '리듬과 그루브, 소울풀한 보컬의 모든 것.',
    bio: '버클리 음대 출신. 그루브와 리듬감을 중심으로 한 레슨 진행. 다수의 해외 공연 및 페스티벌 참가 경력.',
    image: 'v_eunkyoung_chu.jpg', // 파일명만 저장
    category: 'Vocal',
    priority: 2,
  },
  {
    id: 'vocal3', name: '김지연', specialty: '락, 메탈 고음 발성',
    cardBio: '파워풀한 고음, 시원하게 터뜨리는 법을 알려드립니다.',
    bio: '20년 경력의 락 밴드 프론트맨. 스크래치, 그로울링 등 파워풀한 발성법 전문. 수강생의 잠재된 에너지를 폭발시키는 수업.',
    image: 'v_jiyeon_kim.jpg', // 파일명만 저장
    category: 'Vocal',
    priority: 3,
  },
  {
    id: 'vocal4', name: '박지영', specialty: '뮤지컬, 가요',
    cardBio: '노래에 이야기를 담아내는 표현력과 테크닉.',
    bio: '현역 뮤지컬 배우. 풍부한 무대 경험을 바탕으로 한 표현력 중심의 레슨. 가요와 뮤지컬 넘버를 넘나드는 수업 진행.',
    image: 'v_jiyoung_park.jpg', // 파일명만 저장
    category: 'Vocal',
    priority: 4,
  },
  {
    id: 'vocal5', name: '김미지', specialty: '싱어송라이터 과정',
    cardBio: '나만의 노래를 만들고 부르는 가장 확실한 방법.',
    bio: '다수의 자작곡 앨범을 발매한 싱어송라이터. 작사, 작곡, 보컬 디렉팅까지 통합적인 레슨을 제공합니다.',
    image: 'v_miji_kim.jpg', // 파일명만 저장
    category: 'Vocal',
    priority: 5,
  },
  // Instrument Instructors
  {
    id: 'inst1', name: '김준태', specialty: '어쿠스틱, 핑거스타일',
    cardBio: '기타 한 대로 무대를 꽉 채우는 연주법.',
    bio: '유명 싱어송라이터들의 라이브 세션 및 편곡 참여. 코드 이론부터 고급 테크닉까지, 눈높이에 맞춘 체계적인 수업.',
    image: 'i_juntae_kim.jpg', // 파일명만 저장
    category: 'Instrument',
    priority: 1,
  },
  {
    id: 'inst2', name: '이슬비', specialty: '재즈, 반주법',
    cardBio: '코드만 보고도 자유롭게 연주하는 비법.',
    bio: '클래식과 재즈를 넘나드는 폭넓은 스펙트럼. 다수의 재즈 클럽 연주 및 뮤지컬 반주 경력. 실용적인 반주법 위주 레슨.',
    image: 'i_seulbee_lee.jpg', // 파일명만 저장
    category: 'Instrument',
    priority: 2,
  },
  // Writer Instructors (New Category)
  {
    id: 'writer1', name: '박작가', specialty: '작사, 작곡',
    cardBio: '나만의 감성으로 가사와 멜로디를 만드는 법.',
    bio: '히트곡 다수 보유 작사가/작곡가. 실전 노하우를 바탕으로 한 창작 레슨. 저작권 및 음원 유통 과정 안내.',
    image: 'v_daeyoung_lee.jpg', // 임시로 기존 이미지 파일명 사용
    category: 'Writer',
    priority: 1,
  },
];
const dummyAdminUser = [
    {
        id: 'hm-vocal-admin',
        password: 'hm-vocal-admin',
    }
]
// Firestore에 데이터 추가하는 함수
async function seedData() {
  console.log('더미 데이터 생성을 시작합니다...');

  // 공지사항 데이터 추가 (기존 로직 유지)
  const announcementsRef = db.collection('announcements');
  for (const announcement of dummyAnnouncements) {
    const existingDoc = await announcementsRef.where('title', '==', announcement.title).get();
    if (existingDoc.empty) {
      await announcementsRef.add({
        ...announcement,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }
  console.log('공지사항 더미 데이터 업데이트 완료.');

  // 강사 데이터 추가
  const instructorsRef = db.collection('instructors');
  for (const instructor of dummyInstructors) {
    const existingDoc = await instructorsRef.where('id', '==', instructor.id).get();
    if (existingDoc.empty) {
      await instructorsRef.add({
        ...instructor,
        registeredAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }
  console.log('강사 더미 데이터 업데이트 완료.');

  const adminRef = db.collection('adminUser');
  for (const adminUser of dummyAdminUser) {
      const existingDoc = adminRef.where('id', '==', adminUser.id).get();
      if (existingDoc.empty) {
          await adminRef.add({
              ...adminUser,
              registeredAt: admin.firestore.FieldValue.serverTimestamp(),
          });
      }
  }
  console.log('회원 업데이트 완료')
}

seedData().catch(console.error);
