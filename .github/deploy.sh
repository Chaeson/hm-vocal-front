#!/bin/bash

# =================================================================
# React 앱 OCI 원격 배포 스크립트 (로컬 빌드 후 전송)
# 사용법: ./deploy.sh <개인_키_파일.pem> <OCI_공인_IP>
# 예: ./deploy.sh ~/.ssh/oci_key.pem 158.180.83.230
# =================================================================

# 1. 변수 설정 및 인수 확인
if [ "$#" -ne 2 ]; then
    echo "사용법: $0 <개인_키_파일.pem> <OCI_공인_IP>"
    exit 1
fi

SSH_KEY="C:\project\keys\hm-vocal\test-1109.pem"
TARGET_HOST="158.180.83.230"
TARGET_USER="opc"
TARGET_PATH="C:\Users\only9\IdeaProjects\vocal-web-v2\frontend\build"
NGINX_USER="nginx"
APP_DIR="C:\Users\only9\IdeaProjects\vocal-web-v2\frontend"

echo "--- 1. 로컬 환경에서 Git Pull 및 빌드 시작 ---"

# 최신 소스 코드 가져오기
git pull
if [ $? -ne 0 ]; then
    echo "오류: Git pull 실패."
    exit 1
fi

# NPM 의존성 설치 및 React 앱 빌드
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "오류: npm install 또는 npm run build 실패. 메모리 또는 빌드 설정 확인."
    exit 1
fi

echo "빌드 완료: './build' 폴더 생성됨."

# 2. OCI 인스턴스로 빌드 파일 전송
echo "--- 2. OCI 인스턴스로 빌드 파일 전송 시작 ---"

# 기존 빌드 폴더의 내용을 삭제하고 새 파일 전송 (원자성 확보)
ssh -i "$SSH_KEY" "${TARGET_USER}@${TARGET_HOST}" "sudo rm -rf ${TARGET_PATH}/*"
if [ $? -ne 0 ]; then
    echo "경고: 원격 기존 파일 삭제 실패. 권한 문제일 수 있습니다. 계속 진행합니다."
fi

# 새 빌드 파일 전송
scp -i "$SSH_KEY" -r ./build/* "${TARGET_USER}@${TARGET_HOST}":"${TARGET_PATH}"
if [ $? -ne 0 ]; then
    echo "오류: SCP 파일 전송 실패."
    exit 1
fi

echo "파일 전송 완료."

# 3. 원격 서버에서 Nginx 권한 및 서비스 재시작
echo "--- 3. 원격 서버 권한 재설정 및 Nginx 재시작 ---"

SSH_COMMANDS="
# 1. 파일 시스템 권한 재설정
sudo chown -R ${NGINX_USER}:${NGINX_USER} ${TARGET_PATH};

# 2. SELinux 컨텍스트 재설정 (SELinux 활성화 환경 가정)
sudo chcon -R -t httpd_sys_content_t ${TARGET_PATH};

# 3. Nginx 서비스 재시작 (변경 사항 적용)
sudo systemctl restart nginx;

# 4. 서비스 상태 확인
sudo systemctl status nginx | grep Active
"

ssh -i "$SSH_KEY" "${TARGET_USER}@${TARGET_HOST}" "$SSH_COMMANDS"
if [ $? -ne 0 ]; then
    echo "오류: 원격 서버 명령어 실행 실패. SSH 키 권한 또는 서버 문제 확인."
    exit 1
fi

echo "배포 완료! Nginx가 재시작되었으며 새 파일을 서비스 중입니다."
echo "접속 주소: http://${TARGET_HOST}"