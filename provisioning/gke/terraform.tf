# --------------------------------
# Terraform configuration

terraform {
  required_version = "0.12.9"

  required_providers {
    google      = "2.15.0"
    google-beta = "2.15.0"
  }

  backend "gcs" {
    prefix = "terraform/gke/state"
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = "us-central1"
}

provider "google-beta" {
  project = var.gcp_project_id
  region  = "us-central1"
}
