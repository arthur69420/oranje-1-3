# oranje-1-3

**Oranje op het WK** — een fan-spel over het Nederlands elftal. Draft een
all-time Oranje-elftal uit elke EK- en WK-selectie sinds 1974 en neem het mee
naar een eigen eindtoernooi: groepsfase, knock-out en de finale, tegen 31 andere
landen. Word je eindelijk wereldkampioen, of toch weer zilver?

De naam **1–3** is het cynische record: één gewonnen finale (EK 1988) tegen drie
verloren WK-finales (1974, 1978, 2010). Het mooiste elftal zonder wereldtitel.

## Spelen

Statische site, geen build-stap. Open `index.html` via een lokale webserver
(een service worker werkt niet vanaf `file://`):

```bash
npx serve .
# of
python -m http.server
```

Of host het gratis op GitHub Pages: zet de repo online en kies bij
**Settings → Pages** de `main`-branch als bron.

## Hoe het werkt

1. **Stel in** — teamnaam, formatie en speelstijl (verdedigend / gebalanceerd /
   aanvallend).
2. **Draft** — 11 rondes lang rol je een willekeurige eindronde (EK/WK sinds
   1974, t/m WK 2026). Kies een speler uit die selectie en zet hem op een
   passende positie. Max 3 rerolls. Met het **eindrondes**-filter beperk je de
   draft tot bepaalde toernooien.
3. **Speel het WK** — je elftal gaat naar een eindtoernooi: eerst de groepsfase
   (poule van 4), dan de knock-out (achtste, kwart, halve finale, finale) tegen
   31 andere landen. Verlies je de finale, dan is het zilver — alweer.

Achievements onderweg: **Wereldkampioen**, **Zilver alweer** (finale verloren),
**Groepswinst**, **Totaalvoetbal** (3+ spelers uit '74/'78), **De klasse van
'88**, en meer. Records en badges worden lokaal bewaard (`localStorage`). Taal
NL/EN, geluid en een spelersdatabase zitten in de header.

## Eindrondes (21)

WK 1974 · EK 1976 · WK 1978 · EK 1980 · EK 1988 · WK 1990 · EK 1992 · WK 1994 ·
EK 1996 · WK 1998 · EK 2000 · EK 2004 · WK 2006 · EK 2008 · WK 2010 · EK 2012 ·
WK 2014 · EK 2021 · WK 2022 · EK 2024 · WK 2026

(Oranje deed niet aan elk toernooi mee; ontbrekende eindrondes zijn de
toernooien waarvoor het zich niet plaatste. WK 2026 is een projectie.)

## Bestanden

- `index.html` — de pagina + build-config (branding, oranje thema, teksten)
- `js/data.js` — de selecties per eindronde (`SEASONS`)
- `js/app.js` — de spel-engine (draft, simulatie, deelkaart)
- `css/style.css` — stijl incl. oranje thema (`body.theme-oranje`)
- `sw.js`, `manifest.webmanifest`, `icon.svg` — PWA / installeerbaar

## Disclaimer

Onofficieel fanproject, niet gelieerd aan de KNVB. Selecties zijn gecureerde
kernselecties bij benadering; ratings zijn subjectief, afgeleid van statuur en
vorm ten tijde van het toernooi.
