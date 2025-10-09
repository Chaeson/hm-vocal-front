// frontend/src/pages/AboutPage.js
import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const Section = styled.section`
  margin-bottom: 4rem;
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionImage = styled.img`
  width: 100%;
  max-width: 900px;
  height: auto;
  border-radius: 12px;
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-color, #3498db);
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  white-space: pre-wrap; /* 줄바꿈과 공백을 유지합니다. */
  word-break: keep-all;
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <Section>
        {/* 나중에 이 이미지를 교체하세요 */}
        <SectionImage 
          src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="학원 전경 또는 레슨 환경"
        />
        <ContentWrapper>
          <SectionTitle>최고의 보컬 교육, 당신의 꿈을 현실로</SectionTitle>
          <Paragraph>
            저희 보컬 학원은 수년간의 교육 경험과 체계적인 커리큘럼을 바탕으로, 
            모든 수강생이 자신의 목소리를 발견하고 발전시킬 수 있도록 돕습니다. 
            취미부터 전문 입시까지, 당신의 꿈을 향한 여정에 든든한 파트너가 되겠습니다.
          </Paragraph>
        </ContentWrapper>
      </Section>

      <Section>
        {/* 나중에 이 이미지를 교체하세요 */}
        <SectionImage 
          src="https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="강사진 또는 교육 철학 관련 이미지"
        />
        <ContentWrapper>
          <SectionTitle>우리의 교육 철학</SectionTitle>
          <Paragraph>
            단순한 기술 교육을 넘어, 음악을 통해 자신을 표현하고 세상과 소통하는 즐거움을 가르칩니다. 
            개개인의 특성과 목표에 맞춘 1:1 맞춤형 레슨으로 잠재력을 최대한 이끌어냅니다.
          </Paragraph>
        </ContentWrapper>
      </Section>

    </PageContainer>
  );
};

export default AboutPage;
