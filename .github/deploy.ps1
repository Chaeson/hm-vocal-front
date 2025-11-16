param(
    [Parameter(Mandatory=$true)]
    [string]$SshKey,

    [Parameter(Mandatory=$true)]
    [string]$TargetHost
)

# =================================================================
# React 앱 OCI 원격 배포 스크립트 (Windows PowerShell 버전)
# 사용법: .\deploy.ps1 -SshKey "C:\path\to\key.pem" -TargetHost "158.180.83.230"
# =================================================================

$TargetUser = "opc"
$TargetPath = "/home/opc/hm-vocal-front/build"
$NginxUser = "nginx"
$AppDir = "/home/opc/hm-vocal-front"

# --- 1. 로컬 환경에서 Git Pull 및 빌드 시작 ---
Write-Host "--- 1. Build 시작---"

# Git Pull
try {
    git pull | Out-Null
} catch {
    Write-Error "오류: Git pull 실패."
    exit 1
}

# NPM 의존성 설치 및 빌드
try {
    npm install | Out-Null
    npm run build | Out-Null
} catch {
    Write-Error "오류: npm install 또는 npm run build 실패."
    exit 1
}
Write-Host "빌드 완료: './build' 폴더 생성됨."


# --- 2. OCI 인스턴스로 빌드 파일 전송 ---
Write-Host "--- 2. OCI 인스턴스로 빌드 파일 전송 시작 ---"

# 2-1. 원격 기존 파일 삭제
$remoteDeleteCommand = "sudo rm -rf ${TargetPath}/*"
ssh -i $SshKey ${TargetUser}@${TargetHost} $remoteDeleteCommand

# 2-2. 새 빌드 파일 전송 (Windows 환경에서는 PowerShell의 기본 경로를 사용)
# -r 플래그는 scp의 기본 동작에 포함되어 있으나, 경로 지정에 주의해야 합니다.
try {
# .\\build\* 는 현재 디렉토리의 build 폴더 내부 모든 파일을 의미합니다.
scp -i $SshKey -r .\\build\\* ${TargetUser}@${TargetHost}:"${TargetPath}"
} catch {
Write-Error "오류: SCP 파일 전송 실패."
exit 1
}
Write-Host "파일 전송 완료."

# --- 3. 원격 서버에서 Nginx 권한 및 서비스 재시작 ---
Write-Host "--- 3. 원격 서버 권한 재설정 및 Nginx 재시작 ---"

# 원격 실행할 명령어들을 세미콜론(;)으로 구분하여 하나의 문자열로 묶습니다.
$remoteCommands = @(
"sudo chown -R ${NginxUser}:${NginxUser} ${TargetPath}",
"sudo chcon -R -t httpd_sys_content_t ${TargetPath}",
"sudo systemctl restart nginx",
"sudo systemctl status nginx | grep Active"
)

# 배열의 명령어들을 세미콜론으로 연결하여 한 번의 SSH 세션으로 실행
$commandString = $remoteCommands -join ";"
ssh -i $SshKey ${TargetUser}@${TargetHost} $commandString

if ($LASTEXITCODE -ne 0) {
Write-Error "오류: 원격 서버 명령어 실행 실패."
exit 1
}

Write-Host "배포 완료! Nginx가 재시작되었으며 새 파일을 서비스 중입니다."
Write-Host "접속 주소: http://${TargetHost}"