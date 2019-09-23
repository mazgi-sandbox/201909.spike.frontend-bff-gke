resource "google_container_cluster" "main" {
  name                     = "${var.basename}-main"
  location                 = var.gcp_location
  remove_default_node_pool = true
  initial_node_count       = 1
}

resource "google_container_node_pool" "main" {
  name       = "${var.basename}-main"
  location   = var.gcp_location
  cluster    = google_container_cluster.main.name
  node_count = 2
  node_config {
    preemptible = true
  }
}
