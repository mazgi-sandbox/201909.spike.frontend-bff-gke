# Frontend + BFF on GKE

_This document still works in progress._

## Before you begin

### Required

- [direnv](https://github.com/direnv/direnv)
- docker & docker-compose

## Before development

### (optional) Create the ENV file for Docker

on macOS

```
BIND_IP_ADDR=192.168.65.1
```

on Linux

```
BIND_IP_ADDR=192.168.65.1
UID=1000
GID=100
```

## Before deploy

### Setup your GCP Project

Enable Cloud SQL Admin API.
https://console.cloud.google.com/apis/api/sqladmin.googleapis.com/overview

#### (optional) Generate and Auth your service account

https://cloud.google.com/sdk/gcloud/reference/auth/activate-service-account

```shellsession
gcloud auth activate-service-account
```

### Setup direnv

Edit the `.envrc` file with `direnv edit .` command.

Like bellow:

- `PROJECT_UUID`
  - Your unique string.
  - e.g. `6e8cfffe-f521-4516-b9dc-719b022b9646`
- `PROJECT_BASENAME`
  - Your project identifier and subdomain.
  - e.g. `6e8cfffe`, `my-app`
- `PROJECT_BASEDOMAIN`
  - Your domainname.
  - e.g. `example.com.`
- `CLOUDSDK_CORE_PROJECT`
  - Your GCP Project ID.
  - e.g. `mazgi-sandbox-gcp`
- `GOOGLE_APPLICATION_CREDENTIALS_FILENAME`
  - Your GCP key file name.
  - e.g. `mazgi-sandbox-gcp-1122334455.json`

```
# Project
export PROJECT_UUID='YOUR-UUID'
export PROJECT_BASENAME='YOUR-BASENAME'
export PROJECT_BASEDOMAIN='YOUR-DOMAINNAME'
export PROJECT_LOCATION="us-central1"
# Frontend
export FRONTEND_FQDN="frontend.${PROJECT_BASENAME}.${PROJECT_BASEDOMAIN}"
export FRONTEND_STATIC_ADDRESS_NAME="${PROJECT_BASENAME}-frontend-main"
# BFF
export BFF_FQDN="bff.${PROJECT_BASENAME}.${PROJECT_BASEDOMAIN}"
export BFF_STATIC_ADDRESS_NAME="${PROJECT_BASENAME}-bff-main"

# GCP
export CLOUDSDK_CORE_PROJECT='YOUR-GCP-PROJECT'
export GOOGLE_APPLICATION_CREDENTIALS_FILENAME='YOUR-GCP-KEY.json'
export GOOGLE_APPLICATION_CREDENTIALS="${PWD}/credentials/${GOOGLE_APPLICATION_CREDENTIALS_FILENAME}"

# Terraform
export TF_VAR_gcp_project_id="${CLOUDSDK_CORE_PROJECT}"
export TF_VAR_gcp_location="${PROJECT_LOCATION}"
export TF_VAR_basedomain="${PROJECT_BASEDOMAIN}"
export TF_VAR_basename="${PROJECT_BASENAME}"
export TF_VAR_frontend_fqdn="${FRONTEND_FQDN}"
export TF_VAR_frontend_static_address_name="${FRONTEND_STATIC_ADDRESS_NAME}"
export TF_VAR_bff_fqdn="${BFF_FQDN}"
export TF_VAR_bff_static_address_name="${BFF_STATIC_ADDRESS_NAME}"
export TF_VAR_db_user_bff_password="pass"
export TF_VAR_current_external_ipaddr="$(curl -Ls ifconfig.io)/32"
```

### Configure GCR

```shellsession
gcloud auth configure-docker
```

### Create a Cloud Storage bucket for save tfstate.

see https://cloud.google.com/storage/docs/gsutil

```shellsession
gsutil mb gs://${PROJECT_UUID}/
gsutil acl set private gs://${PROJECT_UUID}/
gsutil versioning set on gs://${PROJECT_UUID}/
```

## Setup GCP environment

### Setup your subdomain via Terraform

See also `provisioning/domain` in this repository.

Initialize terraform.

```shellsession
docker-compose run provisioning bash -c 'source .envrc && cd provisioning/domain && terraform init -backend-config="bucket=${PROJECT_UUID}"'
```

Plan & apply terraform.

```shellsession
docker-compose run provisioning bash -c 'source .envrc && cd provisioning/domain && terraform plan'
docker-compose run provisioning bash -c 'source .envrc && cd provisioning/domain && terraform apply'
```

### Create GKE cluster via Terraform

See also `provisioning/gke` in this repository.

Initialize terraform.

```shellsession
docker-compose run provisioning bash -c 'source .envrc && cd provisioning/gke && terraform init -backend-config="bucket=${PROJECT_UUID}"'
```

Plan & apply terraform.

```shellsession
docker-compose run provisioning bash -c 'source .envrc && cd provisioning/gke && terraform plan'
docker-compose run provisioning bash -c 'source .envrc && cd provisioning/gke && terraform apply'
```

## Deploy your app

### Setup helm

```shellsession
gcloud container clusters get-credentials --zone us-central1 $GKE_CLUSTER
```

```shellsession
kubectl --namespace kube-system create serviceaccount tiller
kubectl create clusterrolebinding tiller-admin --clusterrole admin --serviceaccount=kube-system:tiller
kubectl create clusterrolebinding tiller-cluster-admin --clusterrole cluster-admin --serviceaccount=kube-system:tiller
```

```shellsession
helm init --upgrade --service-account=tiller
kubectl get pods,deployments,services --namespace kube-system -l name=tiller
```

### Deploy the resource

```shellsession
helm install --name NAME provisioning/console
```
