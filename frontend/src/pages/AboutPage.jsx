import React from 'react';
import styled from 'styled-components';
import aboutBg from '@/assets/images/about/about-bg.jpg';
import privateLesson from '@/assets/images/about/private-lesson.png';
import instructor from '@/assets/images/about/instructor.png';
import infra from '@/assets/images/about/infra.png';

// 전체 페이지 컨테이너
const PageContainer = styled.div`
    background-color: #0f0f0f;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow-x: hidden;
`;

// 배경 이미지 및 오버레이 처리
const BackgroundWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${aboutBg.src});
    background-size: cover;
    background-position: center;
    z-index: 0;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 100%);
        backdrop-filter: blur(8px);
    }
`;

// 실제 콘텐츠가 들어가는 레이아웃 (Grid)
const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: 100%;
    max-width: 1280px; /* 너무 넓게 퍼지지 않도록 제한 */
    padding: 4rem 2rem;
    position: relative;
    z-index: 1;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        padding: 2rem 1.5rem;
    }
`;

// 공통 카드 섹션 스타일 (Glassmorphism 적용)
const Section = styled.section`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.03); /* 아주 옅은 흰색 배경 */
    backdrop-filter: blur(10px); /* 유리 효과 */
    padding: 2.5rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08); /* 얇은 테두리 */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        background: rgba(255, 255, 255, 0.07);
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        border-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        padding: 2rem 1.5rem;
    }
`;

// 오른쪽 긴 섹션 (Sticky 효과 제거 및 스타일 통일)
const TallSection = styled(Section)`
    grid-column: 2;
    grid-row: 1 / span 3;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.4); /* 오른쪽은 조금 더 어둡게 */
    border: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 1024px) {
        grid-column: 1;
        grid-row: auto;
        align-items: center;
    }
`;

const SectionImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
        margin-bottom: 1rem;
    }
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TallSectionContent = styled(ContentWrapper)`
    padding-top: 0;
    width: 100%;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    /* 제목 아래 짧은 밑줄 포인트 */
    &::after {
        content: '';
        display: block;
        width: 40px;
        height: 2px;
        background: #fff; /* 포인트 컬러가 있다면 변경 가능 (예: #ffd700) */
        margin-left: 10px;
        opacity: 0.5;
    }

    @media (max-width: 768px) {
        justify-content: center;
        &::after {
            display: none;
        }
    }
`;

const Paragraph = styled.p`
    font-size: 0.95rem;
    line-height: 1.7;
    color: #cccccc;
    white-space: pre-wrap;
    word-break: keep-all;
    font-weight: 300;
    margin: 0;

    /* 강조하고 싶은 부분에 대한 스타일링 가능성 열어둠 */
    strong {
        color: #fff;
        font-weight: 600;
    }
`;

// 오른쪽 섹션 전용 타이틀 스타일 재정의
const MainTitle = styled(SectionTitle)`
    font-size: 2rem;
    margin-bottom: 2rem;
    line-height: 1.3;

    &::after {
        display: none;
    }
`;

const AboutPage = () => {
    return (
        <PageContainer>
            <BackgroundWrapper /> {/* 배경 분리 */}
            <LayoutContainer>

                {/* 왼쪽 컬럼: 개별 특징들 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Section>
                        <ContentWrapper>
                            <SectionTitle>1:1 프라이빗 레슨 중심</SectionTitle>
                            <Paragraph>{`보   컬 : 녹음실 디렉팅 기반의 발성·보이스 교정
작   곡 : 멜로디·코드·미디·비트 메이킹·사운드 엔지니어링 등 프로듀서에게 필요한 전 과정을 체계 교육
피아노/기타 : 곡 리하모니를 통한 창의성 중심 교육`}</Paragraph>
                        </ContentWrapper>
                    </Section>

                    <Section>
                        <ContentWrapper>
                            <SectionTitle>검증된 강사진</SectionTitle>
                            <Paragraph>{`HM VOCAL 강사진은 서울예대·호원대·한양대 등 출신, 현업에서 활동하며
교육청에 정식 등록된 전문 강사진으로 구성되어 있습니다.`}</Paragraph>
                        </ContentWrapper>
                    </Section>

                    <Section>
                        <ContentWrapper>
                            <SectionTitle>전문적인 시설 인프라</SectionTitle>
                            <Paragraph>{`- 앨범 제작까지 가능한 전문 스튜디오
- 총 20개의 개인 연습실 및 12개의 레슨실
- 개인 MIDI 작업실 분리 운영
- 화재보험·책임배상 보험 등록 완료로 안전 강화`}</Paragraph>
                        </ContentWrapper>
                    </Section>
                </div>

                {/* 오른쪽 컬럼: 브랜드 아이덴티티 */}
                <TallSection>
                    <TallSectionContent>
                        <MainTitle>
                            HM VOCAL IDENTITY<br />
                            <span style={{ fontSize: '1.2rem', fontWeight: '400', opacity: '0.8' }}>음악의 본질을 <br/>탐구하는 공간
                            </span>
                        </MainTitle>
                        <Paragraph style={{ fontSize: '1.05rem', lineHeight: '1.9' }}>
                            {`HM VOCAL은 단순한 실용음악 교육 기관이 아닙니다.
학생 한 명, 한 명의 음악적 가능성을 입체적으로 분석하고,
그 가능성이 온전히 실현될 수 있도록 설계된 전문 뮤지션 양성 아카데미입니다.

대중음악의 가치가 더욱 높아진 지금,
우리는 현장에서 쌓아온 실제 경험과 예술적 기준을 토대로
보다 깊고 정교한 음악 교육을 제공합니다.

"뮤지션을 만드는 교육, 원칙을 지키는 교육"

HM VOCAL은 수많은 가수들과의 곡 작업·보컬 디렉팅·트레이닝 경험을 기반으로 음악적인 감각을 갖춘 뮤지션을 양성하는 것을 목표로 합니다.

원장 안창현`}
                        </Paragraph>
                    </TallSectionContent>
                </TallSection>

            </LayoutContainer>
        </PageContainer>
    );
};

export default AboutPage;