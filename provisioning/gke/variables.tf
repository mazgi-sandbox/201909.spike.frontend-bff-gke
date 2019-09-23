variable "gcp_project_id" {}
variable "gcp_location" {}
variable "basedomain" {}
variable "basename" {}
variable "frontend_fqdn" {}
variable "frontend_static_address_name" {}
variable "bff_fqdn" {}
variable "bff_static_address_name" {}
variable "db_user_bff_password" {}
variable "current_external_ipaddr" {}

variable "pubkey_file_path" {
  type    = string
  default = "~/.ssh/id_rsa.pub"
}
