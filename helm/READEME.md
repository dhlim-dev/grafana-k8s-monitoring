# K8s Monitoring

Grafana Monitoring Stack

## Getting Started

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

## Loki

Loki는 로그를 저장하고 쿼리할 수 있는 로그 집계 시스템입니다.

```bash
helm install loki grafana/loki -f ./loki/values-azure.yaml -n monitoring
```

## Mimir

Mimir는 메트릭을 저장하고 쿼리할 수 있는 메트릭 데이터베이스입니다.

```bash
helm install mimir grafana/mimir-distributed -f ./mimir/values-azure.yaml -n monitoring
```

## Grafana

Grafana는 대시보드를 생성하고 데이터를 시각화할 수 있는 대시보딩 도구입니다.

```bash
helm install grafana grafana/grafana -f ./grafana/values-azure.yaml -n monitoring
```

## K8s 모니터링

```bash
helm install k8s-monitoring grafana/k8s-monitoring -f ./k8s-monitoring/values-azure.yaml -n monitoring
```
