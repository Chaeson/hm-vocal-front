// frontend/src/pages/AboutPage.jsx
import React from 'react';
import styled from 'styled-components';


import aboutImage1 from '../assets/images/about/Sample1.png';
import aboutImage2 from '../assets/images/about/Sample2.png';
import aboutImage3 from '../assets/images/about/Sample3.png';
import aboutImage4 from '../assets/images/about/Sample4.png';

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
  max-width: 2300px;
  height: auto;
  border-radius: 12px;
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  max-width: 2300px;
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
  white-space: pre-wrap;
  word-break: keep-all;
`;

const AboutPage = () => {
  return (
    <PageContainer>

      <Section>
        <SectionImage
          src={aboutImage1.src}
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
              <SectionImage
                src={aboutImage2.src}
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
                    <SectionImage
                      src={aboutImage3.src}
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
                          <SectionImage
                            src={aboutImage4.src}
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

    </PageContainer>
  );
};

export default AboutPage;
