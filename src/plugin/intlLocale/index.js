import intlLocaleData from './intl-locale'

// export const convertToLowercaseFormat = format =>
//   format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (_, a, b) => a || b.slice(1))

// Generates locale data from the browser's Intl

export default (option, ins, klass) => {
  const instance = ins.prototype
  const fallbackLocale = 'en'

  // Provide default en locale data to the global object
  klass.Ls.en = intlLocaleData('en').data
  klass.en = klass.Ls.en

  const klassOldLocale = klass.locale
  klass.locale = function (preset, object = {}) {
    if (!klass.Ls[preset]) {
      return klassOldLocale.call(this, preset, intlLocaleData(preset, object).locale)
    }

    return klassOldLocale.call(this, preset, null)
  }

  klass.localeData = (localeName = klass.locale()) => {
    const intlLocale = intlLocaleData(localeName).locale
    return {
      formats: () => intlLocale.formats(),
      firstDayOfWeek: () => 0,
      weekdays: intlLocale.weekdays,
      weekdaysShort: intlLocale.weekdaysShort,
      weekdaysMin: intlLocale.weekdaysMin,
      months: localeSort => intlLocale.months,
      monthsShort: localeSort => intlLocale.monthsShort,
    }
  }

  // these class methods return the names of the objects in the currently selected locale
  klass.formats = localeSort => klass.localeData().formats(localeSort)
  klass.months = localeSort => klass.localeData().months(localeSort)
  klass.monthsShort = localeSort => klass.localeData().monthsShort(localeSort)
  klass.weekdays = localeSort => klass.localeData().weekdays(localeSort)
  klass.weekdaysShort = localeSort => klass.localeData().weekdaysShort(localeSort)
  klass.weekdaysMin = localeSort => klass.localeData().weekdaysMin(localeSort)


  // Instance methods
  const oldLocale = instance.locale
  instance.locale = function (preset, object) {
    if (!preset) return instance.$L
    const desiredLocale = (typeof preset === 'object' ? preset.name : preset)
    // Return a locale that's supported

    let supportedLocale = fallbackLocale
    try {
      [supportedLocale] = Intl.DateTimeFormat.supportedLocalesOf([desiredLocale, fallbackLocale])
    } catch (e) {
      // an invalid locale was passed in, e.g. 'mock'
    }

    if (klass.Ls[supportedLocale]) {
      klass.Ls[supportedLocale] = intlLocaleData(supportedLocale, klass.Ls[supportedLocale]).locale

      return oldLocale.call(this, klass.Ls[supportedLocale])
    }

    return oldLocale.call(this, intlLocaleData(supportedLocale, object).locale)
  }

  instance.localeData = function () {
    return klass.localeData(this.$L)
  }

  // const oldParse = instance.parse
  // instance.parse = function (cfg) {
  //   oldParse.call(this, cfg)

  //   if (cfg.locale) {
  //     const { name } = cfg.locale
  //     this.locale(cfg.locale)
  //     // this locale was passed in, and ours was autogenerated. we want to merge the two favoring the passed in one
  //   }

  // }
}
