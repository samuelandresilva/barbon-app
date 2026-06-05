import type { TemaCores } from '../types'

const cssVariableByColorKey: Record<keyof TemaCores, string> = {
  fundo: '--theme-background',
  primaria: '--theme-primary',
  secundaria: '--theme-secondary',
  texto: '--theme-text',
}

export function applyTemaCores(temaCores: TemaCores) {
  Object.entries(temaCores).forEach(([key, value]) => {
    const cssVariable = cssVariableByColorKey[key as keyof TemaCores]

    if (!cssVariable || !value) {
      return
    }

    document.documentElement.style.setProperty(cssVariable, value)
  })
}
