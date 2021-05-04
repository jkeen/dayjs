import { FORMAT_DEFAULT } from '../../constant'
import { u as updateFormatString, englishFormats } from './utils'

export default (o, c, d) => {
  const proto = c.prototype
  const oldFormat = proto.format

  if (!d.en.formats) {
    d.en.formats = englishFormats
  }
  proto.format = function (formatStr = FORMAT_DEFAULT) {
    const { formats = {} } = this.$locale()

    const newUpdateString = updateFormatString(formatStr, formats, this.$d)
    // if the locale provides formatter functions, process those before passing along the new string to .format
    return oldFormat.call(this, newUpdateString)
  }
}

