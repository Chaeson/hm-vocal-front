import React, { useState } from 'react';
import styled from 'styled-components';

// --- QnA 데이터 ---
const qnaData = [
  {
    id: 1,
    question: 'Q1. 수강료는 어떻게 안내받을 수 있나요?',
    answer: 'A. 수강료는 학생의 목표와 과정 구성에 따라 상이하여, 정확한 상담을 위해 유선 안내를 원칙으로 하고 있습니다.\n 전화 또는 카카오톡으로 문의 주시면 친절하고 빠르게 안내드리겠습니다.',
  },
  {
    id: 2,
    question: 'Q2. 레슨 일정 조율은 어떻게 이루어지나요?',
    answer: 'A. 기본적으로 고정 스케줄로 수업이 진행되며, 사전 연락을 주신 경우에 한해 가능한 범위 내에서 일정 조율 및 보강이 가능합니다.\n 원활한 수업 운영을 위해 일정 변경은 가급적 미리 요청해 주시면 감사하겠습니다.',
  },
  {
    id: 3,
    question: 'Q3. 결석 시 보강이 가능한가요?',
    answer: 'A. 당일 결석은 일정 변경 및 보강이 불가합니다.\n 사전에 연락 주시면 가능한 조율 방안을 안내드리고 있으니, 변경이 필요하시면 꼭 미리 말씀 부탁드립니다.',
  },
  {
    id: 4,
    question: 'Q4. 입시 준비는 어떤 방식으로 진행되나요?',
    answer: 'A. 학생의 실력과 목표 전공에 맞춰 개별 전략 기반의 맞춤형 커리큘럼으로 지도합니다.\n 상세한 준비 방향은 상담을 통해 정확히 안내드리고 있습니다.',
  },
  {
    id: 5,
    question: 'Q5. 체험 레슨이나 레벨테스트가 있나요?',
    answer: 'A. 체험 레슨은 운영하지 않습니다.\n 입시·오디션/프로 과정은 전문상담(유료)으로 진행되며, 이 과정에 레벨테스트가 포함되어 있습니다.\n 취미/직장인 과정의 경우 레벨테스트가 별도 비용으로 진행됩니다.\n 모든 테스트 및 상담 절차는 전화 문의 시 정확히 안내해드립니다.',
  },
  {
    id: 6,
    question: 'Q6. 연습실 이용은 어떻게 되나요?',
    answer: 'A. 수강생은 학원 연습실 이용이 가능합니다. 취미 과정은 1일 2시간 이용 가능, 입시 과정은 자유 이용이 가능합니다. 운영 시간은 상담 시 함께 안내드리고 있습니다.',
  },
];

// --- 스타일 컴포넌트 ---
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
  max-width: 900px;
  margin: 0 auto;
`;

const TabNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
`;

const TabButton = styled.button`
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  transition: all 0.3s ease;

  &.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
  }

  &:hover {
    color: var(--primary-color);
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

// --- 카톡 문의 섹션 스타일 ---
const KakaoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #FEE500;
  border-radius: 12px;
  padding: 3rem 2rem;
  color: #191919;
`;

const KakaoButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  color: #191919;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  }
`;

// --- QnA 리스트 스타일 ---
const QnaListContainer = styled.div`
  width: 100%;
  border-top: 2px solid var(--primary-color);
`;

const QnaItem = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }
`;

const ItemContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  white-space: pre-wrap;
  word-break: keep-all;
  background-color: #fdfdfd;
  border-top: 1px dashed #e0e0e0;
`;

// --- 메인 컴포넌트 ---
const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('kakao');
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <PageContainer>
      <h1>문의하기</h1>
      <TabNav>
        <TabButton className={activeTab === 'kakao' ? 'active' : ''} onClick={() => setActiveTab('kakao')}>카톡 문의</TabButton>
        <TabButton className={activeTab === 'qna' ? 'active' : ''} onClick={() => setActiveTab('qna')}>QnA</TabButton>
      </TabNav>

      <ContentWrapper>
        {activeTab === 'kakao' && (
          <KakaoCard>
            <p style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem'}}>가장 빠르고 간편하게<br/>궁금한 점을 해결해보세요!</p>
            <KakaoButton href="#" target="_blank" rel="noopener noreferrer">
              <span>💬</span>
              <span>카톡으로 바로 문의</span>
            </KakaoButton>
          </KakaoCard>
        )}

        {activeTab === 'qna' && (
          <QnaListContainer>
            {qnaData.map(item => (
              <QnaItem key={item.id}>
                <ItemHeader onClick={() => handleItemClick(item.id)}>
                  <h3>{item.question}</h3>
                </ItemHeader>
                {activeIndex === item.id && (
                  <ItemContent>{item.answer}</ItemContent>
                )}
              </QnaItem>
            ))}
          </QnaListContainer>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ContactPage;
