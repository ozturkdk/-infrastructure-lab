# Begreber

Denne side fungerer som en løbende ordliste over tekniske begreber, protokoller og forkortelser, der anvendes i projektet.

Nye begreber tilføjes i takt med, at de introduceres i infrastrukturen.

---

## Identitet og adgangsstyring

### SSO – Single Sign-On

Single Sign-On gør det muligt for en bruger at autentificere sig én gang og derefter få adgang til flere forskellige applikationer uden at skulle logge ind separat på hver enkelt.

### MFA – Multi-Factor Authentication

Multi-Factor Authentication kræver mere end én type bevis på brugerens identitet.

Eksempelvis kan autentificering kræve både en adgangskode og en authenticator-app eller sikkerhedsnøgle.

### OIDC – OpenID Connect

OpenID Connect er en identitetsprotokol bygget oven på OAuth 2.0.

OIDC gør det muligt for en applikation at få bekræftet en brugers identitet gennem en identity provider.

### OAuth 2.0

OAuth 2.0 er en standard for autorisation.

Standarden gør det muligt for en applikation at få begrænset adgang til en ressource på vegne af en bruger uden at få brugerens adgangskode.

OAuth 2.0 håndterer ikke i sig selv brugerens identitet. OpenID Connect udvider OAuth 2.0 med funktionalitet til autentificering og identitet.

### SAML – Security Assertion Markup Language

SAML er en standard til udveksling af autentificerings- og autorisationsinformation mellem en identity provider og en service provider.

SAML anvendes blandt andet til Single Sign-On og findes ofte i enterprise-applikationer.

### LDAP – Lightweight Directory Access Protocol

LDAP er en protokol til opslag og administration af information i en directory service.

Et directory kan eksempelvis indeholde brugere, grupper og andre organisatoriske oplysninger.

### SCIM – System for Cross-domain Identity Management

SCIM er en standard til automatiseret udveksling og administration af bruger- og gruppeinformation mellem systemer.

SCIM kan blandt andet anvendes til automatisk provisionering og deprovisionering af brugere.

### Identity Provider – IdP

En Identity Provider er et system, der autentificerer brugere og kan videregive information om deres identitet til andre systemer.

Authentik fungerer som Identity Provider i den nuværende infrastruktur.

### Identity Federation

Identity federation gør det muligt at etablere tillid mellem forskellige identitetssystemer.

En bruger kan eksempelvis autentificeres hos en ekstern Identity Provider og efterfølgende få adgang til services, der anvender organisationens egen identitetsplatform.

### Ekstern Identity Provider

En ekstern Identity Provider er et separat identitetssystem, som organisationens egen identitetsplatform kan benytte til autentificering.

Det gør det muligt at acceptere identiteter fra andre systemer uden nødvendigvis selv at administrere brugerens primære loginoplysninger.

### Authentication Flow

Et authentication flow beskriver den proces, en bruger skal gennemføre for at blive autentificeret.

Et simpelt flow kan eksempelvis være:

**Brugernavn → adgangskode → MFA → adgang**

Mere avancerede flows kan stille forskellige krav afhængigt af eksempelvis bruger, gruppe, applikation eller andre betingelser.
