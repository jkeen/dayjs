import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import localeData from '../../src/plugin/localeData'
import localizedFormat from '../../src/plugin/localizedFormat'
// import intlLocale from '../../src/plugin/intlLocale'
import '../../src/locale/fr'
import '../../src/locale/ru'
import '../../src/locale/zh-cn'

dayjs.extend(localizedFormat)
dayjs.extend(localeData)
// dayjs.extend(intlLocale)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('instance localedata is as expected', () => {
  const instanceLocaleData = dayjs().locale('en').localeData()
  expect(typeof instanceLocaleData.months).toEqual('function')
  expect(typeof instanceLocaleData.monthsShort).toEqual('function')
  expect(typeof instanceLocaleData.weekdays).toEqual('function')
  expect(typeof instanceLocaleData.weekdaysMin).toEqual('function')
  expect(typeof instanceLocaleData.weekdaysShort).toEqual('function')
})

it('global locale functions as expected', () => {
  expect(typeof dayjs.months).toEqual('function')
  expect(typeof dayjs.monthsShort).toEqual('function')
  expect(typeof dayjs.weekdays).toEqual('function')
  expect(typeof dayjs.weekdaysShort).toEqual('function')
})

it('global locale hashses is as expected', () => {
  expect(typeof dayjs.en.months).toEqual('object')
  expect(typeof dayjs.en.weekdays).toEqual('object')
})

it('Instance localeData', () => {
  ['zh-cn', 'en', 'fr'].forEach((lo) => {
    // it(`Locale: ${lo}`, () => {
    dayjs.locale(lo)
    moment.locale(lo)
    const d = dayjs()
    const m = moment()
    const dayjsLocaleData = dayjs().localeData()
    const momentLocaleData = moment().localeData()
    expect(dayjsLocaleData.months(d)).toBe(momentLocaleData.months(m))
    expect(dayjsLocaleData.months()).toEqual(momentLocaleData.months())
    expect(dayjsLocaleData.monthsShort(d)).toBe(momentLocaleData.monthsShort(m))
    expect(dayjsLocaleData.monthsShort()).toEqual(momentLocaleData.monthsShort())
    expect(dayjsLocaleData.weekdays(d)).toBe(momentLocaleData.weekdays(m))
    expect(dayjsLocaleData.weekdays()).toEqual(momentLocaleData.weekdays())
    expect(dayjsLocaleData.weekdaysShort(d)).toBe(momentLocaleData.weekdaysShort(m))
    expect(dayjsLocaleData.weekdaysShort()).toEqual(momentLocaleData.weekdaysShort())


    // expect(dayjsLocaleData.firstDayOfWeek()).toBe(momentLocaleData.firstDayOfWeek())
    // expect(dayjsLocaleData.weekdaysMin(d)).toBe(momentLocaleData.weekdaysMin(m))
    // expect(dayjsLocaleData.weekdaysMin()).toEqual(momentLocaleData.weekdaysMin())

    // const longDateFormats = ['LT', 'LTS', 'L', 'LL', 'LLL', 'LLLL', 'l', 'll', 'lll', 'llll']
    // longDateFormats.forEach((f) => {
    // expect(dayjsLocaleData.longDateFormat(f)).toEqual(momentLocaleData.longDateFormat(f))
    // })
    // })je
  })
  dayjs.locale('en')
  moment.locale('en')
})


it('Global localeData', () => {
  ['zh-cn', 'en', 'fr'].forEach((lo) => {
    dayjs.locale(lo)
    moment.locale(lo)
    const dayjsLocaleData = dayjs.localeData()
    const momentLocaleData = moment.localeData()
    // expect(dayjsLocaleData.firstDayOfWeek()).toBe(momentLocaleData.firstDayOfWeek())
    expect(dayjsLocaleData.months()).toEqual(momentLocaleData.months())
    expect(dayjsLocaleData.monthsShort()).toEqual(momentLocaleData.monthsShort())
    expect(dayjsLocaleData.weekdays()).toEqual(momentLocaleData.weekdays())
    expect(dayjsLocaleData.weekdaysShort()).toEqual(momentLocaleData.weekdaysShort())
    // expect(dayjsLocaleData.weekdaysMin()).toEqual(momentLocaleData.weekdaysMin())
  })
})

it('Listing the months and weekdays', () => {
  ['zh-cn', 'en', 'fr'].forEach((lo) => {
    dayjs.locale(lo)
    moment.locale(lo)
    expect(dayjs.months()).toEqual(moment.months())
    expect(dayjs.monthsShort()).toEqual(moment.monthsShort())
    expect(dayjs.weekdays()).toEqual(moment.weekdays())
    expect(dayjs.weekdaysShort()).toEqual(moment.weekdaysShort())
    // const momentWeekdaysMin = mome/nt.weekdaysMin().map(m => m.slice(0))
    // expect(dayjs.weekdaysMin()).toEqual(momentWeekdaysMin)
  })
})

it('Month function', () => {
  const dayjsLocaleData = dayjs().locale('ru').localeData()
  const momentLocaleData = moment().locale('ru').localeData()
  expect(dayjsLocaleData.months()).toEqual(momentLocaleData.months())
  expect(dayjsLocaleData.monthsShort()).toEqual(momentLocaleData.monthsShort())
  dayjs.locale('ru')
  moment.locale('ru')
  expect(dayjs.months()).toEqual(moment.months())
  expect(dayjs.monthsShort()).toEqual(moment.monthsShort())
})

it('Locale order', () => {
  dayjs.locale('fr')
  moment.locale('fr')
  expect(dayjs.weekdays(true)).toEqual(moment.weekdays(true))
  expect(dayjs.weekdaysShort(true)).toEqual(moment.weekdaysShort(true))
  expect(dayjs.weekdaysMin(true)).toEqual(moment.weekdaysMin(true))
  expect(dayjs.weekdays()).not.toEqual(dayjs.weekdays(true))
  dayjs.locale('en')
  moment.locale('en')
  expect(dayjs.weekdays(true)).toEqual(moment.weekdays(true))
})

it('meridiem', () => {
  dayjs.locale('zh-cn')
  expect(typeof dayjs.localeData().meridiem).toEqual('function')
  expect(typeof dayjs().localeData().meridiem).toEqual('function')
  dayjs.locale('en')
})

it('ordinal', () => {
  dayjs.locale('zh-cn')
  expect(typeof dayjs.localeData().ordinal).toEqual('function')
  expect(typeof dayjs().localeData().ordinal).toEqual('function')
  dayjs.locale('en')
})
