# Grafana

이 디렉토리는 Grafana 모니터링 대시보드 설정을 포함합니다.

## 구조

```
grafana/
├── config/
│   └── grafana.ini             # Grafana.ini
├── databases/
│   └── datasource.yaml         # Grafana DataSources
├── persistentvolumeclaim.yaml  # Grafana 데이터 저장용 PVC
├── deployment.yaml             # Grafana 배포 설정
├── service.yaml                # Grafana 서비스 설정
├── kustomization.yaml          # Kustomize 설정
└── README.md                   # 이 파일
```

## 사용법

### Kubernetes 배포

```bash
# Grafana 배포
kubectl apply -k .

# 또는 개별 리소스 배포
kubectl apply -f persistentvolumeclaim.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### 접속

Grafana는 LoadBalancer 타입의 서비스로 배포되며, 기본 포트 80에서 접근할 수 있습니다.

## 설정

Grafana의 추가 설정이 필요한 경우 `deployment.yaml`의 환경변수나 ConfigMap을 통해 구성할 수 있습니다.
