import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.footer`
  background: var(--footer-background-color, #2c3e50);
  color: white;
  padding: 3rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
`;

const InfoSection = styled.div`
  flex: 2;
  min-width: 250px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #bdc3c7;
  }
`;

const LinksSection = styled.div`
  flex: 1;
  min-width: 150px;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--primary-color, #3498db);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #34495e;
  font-size: 0.8rem;
  color: #7f8c8d;
`;

const Footer = () => {
  return (
    <FooterBlock>
      <FooterContent>
        <InfoSection>
          <h3>HM Vocal Academy</h3>
          <p>주소: 인천타워대로 54번길 9, 에몬스프라자 3층 (송도동 9-19)</p>
          <p>전화: 032-858-6555</p>
          <p>이메일: hm_vocal@naver.com</p>
        </InfoSection>
        <LinksSection>
          <h4>바로가기</h4>
          <ul>
            <li><a href="/about">학원소개</a></li>
            <li><a href="/programs">교육과정</a></li>
            <li><a href="/contact">문의하기</a></li>
          </ul>
        </LinksSection>
        <LinksSection>
          <h4>소셜</h4>
          <ul>
            <li><a href="https://blog.naver.com/hm_vocal">블로그</a></li>
            <li><a href="https://www.instagram.com/hmvocal/">인스타그램</a></li>
            <li><a href="https://www.youtube.com/@hmvocal2001">YouTube</a></li>
          </ul>
        </LinksSection>
      </FooterContent>
      <Copyright>
        &copy; {new Date().getFullYear()}HM Vocal Academy. All Rights Reserved.
      </Copyright>
    </FooterBlock>
  );
};

export default Footer;
