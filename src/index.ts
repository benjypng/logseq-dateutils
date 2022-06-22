const getOrdinalNum = (n: number) => {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
};

export const getDateForPage = (d: Date, preferredDateFormat: string) => {
  const getYear = d.getFullYear();
  const getMonth = d.toString().substring(4, 7);
  const getMonthNumber = d.getMonth() + 1;
  const getDate = d.getDate();
  const getMonthInFull = d.toLocaleString("default", { month: "long" });

  if (preferredDateFormat === "MMM do yyyy") {
    return `[[${getMonth} ${getOrdinalNum(getDate)}, ${getYear}]]`;
  } else if (
    preferredDateFormat.includes("yyyy") &&
    preferredDateFormat.includes("MM") &&
    preferredDateFormat.includes("dd") &&
    (preferredDateFormat.includes("EEEE") ||
      preferredDateFormat.includes("EEE") ||
      preferredDateFormat.includes("E")) &&
    ("-" || "_" || "/" || "-" || "-" || ",")
  ) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const mapObj = {
      yyyy: getYear,
      dd: ("0" + getDate).slice(-2),
      MM: ("0" + getMonthNumber).slice(-2),
      EEEE: weekdays[d.getDay()],
      EEE: weekdays[d.getDay()].substring(0, 3),
      E: weekdays[d.getDay()].substring(0, 1),
    };

    let dateStr = preferredDateFormat;

    dateStr = dateStr.replace(/yyyy|dd|MM|EEEE|EEE|E/gi, function (matched) {
      return mapObj[matched];
    });

    return `[[${dateStr}]]`;
  } else if (
    preferredDateFormat === "do MMMM yyyy" ||
    preferredDateFormat === "MMMM do, yyyy"
  ) {
    const mapObj = {
      yyyy: getYear,
      do: getOrdinalNum(getDate),
      MMMM: getMonthInFull,
    };
    let dateStr = preferredDateFormat;
    dateStr = dateStr.replace(/yyyy|do|MMMM/gi, function (matched) {
      return mapObj[matched];
    });
    return `[[${dateStr}]]`;
  } else if (
    preferredDateFormat.includes("yyyy") &&
    preferredDateFormat.includes("MM") &&
    preferredDateFormat.includes("dd") &&
    ("-" || "_" || "/")
  ) {
    const mapObj = {
      yyyy: getYear,
      dd: ("0" + getDate).slice(-2),
      MM: ("0" + getMonthNumber).slice(-2),
    };
    let dateStr = preferredDateFormat;
    dateStr = dateStr.replace(/yyyy|dd|MM/gi, function (matched) {
      return mapObj[matched];
    });
    return `[[${dateStr}]]`;
  } else {
    return `[[${getMonth} ${getOrdinalNum(getDate)}, ${getYear}]]`;
  }
};

export const getDateForPageWithoutBrackets = (
  d: Date,
  preferredDateFormat: string
) => {
  const getYear = d.getFullYear();
  const getMonth = d.toString().substring(4, 7);
  const getMonthNumber = d.getMonth() + 1;
  const getDate = d.getDate();
  const getMonthInFull = d.toLocaleString("default", { month: "long" });

  if (preferredDateFormat === "MMM do yyyy") {
    return `${getMonth} ${getOrdinalNum(getDate)}, ${getYear}`;
  } else if (
    preferredDateFormat.includes("yyyy") &&
    preferredDateFormat.includes("MM") &&
    preferredDateFormat.includes("dd") &&
    (preferredDateFormat.includes("EEEE") ||
      preferredDateFormat.includes("EEE") ||
      preferredDateFormat.includes("E")) &&
    ("-" || "_" || "/" || "-" || "-" || ",")
  ) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const mapObj = {
      yyyy: getYear,
      dd: ("0" + getDate).slice(-2),
      MM: ("0" + getMonthNumber).slice(-2),
      EEEE: weekdays[d.getDay()],
      EEE: weekdays[d.getDay()].substring(0, 3),
      E: weekdays[d.getDay()].substring(0, 1),
    };

    let dateStr = preferredDateFormat;

    dateStr = dateStr.replace(/yyyy|dd|MM|EEEE|EEE|E/gi, function (matched) {
      return mapObj[matched];
    });

    return `${dateStr}`;
  } else if (
    preferredDateFormat === "do MMMM yyyy" ||
    preferredDateFormat === "MMMM do, yyyy"
  ) {
    const mapObj = {
      yyyy: getYear,
      do: getOrdinalNum(getDate),
      MMMM: getMonthInFull,
    };
    let dateStr = preferredDateFormat;
    dateStr = dateStr.replace(/yyyy|do|MMMM/gi, function (matched) {
      return mapObj[matched];
    });
    return `${dateStr}`;
  } else if (
    preferredDateFormat.includes("yyyy") &&
    preferredDateFormat.includes("MM") &&
    preferredDateFormat.includes("dd") &&
    ("-" || "_" || "/")
  ) {
    const mapObj = {
      yyyy: getYear,
      dd: ("0" + getDate).slice(-2),
      MM: ("0" + getMonthNumber).slice(-2),
    };
    let dateStr = preferredDateFormat;
    dateStr = dateStr.replace(/yyyy|dd|MM/gi, function (matched) {
      return mapObj[matched];
    });
    return `${dateStr}`;
  } else if (preferredDateFormat === "MMMM do, yyyy") {
    return `${d.toLocaleString("default", {
      month: "long",
    })} ${getOrdinalNum(getDate)}, ${getYear}`;
  } else if (preferredDateFormat === "do MMM yyyy") {
    return `${getOrdinalNum(getDate)} ${getMonth} ${getYear}`;
  } else {
    return `${getMonth} ${getOrdinalNum(getDate)}, ${getYear}`;
  }
};

export const getDayInText = (d: Date) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekdays[d.getDay()];
};

export const getScheduledDeadlineDateDay = (d: Date) => {
  const getYear = d.getFullYear();
  const getMonthNumber = d.getMonth() + 1;
  const getDate = d.getDate();

  return `${getYear}-${getMonthNumber}-${getDate} ${getDayInText(d).substring(
    0,
    3
  )}`;
};

export const getScheduledDeadlineDateDayTime = (d: Date) => {
  const getYear = d.getFullYear();
  const getMonthNumber = d.getMonth() + 1;
  const getDate = d.getDate();

  return `${getYear}-${getMonthNumber}-${getDate} ${getDayInText(d).substring(
    0,
    3
  )} ${d.toTimeString().substring(0, 5)}`;
};

export const getYYMMDDTHHMMFormat = (d: Date) => {
  return `${[
    d.getFullYear(),
    ("0" + (d.getMonth() + 1)).slice(-2),
    ("0" + d.getDate()).slice(-2),
  ].join("-")}T${d.toTimeString().substring(0, 5)}`;
};

export const getYYYMMDD = (d: Date) => {
  return [
    d.getFullYear(),
    ("0" + (d.getMonth() + 1)).slice(-2),
    ("0" + d.getDate()).slice(-2),
  ].join("");
};