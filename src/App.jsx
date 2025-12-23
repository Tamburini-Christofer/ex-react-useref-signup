import { useState } from "react"
import './App.css'

function App() {

  const [utente, setUtente] = useState({
    nomeCompleto: "",
    username: "",
    password: "",
    specializzazione: "",
    anniEsperienza: "",
    descrizione: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setUtente((prevUtente) => ({
      ...prevUtente,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const {
      nomeCompleto,
      username,
      password,
      specializzazione,
      anniEsperienza,
      descrizione,
    } = utente

    if (
      !nomeCompleto.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializzazione ||
      !anniEsperienza ||
      !descrizione.trim()
    ) {
      console.log("Tutti i campi sono obbligatori")
      return
    }

    const anni = Number(anniEsperienza)

    if (Number.isNaN(anni) || anni <= 0) {
      console.log("Anni di esperienza deve essere un numero positivo")
      return
    }

    console.log("Dati utente:", {
      ...utente,
      anniEsperienza: anni,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomeCompleto"
          placeholder="Nome completo"
          value={utente.nomeCompleto}
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={utente.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={utente.password}
          onChange={handleChange}
        />

        <select
          name="specializzazione"
          value={utente.specializzazione}
          onChange={handleChange}
        >
          <option value="">Seleziona la specializzazione</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>

        <input
          type="number"
          name="anniEsperienza"
          placeholder="Anni di esperienza"
          value={utente.anniEsperienza}
          onChange={handleChange}
          min="1"
        />

        <textarea
          name="descrizione"
          placeholder="Inserisci una breve descrizione"
          value={utente.descrizione}
          onChange={handleChange}
        />

        <button type="submit">Registrati</button>
      </form>
    </>
  )
}

export default App
