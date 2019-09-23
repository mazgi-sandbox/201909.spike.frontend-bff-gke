resource "google_dns_managed_zone" "main" {
  name     = "${var.basename}-main"
  dns_name = "${var.basename}.${var.basedomain}."
  dnssec_config {
    state = "on"
  }
}

output "main" {
  value = google_dns_managed_zone.main.name_servers
}
