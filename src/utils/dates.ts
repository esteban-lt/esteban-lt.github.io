import type { Lang } from '@/i18n'
import { locales } from '@/i18n'

export type MonthStr = `${number}-${number}`;

const units = {
  es: { year: ['año', 'años'], month: ['mes', 'meses'] },
  en: { year: ['year', 'years'], month: ['month', 'months'] },
} as const

const parseMonth = (value: MonthStr) => {
  const [year, month] = value.split('-').map(Number)
  return { year, month }
}

export const formatMonth = (value: MonthStr, lang: Lang = 'es') => {
  const { year, month } = parseMonth(value)
  const label = new Intl.DateTimeFormat(locales[lang].intl, { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace(' de ', ' ')
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export const getDuration = (start: MonthStr, end: MonthStr | null, lang: Lang = 'es') => {
  const from = parseMonth(start)
  const now = new Date()
  const to = end ? parseMonth(end) : { year: now.getFullYear(), month: now.getMonth() + 1 }
  const totalMonths = (to.year - from.year) * 12 + (to.month - from.month) + 1
  if (totalMonths < 1) return ''

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const unit = units[lang]
  const parts = []
  if (years) parts.push(`${years} ${unit.year[years === 1 ? 0 : 1]}`)
  if (months) parts.push(`${months} ${unit.month[months === 1 ? 0 : 1]}`)
  return parts.join(' ')
}
