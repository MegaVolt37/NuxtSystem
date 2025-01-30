import { camelToKebab } from "@/utils/camelToKebab"

type ModsType =
  | {
      [key: string]: string | boolean
    }
  | {}

export function bem(name: string, mods: ModsType = {}): string {
  const result = [name]

  for (const [mod, value] of Object.entries(mods)) {
    if (value === true) {
      result.push(`${name}--${camelToKebab(mod)}`)
    } else if (value) {
      result.push(`${name}--${camelToKebab(mod)}--${camelToKebab(value)}`)
    }
  }

  return result.join(" ")
}