resource "google_compute_global_address" "frontend" {
  name = var.frontend_static_address_name
}

resource "google_compute_global_address" "bff" {
  name = var.bff_static_address_name
}
