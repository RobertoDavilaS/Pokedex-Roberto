import { useRef, useState } from 'react'
import { useName } from '../context/nameContext'
import { Link, useNavigate } from 'react-router'

function Home () {
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { name, getName } = useName()

  const handleSetName = () => {
    const value = inputRef.current?.value.trim()
    setError(null)

    if (!value) {
      setError('El nombre no puede estar vacío')
      return
    }

    getName(value)
    inputRef.current!.value = ''
    navigate('/pokedex')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSetName()
    }
  }

  return (
    <div className="container">
      {!name && (
        <div className="form-home">
          <h1>¡Bienvenidos a la Pokédex!</h1>
          <p>Para comenzar, ingresa tu nombre de entrenador</p>
          <input
            type="text"
            ref={inputRef}
            placeholder="Escribe tu nombre"
            className="input-home"
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="btn-home" onClick={handleSetName}>
            Comenzar
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      {name && (
        <div className="form-home">
          <h2>Hola de nuevo, {name}! 👋</h2>
          <p>
            Ir a tu <Link to="/pokedex">Pokedex</Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default Home