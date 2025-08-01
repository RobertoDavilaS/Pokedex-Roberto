import { Link } from 'react-router'
import Item from './Item'
import { useEffect, useState } from 'react'

type Pokemon = {
  name: string
  url: string
}

function List ({ pokemons }: { pokemons: Pokemon[] }) {
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [pokemons.length])

  const itemsPerPage = 12
  const totalPages = Math.ceil(pokemons.length / itemsPerPage)

  const goToPage = (current: number) => {
    setPage(Math.max(1, Math.min(current, totalPages)))
  }

  const prev = () => goToPage(page - 1)
  const next = () => goToPage(page + 1)

  const paginatedItems = pokemons.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const range = []
  const maxVisibleButtons = 7
  const half = Math.floor(maxVisibleButtons / 2)
  let start = Math.max(1, page - half)
  let end = start + maxVisibleButtons - 1
  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, end - maxVisibleButtons + 1)
  }
  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return (
    <>
      <div className='content'>

  <div className='cards-container'>
    {paginatedItems.map(p => (
      <Link key={p.url} to={`/pokedex/${p.name}`} className="card-link">
        <Item url={p.url} />
      </Link>
    ))}
  </div>

  {/* Paginación al final */}
  <div className='pagination'>
    <span>{page} of {totalPages}</span>
    <div>
      <button type='button' onClick={prev} disabled={page === 1}>Atrás</button>
      {range.map(n => (
        <button key={n} className={`${n === page ? 'active' : ''}`} type='button' onClick={() => goToPage(n)}>
          {n}
        </button>
      ))}
      <button type='button' onClick={next} disabled={page === totalPages}>Siguiente</button>
    </div>
  </div>

</div>
    </>
  )
}
export default List
