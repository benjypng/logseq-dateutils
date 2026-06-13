# @benjypng/logseq-dateutils

![Version](https://img.shields.io/npm/v/%40benjypng%2Flogseq-dateutils?style=flat-square&color=0969da) ![Downloads](https://img.shields.io/npm/dm/%40benjypng%2Flogseq-dateutils?style=flat-square&color=orange) ![License](https://img.shields.io/github/license/benjypng/logseq-dateutils?style=flat-square)

> Date utilities for developing Logseq plugins — format dates in the user's preferred date format and generate ready-to-insert `SCHEDULED:` / `DEADLINE:` lines.

---

## ✨ Features

- **User-format aware:** Format any date according to the user's `preferredDateFormat` (e.g. from `logseq.App.getUserConfigs()`), with or without `[[page brackets]]`.
- **Ready-made org-style lines:** Generate complete `SCHEDULED: <...>` and `DEADLINE: <...>` strings, with the time included automatically when it isn't midnight.
- **Compact timestamps:** `yyMMdd` and `yyMMdd'T'HHmm` helpers for IDs and filenames.
- **Dual ESM + CJS** with full TypeScript declarations for both formats.
- **Tiny:** under 9 kB minified + gzipped including its only dependency, `date-fns`.

## ⚙️ Installation

```
npm i @benjypng/logseq-dateutils
```

Import (you may also import only selective functions for your needs):

```js
import {
  getDateForPage,
  getDateForPageWithoutBrackets,
  getDeadlineDateDay,
  getScheduledDateDay,
  getYYMMDDTHHMMFormat,
  getYYMMDD,
} from '@benjypng/logseq-dateutils';
```

## 🛠 Usage

### getDateForPage or getDateForPageWithoutBrackets

Returns the specified date based on the user's preferred date format. Accepts 2 arguments: a `Date` and the user's preferred date format (e.g. from `logseq.App.getUserConfigs()`). `getDateForPage` returns the date with brackets (`[[date]]`) while `getDateForPageWithoutBrackets` returns the date without the brackets.

```js
import { getDateForPage, getDateForPageWithoutBrackets } from '@benjypng/logseq-dateutils';

const preferredDateFormat = 'MMM do, yyyy';
const today = new Date();

getDateForPage(today, preferredDateFormat);
// e.g. '[[Oct 3rd, 2023]]'

getDateForPageWithoutBrackets(today, preferredDateFormat);
// e.g. 'Oct 3rd, 2023'
```

### getScheduledDateDay

Returns a complete `SCHEDULED:` line for the specified date, ready to insert into a block. The time is included only if it is not midnight.

```js
const today = new Date();

await logseq.Editor.updateBlock(
  uuid,
  `A quick brown fox
${getScheduledDateDay(today)}`
);
// Appends e.g. 'SCHEDULED: <2023-10-03 Tue>'
// or 'SCHEDULED: <2023-10-03 Tue 12:35>' if a time is set
```

### getDeadlineDateDay

Same as `getScheduledDateDay`, but returns a `DEADLINE:` line instead.

```js
const today = new Date();

await logseq.Editor.updateBlock(
  uuid,
  `A quick brown fox
${getDeadlineDateDay(today)}`
);
// Appends e.g. 'DEADLINE: <2023-10-03 Tue>'
// or 'DEADLINE: <2023-10-03 Tue 12:35>' if a time is set
```

### getYYMMDDTHHMMFormat

Returns the specified date and time in `yyMMdd'T'HHmm` format.

```js
getYYMMDDTHHMMFormat(new Date('2023-10-03T12:35:00'));
// '231003T1235'
```

### getYYMMDD

Returns the specified date in `yyMMdd` format.

```js
getYYMMDD(new Date('2023-10-03T12:35:00'));
// '231003'
```

## ☕️ Support

If you find this library useful, please consider supporting the development.

<div align="center">
  <a href="https://github.com/sponsors/benjypng"><img src="https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=for-the-badge&logo=github" alt="Sponsor on Github" /></a>&nbsp;<a href="https://buymeacoffee.com/hkgnp.dev"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee" /></a>
</div>

## 🤝 Contributing

Issues are welcome. If you find a bug, please open an issue — or join [Logseq's Discord](https://discord.gg/KpN4eHY) and look for me there. Pull requests are not accepted at the moment as I am not able to commit to reviewing them in a timely fashion.
