const intlLocaleData = (localeName, extrasAndOverrides = {}) => {
  const intlFormat = (dateOrDates, formatting, localeSort = false) => {
    // TODO:: if locale sort sort by locale week order, sort by that order

    const results = [].concat(dateOrDates).map(d => new Intl.DateTimeFormat(localeName, formatting).format(d))
    if (results.length > 1) {
      return results
    }

    return results[0]
  }
  const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => (new Date(2020, month, 1)))
  const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7]
    .map(day => new Date(2020, 2, day))
    .sort((d1, d2) => d1.getDay() > d2.getDay())

  const interpreters = {
    months: (d = MONTHS) => intlFormat(d, { month: 'long' }),
    monthsShort: (d = MONTHS) => intlFormat(d, { month: 'short' }),
    weekdays: (d = WEEKDAYS, localeSort) => intlFormat(d, { weekday: 'long' }, localeSort),
    weekdaysShort: (d = WEEKDAYS, localeSort) => intlFormat(d, { weekday: 'short' }, localeSort),
    weekdaysMin: (d = WEEKDAYS, localeSort) => intlFormat(d, { weekday: 'narrow' }, localeSort)
  }

  // const relativeTime = {
  //   future: "in %s",
  //   past: "%s ago",
  //   s: 'a few seconds',
  //   m: "a minute",
  //   mm: "%d minutes",
  //   h: "an hour",
  //   hh: "%d hours",
  //   d: "a day",
  //   dd: "%d days",
  //   M: "a month",
  //   MM: "%d months",
  //   y: "a year",
  //   yy: "%d years"
  // }

  const formats = {
    l: d => intlFormat(d, { year: 'numeric', month: 'numeric', day: 'numeric' }),
    L: d => intlFormat(d, { year: 'numeric', month: '2-digit', day: '2-digit' }),
    LT: d => intlFormat(d, { hour: 'numeric', minute: 'numeric' }),
    LTS: d => intlFormat(d, { hour: 'numeric', minute: 'numeric', second: 'numeric' }),
    ll: d => intlFormat(d, { year: 'numeric', month: 'short', day: 'numeric' }),
    LL: d => intlFormat(d, { year: 'numeric', month: 'long', day: 'numeric' }),
    lll: d => intlFormat(d, {
      year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
    }),
    LLL: d => intlFormat(d, {
      year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
    }),
    llll: d => intlFormat(d, {
      year: 'numeric', month: 'short', day: 'numeric', weekday: 'short', hour: 'numeric', minute: 'numeric'
    }),
    LLLL: d => intlFormat(d, {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric'
    }),
    ...(extrasAndOverrides.formats || {})
  }

  delete extrasAndOverrides.formats
  delete extrasAndOverrides.name

  const data = {
    name: localeName,
    months: interpreters.months(MONTHS),
    monthsShort: interpreters.monthsShort(MONTHS),
    weekdays: interpreters.weekdays(WEEKDAYS),
    weekdaysShort: interpreters.weekdaysShort(WEEKDAYS),
    weekdaysMin: interpreters.weekdaysMin(WEEKDAYS),
    formats,
    ...extrasAndOverrides
  }

  const locale = {
    name: localeName,
    months: (d = MONTHS) => interpreters.months(d),
    monthsShort: (d = MONTHS) => interpreters.monthsShort(d),
    weekdays: (d = WEEKDAYS, localeSort) => interpreters.weekdays(d, localeSort),
    weekdaysShort: (d = WEEKDAYS, localeSort) => interpreters.weekdaysShort(d, localeSort),
    weekdaysMin: (d = WEEKDAYS, localeSort) => interpreters.weekdaysMin(d, localeSort),
    formats,
    ...extrasAndOverrides
  }

  return {
    locale, data
  }
}

export default intlLocaleData
