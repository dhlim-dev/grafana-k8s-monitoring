# Tempo Kubernetes Resources

이 디렉토리는 Tempo 분산 추적 백엔드의 Kubernetes 리소스들을 포함합니다.

## 구성 요소

- **deployment.yaml**: Tempo 서버의 Deployment 설정
- **service.yaml**: Tempo 서비스의 Service 설정
- **kustomization.yaml**: Kustomize를 사용한 리소스 관리

## 포트

- **80**: HTTP API
- **3100**: Prometheus 메트릭
- **4317**: OpenTelemetry gRPC 수신기
- **4318**: OpenTelemetry HTTP 수신기
- **14268**: Jaeger Thrift HTTP 수신기

## 배포

```bash
kubectl apply -k .
```

## 설정

Tempo는 로컬 스토리지를 사용하며, 24시간 블록 보존 정책을 적용합니다.
인증은 비활성화되어 있습니다.
