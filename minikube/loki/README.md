# Loki Kubernetes Resources

이 디렉토리는 Grafana Loki 로그 집계 시스템의 Kubernetes 리소스들을 포함합니다.

## 구성 요소

- **deployment.yaml**: Loki 서버의 Deployment 설정
- **service.yaml**: Loki 서비스의 Service 설정
- **kustomization.yaml**: Kustomize를 사용한 리소스 관리
- **config/local-config.yaml**: Loki 설정 파일

## 포트

- **3100**: HTTP API (로그 수집 및 쿼리)

## 배포

```bash
kubectl apply -k .

# or helm
helm install loki grafana/loki -f ./helm/values-azure.yaml -n monitoring
```

## 설정

Loki는 다음과 같은 설정을 사용합니다:

- **인증**: 비활성화
- **스토리지**: 로컬 파일시스템
- **스키마**: v11 (boltdb-shipper)
- **보존 기간**: 24시간
- **인덱스**: 24시간 주기

## 리소스 요구사항

- **메모리**: 256Mi (요청) / 1Gi (제한)
- **CPU**: 100m (요청) / 500m (제한)

## 스토리지 구조

- **chunks**: 로그 청크 저장
- **boltdb-shipper-active**: 활성 인덱스
- **boltdb-shipper-cache**: 인덱스 캐시
- **compactor**: 압축 작업 디렉토리

## 주의사항

이 설정은 데모 목적으로만 사용하세요. 프로덕션 환경에서는 적절한 보안 설정과 영구 스토리지를 구성해야 합니다.
