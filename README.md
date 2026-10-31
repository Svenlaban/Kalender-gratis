# Kalender Gratis

Kalender Gratis är en responsiv svensk kalendertjänst som ger en tydlig överblick över månader och år utan annonser eller onödiga distraktioner. Projektet har utvecklats som slutprojekt i kursen Webbutveckling I vid Mittuniversitetet.

## Publicerad webbplats

[Öppna Kalender Gratis](https://kalender.gratis)

## Projektrapport

[Öppna projektrapporten](rapport/Micael_Huczkowski_Projektuppgift_DT224G.pdf)

## Funktioner

- Månadskalender med navigering mellan månader och år.
- Årskalender med årets tolv månader.
- Klickbara månader som leder från årsvyn till vald månad.
- Svenska veckonummer enligt ISO-standarden.
- Markering av dagens datum, helger, röda dagar och högtidsaftnar.
- Svenska namnsdagar och helgdagarnas namn.
- Responsiv layout för mobiltelefon, surfplatta och dator.
- Mobilnavigation med en öppningsbar meny.
- Kontaktformulär med egen JavaScript-validering.
- Tillgänglighetsanpassade etiketter, fokuslägen och beskrivningar.

## Kalenderdata

Information om svenska helgdagar, arbetsfria dagar och namnsdagar hämtas från [Svenska Dagar API](https://sholiday.faboul.se/). Kalenderinformationen hämtas automatiskt för det år som visas.

Eftersom informationen kommer från en extern tjänst kan tillfälliga driftstörningar påverka innehållet i kalendern.

## Tekniker

Projektet är byggt utan ramverk och använder:

- semantisk HTML5,
- CSS med mobile first, CSS Grid, Flexbox, anpassade egenskaper och media queries,
- JavaScript för DOM-manipulation, formulärvalidering, datumhantering och API-anrop,
- Fetch API för extern kalenderdata,
- Git och GitHub för versionshantering.

## Sidstruktur

- `index.html` – månadskalender och introduktion.
- `arskalender.html` – översikt över årets tolv månader.
- `om.html` – information om tjänsten, funktioner, datakälla och kontaktformulär.
- `css/style.css` – webbplatsens gemensamma stilmall.
- `js/navigation.js` – mobilnavigation.
- `js/kalenderdata.js` – hämtning av extern kalenderdata.
- `js/kalender.js` – månadskalenderns funktionalitet.
- `js/arskalender.js` – årskalenderns funktionalitet.
- `js/kontakt.js` – validering av kontaktformuläret.
- `images/` – logotyp och övrigt bildmaterial.
- `design/` – wireframes och designskiss.
- `rapport/` – projektrapport och tillhörande material.

## Köra projektet lokalt

1. Klona repot:

   ```bash
   git clone https://github.com/Svenlaban/Kalender-gratis.git
   ```

2. Öppna projektmappen i Visual Studio Code.
3. Starta webbplatsen med exempelvis Live Server.
4. Öppna `index.html` via den lokala webbservern.

En internetanslutning behövs för att hämta kalenderdata från det externa API:t.

## Design och tillgänglighet

Webbplatsen är framtagen med wireframes för mobil och dator samt en grafisk designskiss. Gränssnittet använder tydliga kontraster, synliga fokuslägen, beskrivande länkar och formuläret har kopplade etiketter och felmeddelanden. Layouten följer mobile-first-principen och anpassas stegvis för större skärmar.

## Validering och testning

HTML och CSS har kontrollerats med W3C:s valideringsverktyg. Webbplatsen har testats i olika skärmstorlekar. Den externa kalenderdatan har kontrollerats för vanliga dagar, söndagar, röda dagar och högtidsaftnar.

## Utvecklare

Micael Huczkowski

