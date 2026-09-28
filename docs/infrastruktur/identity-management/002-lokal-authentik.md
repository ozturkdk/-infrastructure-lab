# 002 – Lokal installation af Authentik

## Behov og krav

Målet er at konfigurere Authentik og kontrollere login. Den lokale labmaskine er valgt som vært.

Maskinen kører Debian 13 og har 8 logiske CPU'er og 16 GiB RAM. Authentiks installationsvejledning angiver mindst 2 CPU-kerner og 2 GB RAM.

## Alternativer og beslutning

Labmaskinen opfylder Authentiks minimumskrav, så installationen kan køre på dens eksisterende CPU og hukommelse uden en ekstra server. Et alternativ er at køre Docker Compose i en separat VM på laptoppen. Det isolerer Authentik bedre fra værtsmaskinen, men kræver administration af endnu et operativsystem, og VM'en er stadig utilgængelig, når laptoppen er slukket eller i dvale. Ekstern hosting ville være uafhængig af arbejdsstationen, men indebærer omkostninger og et driftsbehov, som endnu ikke er fastlagt.

Vi vælger at køre Docker Compose direkte på laptoppen frem for i en VM. Det undgår administration af et ekstra operativsystem og passer til behovet for at konfigurere Authentik og kontrollere login. Compose samler Authentiks server, worker og PostgreSQL i én konfiguration og er dokumenteret til [test og mindre produktionsinstallationer](https://docs.goauthentik.io/install-config/install/docker-compose). Kompromiset er, at installationen ikke er isoleret fra værtsmaskinen og kun er tilgængelig, når laptoppen kører.

## Implementering

`infrastructure/authentik/compose.yml` bygger på den [officielle Compose-fil](https://docs.goauthentik.io/install-config/install/docker-compose) hentet den 28. september 2026. Den indeholder Authentik server og worker (2026.8.3) samt PostgreSQL 16. Serveren håndterer webgrænsefladen og login-forespørgsler, mens worker-processen udfører opgaver i baggrunden. De samarbejder om at levere Authentik. PostgreSQL gemmer Authentiks data i en Docker-volume, mens filer gemmes under installationsmappen.

```yaml
--8<-- "infrastructure/authentik/compose.yml"
```

Lokale tilpasninger:

- Under `server.ports` bindes HTTP og HTTPS til `127.0.0.1` med standardportene 9000 og 9443.
- Under `worker` angiver `command: worker`, hvilken Authentik-proces der køres. Docker-socketen (`/var/run/docker.sock`) er kontrolkanalen til Docker-tjenesten på værtsmaskinen. Den monteres ikke i worker-containeren via dens `volumes`-liste, så worker kan ikke automatisk oprette outposts (ekstra komponenter til visse Authentik-integrationer).
- `env_file: .env` og variablerne `PG_PASS` og `AUTHENTIK_SECRET_KEY` viser, at Compose henter disse værdier fra `.env`. Compose styrer ikke, om filen deles via Git eller dens filrettigheder: `.env` er udeladt i `.gitignore`, og filrettigheden `600` er sat på selve filen, så kun dens ejer kan læse og ændre den.

Docker installeres på Debian 13 som beskrevet i vejledningen om [installation af Docker](../../installationer/docker-installation-debian.md). Fortsæt derefter med Authentik-installationen nedenfor.

## Start og validering

Når Docker er installeret efter vejledningen ovenfor, skift til Authentik-mappen:

```bash
cd infrastructure/authentik
```

Den lokale `.env`-fil indeholder databaseadgangskoden og Authentiks secret key. De værdier er secrets og deles hverken via Git eller på siden. Hvis installationen sættes op på en ny maskine, oprettes filen én gang med nye, tilfældige værdier. Filens rettigheder begrænses, så kun ejeren kan læse og ændre den.

Kontrollér derefter konfigurationen, hent images, og start services:

```bash
sudo docker compose config --quiet
sudo docker compose pull
sudo docker compose up -d
sudo docker compose ps
```

### Validering og opstart

1. `cd infrastructure/authentik` skifter til mappen med Authentik-konfigurationen og den lokale `.env`.
2. `sudo docker compose config --quiet` kontrollerer konfigurationen uden at starte installationen.
3. `sudo docker compose pull` henter de nødvendige images.
4. `sudo docker compose up -d` starter Authentik og PostgreSQL. Authentik venter på, at databasen er klar.
5. `sudo docker compose ps` viser status. Når services kører, fortsæt med login-testen.

Åbn derefter `http://localhost:9000`, og gennemfør den indledende opsætning af `akadmin`. Portene er bundet til `127.0.0.1`, så installationen kun er tilgængelig fra laptoppen.

Stop labben med `sudo docker compose stop`; start den igen med `sudo docker compose up -d`.

## Teststatus og begrænsninger

Compose-konfigurationen er valideret, og opstartskommandoen er gennemført. Login, MFA og integration med en applikation mangler fortsat at blive testet.

## Kilder

- [Authentik: Docker Compose installation](https://docs.goauthentik.io/install-config/install/docker-compose)
- [Docker Engine på Debian](https://docs.docker.com/engine/install/debian/)
