export function camelToKebab(className: string): string {
  return className.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}