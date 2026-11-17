import { useState } from 'react'
import { get } from '../api'
import Card from './Card'

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = (arr) => arr[rnd(0, arr.length - 1)]

// Rarezas permitidas según el CR
const rarezas = (cr) =>
  cr <= 4 ? ['common', 'uncommon'] : cr <= 10 ? ['uncommon', 'rare'] : cr <= 16 ? ['rare', 'very rare'] : ['very rare', 'legendary']

async function objetoMagico(cr, lista) {
  for (let i = 0; i < 15; i++) {
    const d = await get(pick(lista).url)
    if (rarezas(cr).includes(d.rarity?.name?.toLowerCase())) return d
  }
}

export default function Loot() {
  const [cr, setCr] = useState(1)
  const [loot, setLoot] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function generar() {
    setLoading(true); setError('')
    try {
      const [equipo, magicos] = await Promise.all([get('/api/equipment'), get('/api/magic-items')])
      const monedas = { oro: rnd(1, 10) * Math.max(1, cr) * (cr < 5 ? 1 : 5), plata: rnd(5, 30) * Math.max(1, cr) }
      if (cr >= 11) monedas.platino = rnd(1, 6) * (cr - 8)
      const items = []
      const cantidad = 1 + Math.floor(cr / 6) + rnd(0, 1)
      for (let i = 0; i < cantidad; i++) {
        // A más CR, más probabilidad de objeto mágico
        const m = Math.random() < 0.1 + cr * 0.04 ? await objetoMagico(cr, magicos.results) : null
        const e = m ?? (await get(pick(equipo.results).url))
        items.push({ name: e.name, tipo: m ? `Mágico (${m.rarity.name})` : e.equipment_category?.name })
      }
      setLoot({ monedas, items })
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <section>
      <h2>Botín</h2>
      <label htmlFor="cr">Desafío del monstruo derrotado: <b>{cr}</b></label>
      <input id="cr" type="range" min="0" max="30" value={cr} onChange={(e) => setCr(+e.target.value)} />
      <button className="primary" onClick={generar} disabled={loading}>{loading ? 'Buscando…' : 'Generar botín'}</button>
      {error && <p className="error">{error}. Revisa tu conexión.</p>}
      {loot && (
        <>
          <div className="coins">
            {Object.entries(loot.monedas).map(([n, v]) => (
              <div key={n} className={`coin ${n}`}><b>{v}</b>{n}</div>
            ))}
          </div>
          <div className="grid">
            {loot.items.map((it, i) => (
              <Card key={i} title={it.name}><p className="meta">{it.tipo}</p></Card>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
