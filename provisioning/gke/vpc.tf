module "vpc-main" {
  source   = "mazgi/simple-vpc/google"
  version  = "2019.6.1"
  basename = var.basename
  cidr_blocks_subnetworks = {
    "10.0.0.0/16" = var.gcp_location
  }
  cidr_blocks_allow_ssh = [
    "192.0.2.0/24",              # Your specific IP address range
    var.current_external_ipaddr, # Get local machine external IP address via direnv and `curl ifconfig.io`.
  ]
}
