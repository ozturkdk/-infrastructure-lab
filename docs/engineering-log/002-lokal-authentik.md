# 002 – Lokal installation af Authentik

## Behov og krav

Beslutningen om Authentik skal omsættes til en første installation, hvor opsætning og login kan afprøves. Brugeren har valgt den lokale labmaskine som vært. Der er endnu ikke et krav om adgang fra andre maskiner eller kontinuerlig drift.

Maskinen kører Debian 13 og har 8 logiske CPU'er og 15 GiB RAM. Authentiks installationsvejledning angiver mindst 2 CPU-kerner og 2 GB RAM.

## Alternativer og beslutning

En lokal installation genbruger eksisterende ressourcer. En separat VM ville give yderligere isolation, men kræver administration af endnu et operativsystem. Ekstern hosting ville muliggøre drift uafhængigt af arbejdsstationen, men indebærer omkostninger og et driftsbehov, som endnu ikke er fastlagt.

Vi vælger Docker Compose direkte på den lokale maskine. Authentik dokumenterer denne metode til test og mindre installationer. Kubernetes tilfører ikke en nødvendig funktion til denne første afprøvning.

## Implementering

`infrastructure/authentik/compose.yml` bygger på den officielle Compose-fil hentet den 28. september 2026. Den indeholder Authentik server og worker (2026.8.3) samt PostgreSQL 16. Databaseindhold gemmes i en Docker-volume, mens filer gemmes under installationsmappen.

Lokale tilpasninger:

- HTTP og HTTPS bindes til `127.0.0.1` på port 9000 og 9443.
- Docker-socket monteres ikke i worker-containeren; automatisk administration af outposts er ikke nødvendig nu.
- Databaseadgangskode og secret key opbevares i en ignoreret `.env` med filrettighed `600`.

Docker installeres fra Dockers officielle Debian-repository med `scripts/install-docker-debian.sh`. Scriptet kræver sudo og ændrer maskinens pakker og APT-konfiguration.

## Start og validering

Kør fra repositoryets rod:

```bash
bash scripts/install-docker-debian.sh
cd infrastructure/authentik
sudo docker compose config --quiet
sudo docker compose pull
sudo docker compose up -d
sudo docker compose ps
```

Åbn derefter `http://localhost:9000`, og gennemfør den indledende opsætning af `akadmin`. Kontrollér login og containerstatus. Ved fejl bruges `sudo docker compose logs --tail=100 server worker postgresql`.

Ved en ny checkout skal `.env` først oprettes i installationsmappen:

```bash
umask 077
if [ ! -e .env ]; then
  {
  printf 'PG_PASS=%s\n' "$(openssl rand -hex 32)"
  printf 'AUTHENTIK_SECRET_KEY=%s\n' "$(openssl rand -hex 48)"
  } > .env
fi
```

Stop labben med `sudo docker compose stop`; start den igen med `sudo docker compose up -d`. Brug ikke `down -v`, hvis databasen skal bevares.

## Teststatus og begrænsninger

Konfiguration og lokale secrets er forberedt. Installation og runtime-validering afventer Docker: agentens forsøg på sudo uden adgangskode blev afvist, fordi sudo kræver brugerens adgangskode. Login, MFA og integration med en applikation er endnu ikke testet.

Installationen er en lokal lab. Tilgængelighed følger arbejdsstationen, og der er endnu ikke etableret backup, recovery-test, SMTP eller domænebaseret TLS. PostgreSQL-tagget følger opdateringer inden for 16-alpine; images er ikke låst til digests. Disse begrænsninger skal vurderes, før installationen får ansvar for andre services.

## Kilder

- [Authentik: Docker Compose installation](https://docs.goauthentik.io/install-config/install/docker-compose)
- [Docker Engine på Debian](https://docs.docker.com/engine/install/debian/)
