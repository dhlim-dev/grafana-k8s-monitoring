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
