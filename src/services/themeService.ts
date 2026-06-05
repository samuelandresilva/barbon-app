import type { TemaCores } from '../types'

const cssVariableByColorKey: Record<keyof TemaCores, string> = {
  fundo: '--theme-background',
  primaria: '--theme-primary',
  secundaria: '--theme-secondary',
  texto: '--theme-text',
}

interface RgbColor {
  blue: number
  green: number
  red: number
}

function parseColor(value: string): RgbColor | null {
  const trimmedValue = value.trim()
  const hexMatch = /^#(?<hex>[0-9a-f]{3}|[0-9a-f]{6})$/i.exec(trimmedValue)

  if (hexMatch?.groups?.hex) {
    const hex = hexMatch.groups.hex
    const normalizedHex =
      hex.length === 3
        ? hex
            .split('')
            .map((character) => `${character}${character}`)
            .join('')
        : hex

    return {
      blue: Number.parseInt(normalizedHex.slice(4, 6), 16),
      green: Number.parseInt(normalizedHex.slice(2, 4), 16),
      red: Number.parseInt(normalizedHex.slice(0, 2), 16),
    }
  }

  const rgbMatch =
    /^rgba?\((?<red>\d+(?:\.\d+)?),\s*(?<green>\d+(?:\.\d+)?),\s*(?<blue>\d+(?:\.\d+)?)/i.exec(
      trimmedValue,
    )

  if (!rgbMatch?.groups) {
    return null
  }

  return {
    blue: Number(rgbMatch.groups.blue),
    green: Number(rgbMatch.groups.green),
    red: Number(rgbMatch.groups.red),
  }
}

function getRelativeLuminance({ blue, green, red }: RgbColor) {
  const [linearRed, linearGreen, linearBlue] = [red, green, blue].map(
    (channel) => {
      const normalizedChannel = channel / 255

      return normalizedChannel <= 0.03928
        ? normalizedChannel / 12.92
        : ((normalizedChannel + 0.055) / 1.055) ** 2.4
    },
  )

  return linearRed * 0.2126 + linearGreen * 0.7152 + linearBlue * 0.0722
}

function applyDerivedThemeColors() {
  const root = document.documentElement
  const styles = getComputedStyle(root)
  const backgroundColor = parseColor(
    styles.getPropertyValue('--theme-background'),
  )

  if (!backgroundColor) {
    return
  }

  const isDarkTheme = getRelativeLuminance(backgroundColor) < 0.45

  root.style.setProperty('color-scheme', isDarkTheme ? 'dark' : 'light')
  root.style.setProperty(
    '--color-background-line',
    `color-mix(in srgb, var(--theme-primary) ${isDarkTheme ? 5 : 4}%, transparent)`,
  )
  root.style.setProperty(
    '--color-surface',
    isDarkTheme
      ? 'color-mix(in srgb, var(--theme-background) 94%, var(--theme-text))'
      : '#ffffff',
  )
  root.style.setProperty(
    '--color-shadow',
    isDarkTheme ? 'rgba(0, 0, 0, 0.24)' : 'rgba(15, 23, 42, 0.1)',
  )
  root.style.setProperty(
    '--color-hero-glow',
    `color-mix(in srgb, var(--theme-primary) ${isDarkTheme ? 12 : 8}%, transparent)`,
  )
}

export function applyTemaCores(temaCores: TemaCores) {
  Object.entries(temaCores).forEach(([key, value]) => {
    const cssVariable = cssVariableByColorKey[key as keyof TemaCores]

    if (!cssVariable || !value) {
      return
    }

    document.documentElement.style.setProperty(cssVariable, value)
  })

  applyDerivedThemeColors()
}
