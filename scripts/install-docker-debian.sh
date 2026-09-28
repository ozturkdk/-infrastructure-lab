#!/usr/bin/env bash
# Installér Docker Engine og Compose fra Dockers officielle Debian-repository.
set -euo pipefail
source /etc/os-release
if [[ "$ID" != debian || "$VERSION_CODENAME" != trixie ]]; then
  echo 'Dette script er beregnet til Debian 13 (trixie).' >&2
  exit 1
fi
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
architecture=$(dpkg --print-architecture)
sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/debian
Suites: trixie
Components: stable
Architectures: ${architecture}
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl start docker
sudo docker run --rm hello-world
sudo docker compose version
