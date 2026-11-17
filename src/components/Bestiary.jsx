import { useEffect, useState } from 'react'
import { get, armorClass } from '../api'
import { imageFor } from '../images'
import Card from './Card'

const CRS = [0, 0.25, 0.5, 1, 2, 3, 4, 5, 8, 10, 15, 20]
const fmt = (cr) => ({ 0.25: '1/4', 0.5: '1/2' }[cr] ?? cr)

export default function Bestiary() {
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [cr, setCr] = useState('')
  const [shown, setShown] = useState(12)
  const [monsters, setMonsters] = useState([])
  const [error, setError] = useState('')

  // Lista de monstruos (el filtro de CR lo hace la API)
  useEffect(() => {
    setShown(12)
    get('/api/monsters' + (cr !== '' ? `?challenge_rating=${cr}` : ''))
      .then((d) => setList(d.results))
      .catch((e) => setError(e.message))
  }, [cr])

  const filtered = list.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))

  // Detalles solo de los que se están mostrando
  useEffect(() => {
    Promise.all(filtered.slice(0, shown).map((m) => get(m.url)))
      .then(setMonsters)
      .catch((e) => setError(e.message))
  }, [list, search, shown]) // eslint-disable-line

  return (
    <section>
      <h2>Bestiario</h2>
      <div className="filters">
        <input type="search" placeholder="Buscar monstruo…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={cr} onChange={(e) => setCr(e.target.value)}>
          <option value="">Todos los CR</option>
          {CRS.map((c) => <option key={c} value={c}>CR {fmt(c)}</option>)}
        </select>
      </div>
      {error && <p className="error">{error}. Revisa tu conexión.</p>}
      <div className="grid">
        {monsters.map((m) => (
          <Card
            key={m.index}
            title={m.name}
            image={imageFor(m.name)}
            stats={[
              { label: 'Armadura', value: armorClass(m) },
              { label: 'Vida', value: m.hit_points },
              { label: 'Desafío', value: fmt(m.challenge_rating) },
            ]}
          />
        ))}
      </div>
      {filtered.length > shown && <button className="more" onClick={() => setShown(shown + 12)}>Ver más</button>}
    </section>
  )
}
