import axios from 'axios';

// 1. 환경 변수에서 API 기본 URL을 가져옵니다.
const baseURL = import.meta.env.VITE_API_BASE_URL;

// [수정] 환경 변수 로딩 확인을 위한 디버깅 코드
console.log('API Base URL from .env:', baseURL);

// 2. 기본 URL이 설정되었는지 확인하고, 설정되지 않았다면 경고 메시지와 함께 폴백 주소를 사용합니다.
if (!baseURL) {
  console.warn(
    `%c[경고] VITE_API_BASE_URL이 .env 파일에 설정되지 않았습니다. 임시 주소로 요청합니다.`,
    'color: yellow; font-weight: bold;'
  );
}

// 3. 기본 URL이 설정된 axios 인스턴스를 생성합니다.
//    환경 변수가 없을 경우를 대비하여 임시 주소를 || 연산자로 추가합니다.
const apiClient = axios.create({
  baseURL: baseURL || 'http://158.180.83.230:8080',
});

// 4. 생성한 인스턴스를 내보냅니다.
export default apiClient;
