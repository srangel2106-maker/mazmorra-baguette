const BASE = 'https://www.dnd5eapi.co'
const cache = {}

export async function get(path) {
  if (!cache[path]) {
    const res = await fetch(BASE + path)
    if (!res.ok) throw new Error('No se pudo consultar la API')
    cache[path] = await res.json()
  }
  return cache[path]
}

export const armorClass = (m) =>
  Array.isArray(m.armor_class) ? m.armor_class[0]?.value : m.armor_class
