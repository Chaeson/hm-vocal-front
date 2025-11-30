import React from 'react';
import styled from 'styled-components';
import aboutBg from '@/assets/images/about/about-bg.jpg';

const PageContainer = styled.div`
    background-color: #f8f9fa;
    min-height: 100vh;
`;

const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, auto);
    gap: 0;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    position: relative;
    background-image: url(${aboutBg});
    background-size: cover;
    background-position: center;
    padding: 3rem 4rem;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.85);
        z-index: 0;
    }

    @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        padding: 2rem;
    }
`;

const Section = styled.section`
    display: flex;
    align-items: center;
    gap: 2rem;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 2px solid #e74c3c;

    @media (max-width: 768px) {
        flex-direction: column !important;
        padding: 1.5rem;
    }
`;

// 오른쪽의 긴 섹션
const TallSection = styled(Section)`
    grid-column: 2;
    grid-row: 1 / span 3; // 1번 행에서 시작해서 3개의 행을 차지
    flex-direction: column;
    
    @media (max-width: 1024px) {
        // 미디어 쿼리에서는 grid 속성을 초기화
        grid-column: auto;
        grid-row: auto;
    }
`;

const SectionImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 12px; // 둥근 사각형
    object-fit: cover;
    flex-shrink: 0;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
`;

const ContentWrapper = styled.div`
    text-align: left;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const TallSectionImage = styled(SectionImage)`
    width: 120px;
    height: 120px;
`;

const TallSectionContent = styled(ContentWrapper)`
    width: 100%;
    padding-top: 1rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #555;
`;

const Paragraph = styled.p`
    font-size: 1rem;
    line-height: 1.7;
    color: #555;
    white-space: pre-wrap;
    word-break: keep-all;
`;

const AboutPage = () => {
    return (
        <PageContainer>
            <LayoutContainer>
                {/* Column 1 */}
                <Section>
                    <SectionImage src="https://via.placeholder.com/100/3498db/FFFFFF?text=Edu" alt="보컬 교육 아이콘" />
                    <ContentWrapper>
                        <SectionTitle>1:1 프라이빗 레슨 중심</SectionTitle>
                        <Paragraph>{`보   컬 : 녹음실 디렉팅 기반의 발성·보이스 교정

작   곡 : 멜로디·코드·미디·비트 메이킹·사운드 엔지니어링 등 프로듀서에게 필요한 전 과정을 체계 교육

피아노/기타 : 곡 리하모니를 통한 창의성 중심 교육`}</Paragraph>
                    </ContentWrapper>
                </Section>

                <Section>
                    <SectionImage src="https://via.placeholder.com/100/2ecc71/FFFFFF?text=System" alt="커리큘럼 아이콘" />
                    <ContentWrapper>
                        <SectionTitle>검증된 강사진</SectionTitle>
                        <Paragraph>{`HM VOCAL 강사진은 서울예대·호원대·한양대 등 출신, 현업에서 활동하며 
교육청에 정식 등록된 전문 강사진으로구성되어 있습니다`}</Paragraph>
                    </ContentWrapper>
                </Section>

                <Section>
                    <SectionImage src="https://via.placeholder.com/100/e74c3c/FFFFFF?text=Tutor" alt="강사진 아이콘" />
                    <ContentWrapper>
                        <SectionTitle>전문적인 시설 인프라</SectionTitle>
                        <Paragraph>{`- 앨범 제작까지 가능한 전문 스튜디오
- 총 20개의 개인 연습실
- 12개의 레슨실
- 개인 MIDI 작업실 분리 운영
- 화재보험·책임배상 보험 등록 완료로 안전 강화`}</Paragraph>
                    </ContentWrapper>
                </Section>

                {/* Column 2 */}
                <TallSection>
                    <TallSectionImage src="https://via.placeholder.com/120/f39c12/FFFFFF?text=Result" alt="성과 아이콘" />
                    <TallSectionContent>
                        <SectionTitle>{`HM VOCAL IDENTITY
음악의 본질을 깊이 있게 탐구하는 공간`}</SectionTitle>
                        <Paragraph>{`HM VOCAL은 단순한 실용음악 교육 기관이 아닙니다.
학생 한 명, 한 명의 음악적 가능성을 입체적으로 분석하고,
그 가능성이 온전히 실현될 수 있도록 설계된 전문 뮤지션 양성 아카데미입니다.

대중음악의 가치가 더욱 높아진 지금,
우리는 현장에서 쌓아온 실제 경험과 예술적 기준을 토대로
보다 깊고 정교한 음악 교육을 제공합니다.

"뮤지션을 만드는 교육, 원칙을 지키는 교육"
HM VOCAL은 수많은 가수들과의 곡 작업·보컬 디렉팅·트레이닝 경험을 기반으로
음악적인 감각을 갖춘 뮤지션을 양성하는 것을 목표로 합니다.

원장 안창현`}</Paragraph>
                    </TallSectionContent>
                </TallSection>
            </LayoutContainer>
        </PageContainer>
    );
};

export default AboutPage;
