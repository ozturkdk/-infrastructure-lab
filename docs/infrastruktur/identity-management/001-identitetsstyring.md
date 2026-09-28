# 001 – Identitetsstyring

## Behov

Organisationen skal kunne administrere brugere og deres adgang til interne services fra ét centralt sted.

Efterhånden som nye services bliver introduceret, vil separate brugerkonti i hver enkelt applikation gøre administration af brugere, rettigheder, onboarding og offboarding unødvendigt kompleks.

Derfor ønskes en central identitetsløsning, som fremtidige services så vidt muligt kan integreres med.

## Krav

Den første løsning bør som minimum understøtte:

- Central administration af brugere og grupper
- [Single Sign-On (SSO)](../../begreber.md#sso-single-sign-on)
- [Multi-Factor Authentication (MFA)](../../begreber.md#mfa-multi-factor-authentication)
- Rolle- eller gruppebaseret adgang
- Integration med forskellige typer applikationer
- Standardiserede protokoller som [OpenID Connect (OIDC)](../../begreber.md#oidc-openid-connect)
- Mulighed for senere udvidelse af infrastrukturen

## Principper

Løsningen skal passe til organisationens nuværende behov. Der er derfor ikke et krav om avancerede enterprise-funktioner fra begyndelsen.

Samtidig bør løsningen ikke skabe en unødvendig afhængighed af en bestemt cloudplatform eller applikationssuite.

Driftsansvar, sikkerhed, kompleksitet og mulighed for integration med fremtidige services skal indgå i vurderingen af de forskellige løsninger.

## Næste skridt

Mulige løsninger til central identitetsstyring skal undersøges og sammenlignes, før en løsning vælges.

---

## Løsninger overvejet

Tre forskellige løsninger er blevet undersøgt som udgangspunkt for organisationens identitetsstyring: Microsoft Entra ID, Keycloak og Authentik.

### Microsoft Entra ID

Microsoft Entra ID er en cloudbaseret identitetsplatform, hvor den underliggende infrastruktur drives og vedligeholdes af Microsoft.

Løsningen reducerer dermed organisationens eget driftsansvar og tilbyder blandt andet central administration af brugere og grupper, [Single Sign-On (SSO)](../../begreber.md#sso-single-sign-on) og [Multi-Factor Authentication (MFA)](../../begreber.md#mfa-multi-factor-authentication).

Entra ID har samtidig en tæt integration med Microsofts øvrige økosystem, herunder Microsoft 365 og Azure. Dette kan være en væsentlig fordel for organisationer, der allerede anvender disse platforme.

Den hypotetiske organisation har på nuværende tidspunkt ikke et krav om hverken Microsoft 365 eller Azure. Den tætte integration med Microsofts økosystem vurderes derfor ikke som en afgørende fordel i den nuværende situation.

Entra ID er fortsat en relevant mulighed, hvis organisationens behov eller valg af platforme senere ændrer sig.

### Keycloak

Keycloak er en open source-identitetsplatform, der kan drives på organisationens egen infrastruktur.

Platformen understøtter blandt andet [OpenID Connect](../../begreber.md#oidc-openid-connect), [OAuth 2.0](../../begreber.md#oauth-20) og [SAML](../../begreber.md#saml-security-assertion-markup-language) og tilbyder omfattende muligheder for eksempelvis [identity federation](../../begreber.md#identity-federation), integration med [eksterne identity providers](../../begreber.md#ekstern-identity-provider) og konfiguration af [authentication flows](../../begreber.md#authentication-flow).

Denne fleksibilitet gør Keycloak velegnet til miljøer med mere komplekse krav til identitets- og adgangsstyring.

Organisationens nuværende behov er imidlertid forholdsvis begrænset. Det primære behov består i central administration af brugere og grupper, [MFA](../../begreber.md#mfa-multi-factor-authentication) samt [Single Sign-On](../../begreber.md#sso-single-sign-on) til interne services.

En stor del af Keycloaks fleksibilitet og funktionalitet forventes derfor ikke at blive udnyttet på nuværende tidspunkt. Det betyder ikke, at Keycloak vurderes som en dårligere løsning, men at platformens omfang ikke vurderes nødvendigt for organisationens nuværende krav.

### Authentik

Authentik er ligeledes en open source-identitetsplatform, der kan drives på organisationens egen infrastruktur.

Platformen understøtter blandt andet [OpenID Connect](../../begreber.md#oidc-openid-connect), [OAuth 2.0](../../begreber.md#oauth-20), [SAML](../../begreber.md#saml-security-assertion-markup-language), [LDAP](../../begreber.md#ldap-lightweight-directory-access-protocol) og [SCIM](../../begreber.md#scim-system-for-cross-domain-identity-management). Det giver mulighed for at integrere forskellige typer applikationer gennem standardiserede protokoller uden at være bundet til en bestemt cloudplatform eller applikationssuite.

Authentik dækker dermed de centrale krav, der er defineret for organisationen, samtidig med at platformens omfang vurderes passende til det nuværende miljø.

Sammenlignet med en managed løsning som Entra ID medfører Authentik dog et væsentligt større driftsansvar. Organisationen bliver selv ansvarlig for blandt andet platformens tilgængelighed, opdateringer, sikkerhed, backup og disaster recovery.

Dette betragtes som en væsentlig ulempe ved løsningen og skal indgå i den videre udvikling af infrastrukturen.

## Beslutning

Authentik vælges som organisationens første centrale identitetsplatform.

Valget er ikke baseret på, at Authentik generelt vurderes som en bedre identitetsplatform end hverken Keycloak eller Microsoft Entra ID. Valget tager udgangspunkt i organisationens nuværende krav.

Authentik opfylder behovet for central brugeradministration, [MFA](../../begreber.md#mfa-multi-factor-authentication) og [Single Sign-On](../../begreber.md#sso-single-sign-on) og understøtter samtidig flere standardiserede protokoller, som giver mulighed for integration med forskellige typer services.

Keycloak tilbyder tilsvarende funktionalitet og større fleksibilitet på en række områder, men denne fleksibilitet vurderes ikke nødvendig i det nuværende miljø.

Microsoft Entra ID ville reducere organisationens driftsansvar betydeligt, men fordelene ved den tætte integration med Microsofts økosystem er mindre relevante, så længe organisationen ikke har et krav om Microsoft 365 eller Azure.

Valget af Authentik indebærer derfor et bevidst kompromis: Organisationen opnår en leverandøruafhængig og selvhostet identitetsplatform, men overtager samtidig ansvaret for at holde en kritisk del af infrastrukturen sikker og tilgængelig.

Efterhånden som flere services bliver afhængige af identitetsplatformen, vil konsekvenserne ved nedetid samtidig blive større. Backup, overvågning, opdateringer og disaster recovery skal derfor adresseres som infrastrukturen udvikler sig.

Beslutningen skal genovervejes, hvis organisationens krav, størrelse eller øvrige infrastruktur ændrer sig.


## Videre implementering

Hostingbeslutning, installationskommandoer og validering beskrives i [002 – Lokal installation af Authentik](002-lokal-authentik.md).
