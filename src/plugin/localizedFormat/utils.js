// eslint-disable-next-line import/prefer-default-export
export const t = format =>
  format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (_, a, b) => a || b.slice(1))

export const englishFormats = {
  LTS: 'h:mm:ss A',
  LT: 'h:mm A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A'
}

export const u = (formatStr, formats, date) => formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (match, ignored, formatKey) => {
  const capsFormatKey = formatKey && formatKey.toUpperCase()
  if (ignored) {
    return ignored
  } else if (formats[formatKey] && typeof formats[formatKey] === 'function') {
    return `[${formats[formatKey](date)}]` // interpolate the string and make sure it's ignored in the next phase
  } else if (formats[capsFormatKey] && typeof formats[capsFormatKey] === 'function') {
    return `[${formats[capsFormatKey](date)}]` // interpolate the string and make sure it's ignored in the next phase
  }

  return (formats[formatKey] || t(formats[capsFormatKey]))
})
