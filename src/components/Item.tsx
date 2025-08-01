import { useEffect, useState } from 'react'
import axios from 'axios'

type Pokemon = {
  id: number
  name: string
  types: any[]
  image: string
}

type Type = {
  slot: number
  type: {
    name: string
    url: string
  }
}

function Item ({ url }: { url: string }) {

  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map((t: Type) => t.type.name),
          image: res.data.sprites.other.dream_world.front_default
        })
      })
  }, [])

  if (!pokemon) return <p>Loading...</p>

  return (
  <div className='card'>
    <img className="card-image" src={pokemon.image} alt={pokemon.name} width={200} />
    <span className="card-id">#{pokemon.id.toString().padStart(3, '0')}</span>
    <h2 className="card-name">{pokemon.name}</h2>
    <div className="card-types">
      {pokemon.types.map(t => (
        <span key={t} className={`type-badge type-${t}`}>
          {t}
        </span>
      ))}
    </div>
  </div>
)

}
export default Item