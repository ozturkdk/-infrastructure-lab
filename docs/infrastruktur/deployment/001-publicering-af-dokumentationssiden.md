# 001 – Publicering af dokumentationssiden

## Behov

Organisationen ønsker, at dokumentationssiden kan tilgås via internettet i stedet for kun at blive vist lokalt fra repositoryet.

## Foreløbige krav

- Siden skal kunne tilgås via projektets dokumentationsadresse, `docs.dev.domain.com`.
- Publicering skal gøre den byggede MkDocs-side tilgængelig via internettet.
- Indhold, der publiceres, skal være egnet til offentlig adgang. Secrets og personoplysninger må ikke indgå.

## Langsigtet retning

En mulig retning er gradvist at flytte tjenester fra den lokale arbejdsstation til cloudbaserede løsninger. Managed services kan reducere behovet for selv at drive den underliggende infrastruktur og gøre tjenester tilgængelige, selv når arbejdsstationen er slukket. En cloudplatform kan også tilbyde redundans og dermed understøtte højere tilgængelighed, men det afhænger af den valgte tjenestes arkitektur og vilkår; cloudhosting giver ikke i sig selv en garanti for høj tilgængelighed.

I begyndelsen kan relevante tjenester afprøves på managed services, eventuelt med gratisniveauer. Gratisniveauer kan have begrænsninger på ressourcer, support, backup og tilgængelighed og skal derfor vurderes ud fra den enkelte tjenestes behov.

Efterhånden som flere tjenester kommer til, kan det være en fordel at samle dem under samme cloududbyder og tenant. Det kan give et fælles overblik over konti, adgangsstyring, forbrug og integrationer. Samling bør dog ske, når det giver konkret værdi, og ikke som et mål i sig selv: afhængighed af én udbyder, tenantens adgangs- og sikkerhedsgrænser samt konsekvenserne af en konto- eller konfigurationsfejl skal også indgå i vurderingen.

## Næste skridt

Første mål er at publicere dokumentationssiden online med GitHub Pages og bruge projektets eget domæne. DNS administreres i Cloudflare. GitHub Pages er valgt som første løsning, fordi MkDocs genererer statiske filer, som kan hostes uden en server, der kører Python.

Arbejdet opdeles i disse trin:

1. Opret et GitHub-repository, tilføj det som Git remote, og push projektets ændringer. Gennemgå først indholdet, så secrets og personoplysninger ikke kommer med i et offentligt repository.
2. Tilføj projektets MkDocs-afhængigheder i en dependency-fil, så buildet kan gentages uden den lokale `.venv`.
3. Opret et GitHub Actions-workflow. Det er en YAML-fil i repositoryet, der automatisk kører, når der pushes ændringer: installerer afhængighederne, bygger siden med `mkdocs build --strict` og publicerer resultatet fra `site/` til GitHub Pages.
4. Konfigurér GitHub Pages til projektets eget domæne, og opret de DNS-records, GitHub kræver, i Cloudflare. Afslut med at kontrollere, at domænet virker med HTTPS.

Gratisniveauets vilkår og eventuelle begrænsninger skal kontrolleres, inden publiceringen sættes i drift.
