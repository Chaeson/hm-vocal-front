import React from 'react';
import styled from 'styled-components';
import aboutBg from '@/assets/images/about/about-bg.jpg';
import privateLesson from '@/assets/images/about/private-lesson.png';
import instructor from '@/assets/images/about/instructor.png';
import infra from '@/assets/images/about/infra.png';

const PageContainer = styled.div`
    background-color: #1a1a1a; /* 어두운 배경색 기본 */
    min-height: 100vh;
`;

const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, auto);
    gap: 2.5rem;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    position: relative;
    background-image: url(${aboutBg.src});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 0rem;

    /* 배경 이미지 위에 어두운 오버레이와 블러 효과 */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        z-index: 1;
    }

    @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        padding: 0rem;
        background-attachment: scroll;
    }
`;

const Section = styled.section`
    display: flex;
    align-items: center;
    gap: 1rem;
    background: transition; /* 반투명 어두운 배경 */
    padding: 0rem 1.0rem;
    border-radius: 0px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.4);
        transform: translateY(-5px);
        box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
    }

    @media (max-width: 768px) {
        flex-direction: column !important;
        padding: 1rem;
    }
`;

// 오른쪽의 긴 섹션
const TallSection = styled(Section)`
    grid-column: 2;
    grid-row: 1 / span 3;
    flex-direction: column;
`;

const SectionImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 0px;
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: 0 rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        width: 90px;
        height: 90px;
    }
`;

const ContentWrapper = styled.div`
    text-align: left;

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const TallSectionImage = styled(SectionImage)`
    width: 130px;
    height: 130px;
`;

const TallSectionContent = styled(ContentWrapper)`
    width: 100%;
    padding-top: 1.5rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.9rem;
    font-weight: 700;
    margin-bottom: 1.2rem;
    color: #fff;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
`;

const Paragraph = styled.p`
    font-size: 1.05rem;
    line-height: 1.8;
    color: #e0e0e0; /* 순백색보다 부드러운 색상 */
    white-space: pre-wrap;
    word-break: keep-all;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
`;

const AboutPage = () => {
    return (
        <PageContainer>
            <LayoutContainer>
                {/* Column 1 */}
                <Section>
                    <SectionImage src={privateLesson.src} alt="보컬 교육 아이콘" />
                    <ContentWrapper>
                        <SectionTitle>1:1 프라이빗 레슨 중심</SectionTitle>
                        <Paragraph>{`보   컬 : 녹음실 디렉팅 기반의 발성·보이스 교정
작   곡 : 멜로디·코드·미디·비트 메이킹·사운드 엔지니어링 등 프로듀서에게 필요한 전 과정을 체계 교육
피아노/기타 : 곡 리하모니를 통한 창의성 중심 교육`}</Paragraph>
                    </ContentWrapper>
                </Section>

                <Section>
                    <SectionImage src={instructor.src} alt="커리큘럼 아이콘" />
                    <ContentWrapper>
                        <SectionTitle>검증된 강사진</SectionTitle>
                        <Paragraph>{`HM VOCAL 강사진은 서울예대·호원대·한양대 등 출신, 현업에서 활동하며
교육청에 정식 등록된 전문 강사진으로구성되어 있습니다`}</Paragraph>
                    </ContentWrapper>
                </Section>

                <Section>
                    <SectionImage src={infra.src} alt="강사진 아이콘" />
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
