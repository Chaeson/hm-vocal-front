// frontend/src/components/layout/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.footer`
  background: var(--footer-background-color);
  color: #ecf0f1;
  padding: 0.5rem 2rem; /* 3분의 1 수준으로 padding 값 수정 */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Footer = () => {
  return (
    <FooterBlock>
      <FooterContent>
        <p>Vocal Academy | 대표: 김제미니</p>
        <p>주소: 서울특별시 중구 세종대로 110</p>
        <p>Copyright © 2024 Vocal Academy. All rights reserved.</p>
      </FooterContent>
    </FooterBlock>
  );
};

export default Footer;
