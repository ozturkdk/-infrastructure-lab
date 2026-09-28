# Installation af Docker på Debian

Denne vejledning beskriver installationen af Docker Engine og Docker Compose-plugin på Debian 13 (trixie) til labmiljøet. Den anvendes blandt andet før Authentik-installationen.

## Hvad installeres?

Scriptet `scripts/install-docker-debian.sh` konfigurerer Dockers officielle APT-pakkekilde og installerer:

- Docker Engine og Docker CLI til at køre og administrere containere.
- containerd, som håndterer containerafviklingen.
- Docker Compose-plugin til at definere og starte flere services samlet.
- Buildx-plugin til at bygge container-images.

Scriptet starter Docker-tjenesten og tester installationen ved at hente og køre Dockers `hello-world`-image. Til sidst viser det den installerede Compose-version.

## Forudsætninger og påvirkning

- Debian 13 med internetadgang.
- En konto, der kan anvende `sudo` og dermed godkende administratorhandlinger.
- APT-konfiguration og systempakker på maskinen ændres. Scriptet tilføjer Dockers pakkekilde og signeringsnøgle og installerer Docker-pakker.

Scriptet kontrollerer selv, at systemet er Debian 13 (trixie), og stopper, hvis det ikke er tilfældet. Gennemgå `scripts/install-docker-debian.sh` i repositoryet, før det køres, hvis du vil se de konkrete systemændringer.

## Installation

Kør kommandoen fra repositoryets rod. Scriptet bruger `sudo` ved de trin, der kræver administratorrettigheder, og kan derfor bede om adgangskode:

```bash
bash scripts/install-docker-debian.sh
```

Fortsæt kun, hvis kommandoen afsluttes uden fejl. Ved succes er `hello-world` kørt, og Compose-versionen er vist. Scriptet starter Docker-tjenesten under installationen. Det konfigurerer ikke eksplicit, om tjenesten automatisk starter, når maskinen genstartes.

## Kilder

- [Docker Engine på Debian](https://docs.docker.com/engine/install/debian/)
