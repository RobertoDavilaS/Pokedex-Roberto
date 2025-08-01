import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import axios from 'axios'

type Types = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type Abilities = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

type Moves = {
  move: {
    name: string
    url: string
  }
  version_group_details: VersionGroupDetail[]
}

export interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: {
    name: string
    url: string
  }
  order: any
  version_group: {
    name: string
    url: string
  }
}

type Type = string

type Pokemon = {
  id: number
  name: string
  types: Type[]
  image: string
  stats: Stats
  abilities: string[]
  moves: string[]
}

type Stats = {
  hp: number
  attack: number
  defense: number
  speed: number
}

const baseUrl = 'https://pokeapi.co/api/v2/'

function Details () {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    axios.get(`${baseUrl}/pokemon/${name}`)
      .then(res => {
        setPokemon({
          id: res.data.id,
          name: res.data.name,
          types: res.data.types.map((t: Types) => t.type.name),
          abilities: res.data.abilities.map((a: Abilities) => a.ability.name),
          moves: res.data.moves.map((m: Moves) => m.move.name).slice(0, 20),
          image: res.data.sprites.other.dream_world.front_default,
          stats: {
            hp: res.data.stats[0].base_stat,
            attack: res.data.stats[1].base_stat,
            defense: res.data.stats[2].base_stat,
            speed: res.data.stats[5].base_stat
          }
        })
      })
  }, [])

  if (!pokemon) return <p>Loading pokemon page...</p>

  return (
  <div className="container details-container">
  <header>
    <Link to="/pokedex" className="back-link">← Volver</Link>
  </header>

  <div className="details-card">
    <div className="details-header">
      <span className="details-id">#{pokemon.id.toString().padStart(3, '0')}</span>
      <h1 className="details-name">{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} className="details-img" />
    </div>

    <div className="details-sections-grid">
      <div className="details-card-section">
        <h2>Types</h2>
        <ul className="details-list">
          {pokemon.types.map((t) => (
            <li key={t} className={`type-badge type-${t}`}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="details-card-section">
        <h2>Abilities</h2>
        <ul className="details-list">
          {pokemon.abilities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="details-card-section">
        <h2>Moves</h2>
        <ol className="details-moves">
          {pokemon.moves.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ol>
      </div>

      <div className="details-card-section">
        <h2>Stats</h2>
        <ul className="details-stats">
          <li>HP: {pokemon.stats.hp}</li>
          <li>Attack: {pokemon.stats.attack}</li>
          <li>Defense: {pokemon.stats.defense}</li>
          <li>Speed: {pokemon.stats.speed}</li>
        </ul>
      </div>
    </div>
  </div>
</div>)

}
export default Details