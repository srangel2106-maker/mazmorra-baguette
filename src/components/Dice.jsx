import { useState } from 'react'

const DADOS = [4, 6, 8, 10, 12, 20, 100]

export default function Dice() {
  const [caras, setCaras] = useState(20)
  const [resultado, setResultado] = useState(null)
  const [tiradas, setTiradas] = useState(0)

  function lanzar() {
    setResultado(Math.floor(Math.random() * caras) + 1) // de 1 a "caras"
    setTiradas(tiradas + 1)
  }

  return (
    <section>
      <h2>Dados</h2>
      <div className="dice-row">
        {DADOS.map((d) => (
          <button key={d} className={'die' + (caras === d ? ' on' : '')} onClick={() => setCaras(d)}>d{d}</button>
        ))}
      </div>
      <div key={tiradas} className="result">{resultado ?? '?'}</div>
      <button className="primary" onClick={lanzar}>Lanzar d{caras}</button>
    </section>
  )
}
