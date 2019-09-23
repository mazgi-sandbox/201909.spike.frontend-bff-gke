resource "google_sql_database_instance" "master" {
  name             = "${var.basename}-master"
  database_version = "MYSQL_5_7"
  region           = var.gcp_location

  settings {
    tier = "db-n1-standard-1"
  }
}

resource "google_sql_user" "bff" {
  name     = "bff"
  instance = google_sql_database_instance.master.name
  password = var.db_user_bff_password
}
