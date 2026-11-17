// Tarjeta reutilizable: título, imagen opcional, estadísticas y contenido extra
export default function Card({ title, image, stats = [], children }) {
  return (
    <article className="card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      {stats.length > 0 && (
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value ?? '—'}</dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </article>
  )
}
