// Imágenes locales (carpeta public/img). Cada monstruo recibe una según su nombre.
const IMGS = ['dragon', 'copycat', 'tortuga', 'oso', 'vulpecula', 'gato', 'criaturas']

export function imageFor(name) {
  let n = 0
  for (const c of name) n += c.charCodeAt(0)
  return `/img/${IMGS[n % IMGS.length]}.jpg`
}
