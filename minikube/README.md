# Minikube

## Getting Started

```bash
minikube start

kubectl apply -k .
```

### K8s Monitoring

```bash
helm install monitoring grafana/k8s-monitoring -f ./k8s-monitoring/values-podlogs.yaml -n monitoring
```

### Grafana

```bash
kubectl port-forward service/grafana 3000:3000 -n monitoring &
```

## Examples

### Nodejs

```bash
# go to examples/nodejs
cd examples/nodejs

# set docker environment
eval $(minikube -p minikube docker-env)

# build and deploy
make build
make deploy
```

## References

- [Grafana Kubernetes Monitoring](https://grafana.com/docs/grafana-cloud/monitor-infrastructure/kubernetes-monitoring/)
- [Grafana K8s Monitoring Helm Chart](https://github.com/grafana/k8s-monitoring-helm)
- [Grafana Mimir](https://grafana.com/docs/mimir/latest/)
- [Grafana Loki](https://grafana.com/docs/loki/latest/)
- [Grafana Tempo](https://grafana.com/docs/tempo/latest/)
- [alloy-scenarios](https://github.com/grafana/alloy-scenarios)
- [docker-otel-lgtm](https://github.com/grafana/docker-otel-lgtm)
- [opentelemetry-demo](https://github.com/open-telemetry/opentelemetry-demo)