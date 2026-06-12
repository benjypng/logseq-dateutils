[:gift_heart: Sponsor this project on Github](https://github.com/sponsors/hkgnp) or [:coffee: Get me a coffee](https://www.buymeacoffee.com/hkgnp.dev) if you like this plugin!

# Overview

Provides some date utilities for developing Logseq plugins, in particular to cater to handling multiple user-defined date formats.

# Installation

With npm:

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

# Usage

Below is an elaboration of the methods available:

## getDateForPage or getDateForPageWithoutBrackets

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

## getScheduledDateDay

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

## getDeadlineDateDay

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

## getYYMMDDTHHMMFormat

Returns the specified date and time in `yyMMdd'T'HHmm` format.

```js
getYYMMDDTHHMMFormat(new Date('2023-10-03T12:35:00'));
// '231003T1235'
```

## getYYMMDD

Returns the specified date in `yyMMdd` format.

```js
getYYMMDD(new Date('2023-10-03T12:35:00'));
// '231003'
```

# Getting Help

Do join [Logseq's Discord](https://discord.gg/KpN4eHY) and look for me there!
