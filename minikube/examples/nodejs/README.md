# Dice Server - NodeJS 모니터링 예제

이 프로젝트는 Kubernetes 환경에서 OpenTelemetry를 사용한 모니터링을 보여주는 NodeJS 예제 애플리케이션입니다. 주사위를 굴리는 간단한 Express 서버로, Grafana LGTM 스택(Loki, Grafana, Tempo, Mimir)과 통합되어 있습니다.

## �� 주요 기능

- **주사위 굴리기 API**: `/rolldice` 엔드포인트로 주사위를 굴릴 수 있습니다
- **헬스체크**: `/healthz` 엔드포인트로 애플리케이션 상태 확인
- **인사말**: `/greet` 엔드포인트로 간단한 인사말
- **메트릭 수집**: Prometheus 메트릭 자동 수집
- **로깅**: Pino를 사용한 구조화된 로깅
- **분산 추적**: OpenTelemetry를 통한 분산 추적
- **자동 계측**: HTTP, Express 등 자동 계측

## 🛠 기술 스택

### 핵심 기술
- **Node.js 22.14.0** - 런타임 환경
- **TypeScript** - 타입 안전성
- **Express.js** - 웹 프레임워크
- **pnpm** - 패키지 매니저

### 모니터링 & 관찰성
- **OpenTelemetry** - 분산 추적, 메트릭, 로그 수집
- **Prometheus** - 메트릭 수집 및 노출
- **Pino** - 고성능 JSON 로거
- **express-prometheus-middleware** - Express 메트릭 자동 수집

### 컨테이너화 & 배포
- **Docker** - 컨테이너화
- **Kubernetes** - 오케스트레이션
- **Minikube** - 로컬 개발 환경

## 📁 프로젝트 구조

```
nodejs/
├── src/
│   ├── app.ts              # 메인 애플리케이션
│   ├── dice.ts             # 주사위 로직
│   ├── instrumentation.ts  # OpenTelemetry 설정
│   └── lib/
│       ├── environment.ts  # 환경 변수 관리
│       └── logger.ts       # 로거 설정
├── deploy/
│   ├── deployment.yaml     # Kubernetes 배포 설정
│   ├── service.yaml        # Kubernetes 서비스 설정
│   ├── namespace.yaml      # 네임스페이스 설정
│   └── kustomization.yaml  # Kustomize 설정
├── package.json            # 프로젝트 의존성
├── Dockerfile             # Docker 이미지 빌드
├── docker-compose.yml     # 로컬 개발 환경
├── Makefile              # 빌드 및 배포 스크립트
└── tsconfig.json         # TypeScript 설정
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 22.14.0+
- pnpm 10.15.1+
- Docker
- Kubernetes (Minikube 권장)

### 로컬 개발

1. **의존성 설치**
   ```bash
   pnpm install
   ```

2. **개발 서버 실행**
   ```bash
   pnpm dev
   ```

3. **애플리케이션 테스트**
   ```bash
   # 주사위 굴리기 (5번)
   curl "http://localhost:8080/rolldice?rolls=5"
   
   # 인사말
   curl "http://localhost:8080/greet"
   
   # 헬스체크
   curl "http://localhost:8080/healthz"
   
   # 메트릭 확인
   curl "http://localhost:8080/metrics"
   ```

### Docker로 실행

1. **이미지 빌드**
   ```bash
   make build
   ```

2. **컨테이너 실행**
   ```bash
   make run
   ```

3. **정리**
   ```bash
   make clean
   ```

### Kubernetes 배포

1. **애플리케이션 배포**
   ```bash
   make create
   ```

2. **배포 상태 확인**
   ```bash
   kubectl get pods -n prod
   kubectl logs -f deployment/dice-server -n prod
   ```

3. **서비스 접근**
   ```bash
   kubectl port-forward service/dice-server 8080:8080 -n prod
   ```

## 📊 API 엔드포인트

### GET /rolldice
주사위를 굴립니다.

**쿼리 파라미터:**
- `rolls` (필수): 굴릴 주사위 개수

**예시:**
```bash
curl "http://localhost:8080/rolldice?rolls=3"
# 응답: [4, 2, 6]
```

### GET /greet
간단한 인사말을 반환합니다.

**예시:**
```bash
curl "http://localhost:8080/greet"
# 응답: Hello World
```

### GET /healthz
애플리케이션 상태를 확인합니다.

**예시:**
```bash
curl "http://localhost:8080/healthz"
# 응답: ok
```

### GET /metrics
Prometheus 메트릭을 노출합니다.

**예시:**
```bash
curl "http://localhost:8080/metrics"
```

## 📄 환경 변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `PORT` | 서버 포트 | `8080` |
| `OTEL_SERVICE_NAME` | OpenTelemetry 서비스명 | `dice-server` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP 수집기 엔드포인트 | - |

## 📈 모니터링 설정

이 애플리케이션은 다음 모니터링 기능을 제공합니다:

### 메트릭
- HTTP 요청 수, 응답 시간, 상태 코드
- 주사위 굴리기 횟수
- 메모리 및 CPU 사용량

### 로그
- 구조화된 JSON 로그 (Pino)
- HTTP 요청/응답 로그
- 애플리케이션 이벤트 로그

### 추적
- HTTP 요청 추적
- 주사위 굴리기 작업 추적
- 분산 추적 지원

## 🔗 관련 링크

- [OpenTelemetry Node.js](https://opentelemetry.io/docs/instrumentation/js/)
- [express-prometheus-middleware](https://github.com/joao-fontenele/express-prometheus-middleware)
- [Pino Logger](https://getpino.io/)
