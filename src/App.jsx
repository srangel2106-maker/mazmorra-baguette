import { useState } from 'react'
import Bestiary from './components/Bestiary'
import Loot from './components/Loot'
import Dice from './components/Dice'

const TABS = [
  { id: 'bestiary', label: 'Bestiario', icon: '👹', view: <Bestiary /> },
  { id: 'loot', label: 'Botín', icon: '🥖', view: <Loot /> },
  { id: 'dice', label: 'Dados', icon: '🎲', view: <Dice /> },
]

export default function App() {
  const [tab, setTab] = useState('bestiary')
  return (
    <div className="app">
      <header><h1>Mazmorra Baguette</h1></header>
      <main>
        {TABS.map((t) => <div key={t.id} hidden={tab !== t.id}>{t.view}</div>)}
      </main>
      <nav>
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
