# FormFactor – Oppsett

## Steg 1: Hent Strava-tokens (gjøres bare én gang)

Du trenger `access_token`, `refresh_token` og `expires_at` fra Strava.

### Metode: Åpne denne URL-en i nettleseren

Bytt ut `CLIENT_ID` med ditt Strava Client ID (245923):

```
https://www.strava.com/oauth/authorize?client_id=245923&response_type=code&redirect_uri=http://localhost&approval_prompt=force&scope=read,activity:read_all,profile:read_all
```

1. Logg inn og godkjenn
2. Du blir videresendt til `http://localhost/?code=XXXXXXXX` — kopier `code`-verdien
3. Kjør denne curl-kommandoen (bytt inn din secret og code):

```bash
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=245923 \
  -d client_secret=DIN_SECRET \
  -d code=KODEN_FRA_STEG_2 \
  -d grant_type=authorization_code
```

4. Du får tilbake JSON med:
   - `access_token` → legg i `STRAVA_ACCESS_TOKEN`
   - `refresh_token` → legg i `STRAVA_REFRESH_TOKEN`
   - `expires_at` → legg i `STRAVA_TOKEN_EXPIRES_AT`

---

## Steg 2: Sett opp `.env.local`

Kopier `.env.local.example` til `.env.local` og fyll inn verdiene:

```bash
cp .env.local.example .env.local
```

---

## Steg 3: Hent Anthropic API-nøkkel

Gå til https://console.anthropic.com → API Keys → Create Key

Legg inn i `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Steg 4: Kjør lokalt

```bash
npm install
npm run dev
```

---

## Deploy til Vercel

Legg inn alle env-variabler fra `.env.local` i Vercel-dashboardet under:
**Project → Settings → Environment Variables**

### Om token-refresh på Vercel
Strava `access_token` varer 6 timer. `refresh_token` varer for alltid.

Synk-routen refresher automatisk når tokenet er utløpt. Men på Vercel kan ikke koden
oppdatere env-variabler selv — så etter refresh vil neste request refreshe igjen.
Dette er OK for personlig bruk (1 ekstra API-kall per 6 timer).

Vil du unngå det: legg til Supabase og lagre tokens der i stedet.

---

## Filstruktur for de nye API-routene

```
app/
  api/
    coach/
      route.ts        ← AI Coach (proxy til Anthropic, skjuler API-nøkkel)
    strava/
      sync/
        route.ts      ← Henter aktiviteter med dine personlige tokens
      callback/
        route.ts      ← Ikke i bruk, men beholdt
      auth/
        route.ts      ← Ikke i bruk, men beholdt
```
