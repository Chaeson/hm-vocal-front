// frontend/src/pages/ContactPage.js
import React, { useState } from 'react';
import styled from 'styled-components';

// --- 상담 시간 데이터 ---
const timeSlots = [
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
];

// --- 스타일 컴포넌트 ---
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
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
  max-width: 700px;
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

// --- 상담 신청 폼 스타일 (수정됨) ---
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #444;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: var(--primary-color); }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: '▼';
    font-size: 0.8rem;
    color: #888;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; // 화살표 뒤의 select가 클릭되도록 설정
  }
`;

const Select = styled.select`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  width: 100%;
  appearance: none; // 브라우저 기본 화살표 제거
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const TimeSlotButton = styled.button`
  padding: 0.7rem;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : '#ddd'};
  background-color: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : '#555'};
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    color: ${props => props.active ? 'white' : 'var(--primary-color)'};
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  &:focus { outline: none; border-color: var(--primary-color); }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background-color: var(--primary-color);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

// --- 메인 컴포넌트 ---
const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('kakao');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lessonType: 'vocal',
    consultTime: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, consultTime: time }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consultTime) {
      alert('상담 가능 시간을 선택해주세요.');
      return;
    }
    console.log('Form Submitted:', formData);
    alert('상담 신청이 접수되었습니다. 감사합니다!');
    setFormData({ name: '', email: '', lessonType: 'vocal', consultTime: '', message: '' });
  };

  return (
    <PageContainer>
      <h1>📞 문의하기</h1>
      <TabNav>
        <TabButton className={activeTab === 'kakao' ? 'active' : ''} onClick={() => setActiveTab('kakao')}>카톡 문의</TabButton>
        <TabButton className={activeTab === 'form' ? 'active' : ''} onClick={() => setActiveTab('form')}>상담 신청</TabButton>
      </TabNav>

      <ContentWrapper>
        {activeTab === 'kakao' && (
          <KakaoCard>
            <p style={{fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.5rem'}}>가장 빠르고 간편하게<br/>상담을 받아보세요!</p>
            <KakaoButton href="#" target="_blank" rel="noopener noreferrer">
              <span>💬</span>
              <span>카톡으로 바로 문의</span>
            </KakaoButton>
          </KakaoCard>
        )}

        {activeTab === 'form' && (
          <FormContainer onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">이름</Label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="성함을 입력해주세요" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">이메일 또는 연락처</Label>
              <Input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="답변 받으실 곳을 입력해주세요" required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lessonType">상담 종류</Label>
              <SelectWrapper>
                <Select id="lessonType" name="lessonType" value={formData.lessonType} onChange={handleChange}>
                  <option value="vocal">보컬 레슨</option>
                  <option value="instrument">악기 레슨</option>
                </Select>
              </SelectWrapper>
            </FormGroup>
            <FormGroup>
              <Label>상담 가능 시간 (선택)</Label>
              <TimeSlotGrid>
                {timeSlots.map(time => (
                  <TimeSlotButton
                    key={time}
                    type="button"
                    active={formData.consultTime === time}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </TimeSlotButton>
                ))}
              </TimeSlotGrid>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">문의 내용</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="문의하실 내용을 자세하게 적어주세요" required />
            </FormGroup>
            <SubmitButton type="submit">신청서 접수</SubmitButton>
          </FormContainer>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ContactPage;
