# Mimir Kubernetes Resources

이 디렉토리는 Grafana Mimir 메트릭 데이터베이스의 Kubernetes 리소스들을 포함합니다.

## 구성 요소

- **deployment.yaml**: Mimir 서버의 Deployment 설정
- **service.yaml**: Mimir 서비스의 Service 설정
- **kustomization.yaml**: Kustomize를 사용한 리소스 관리
- **config/mimir.yaml**: Mimir 설정 파일

## 포트

- **9009**: HTTP API (Prometheus 호환)

## 배포

```bash
kubectl apply -k .

# or helm
helm install mimir grafana/mimir-distributed -f ./helm/values-azure.yaml -n monitoring
```

## 설정

Mimir는 다음과 같은 설정을 사용합니다:

- **멀티테넌시**: 비활성화
- **스토리지**: 로컬 파일시스템
- **인증**: 비활성화
- **알림 관리자**: 로컬 스토리지
- **규칙**: 파일시스템 스토리지

## 리소스 요구사항

- **메모리**: 256Mi (요청) / 1Gi (제한)
- **CPU**: 100m (요청) / 500m (제한)

## 주의사항

이 설정은 데모 목적으로만 사용하세요. 프로덕션 환경에서는 적절한 보안 설정과 영구 스토리지를 구성해야 합니다.
