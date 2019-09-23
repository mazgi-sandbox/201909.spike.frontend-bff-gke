data "google_dns_managed_zone" "main" {
  name = "${var.basename}-main"
}

resource "google_dns_record_set" "frontend" {
  name         = var.frontend_fqdn
  type         = "A"
  ttl          = 300
  managed_zone = data.google_dns_managed_zone.main.name
  rrdatas = [
    google_compute_global_address.frontend.address
  ]
}

output "frontend" {
  value = {
    fqdn    = google_dns_record_set.frontend.name
    rrdatas = google_dns_record_set.frontend.rrdatas
  }
}

resource "google_dns_record_set" "bff" {
  name         = var.bff_fqdn
  type         = "A"
  ttl          = 300
  managed_zone = data.google_dns_managed_zone.main.name
  rrdatas = [
    google_compute_global_address.bff.address
  ]
}

output "bff" {
  value = {
    fqdn    = google_dns_record_set.bff.name
    rrdatas = google_dns_record_set.bff.rrdatas
  }
}
