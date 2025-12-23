import { useState, useRef, useEffect } from "react"
import './App.css'

const letters = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"

function App() {

  const [utente, setUtente] = useState({
    username: "",
    password: "",
    descrizione: "",
  })

  const nomeCompletoRef = useRef(null)
  const specializzazioneRef = useRef(null)
  const anniEsperienzaRef = useRef(null)

  useEffect(() => {
    if (nomeCompletoRef.current) {
      nomeCompletoRef.current.focus()
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUtente((prevUtente) => ({
      ...prevUtente,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nomeCompleto = nomeCompletoRef.current?.value || ""
    const specializzazione = specializzazioneRef.current?.value || ""
    const anniEsperienza = anniEsperienzaRef.current?.value || ""

    const { username, password, descrizione } = utente

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
    
    const { isValid: isUsernameValid } = validateUsername(username)
    const { isValid: isPasswordValid } = validatePassword(password)
    const { isValid: isDescrizioneValid } = validateDescrizione(descrizione)

    if (!isUsernameValid || !isPasswordValid || !isDescrizioneValid) {
      console.log("Alcuni campi non rispettano i requisiti di validazione")
      return
    }

    console.log("Dati utente validi:", {
      ...utente,
      anniEsperienza: anni,
    })
  }

  const handleReset = () => {
    setUtente({
      username: "",
      password: "",
      descrizione: "",
    })

    if (nomeCompletoRef.current) {
      nomeCompletoRef.current.value = ""
    }

    if (specializzazioneRef.current) {
      specializzazioneRef.current.value = ""
    }

    if (anniEsperienzaRef.current) {
      anniEsperienzaRef.current.value = ""
    }

    if (nomeCompletoRef.current) {
      nomeCompletoRef.current.focus()
    }
  }

  const validateUsername = (value) => {
    const trimmed = value.trim()

    if (!trimmed) {
      return {
        isValid: false,
        message: "Lo username è obbligatorio",
      }
    }

    if (trimmed.length < 6) {
      return {
        isValid: false,
        message: "Lo username deve avere almeno 6 caratteri",
      }
    }

    for (const char of trimmed) {
      const lowerChar = char.toLowerCase()
      const isLetter = letters.includes(lowerChar)
      const isNumber = numbers.includes(char)

      if (!isLetter && !isNumber) {
        return {
          isValid: false,
          message: "Lo username può contenere solo lettere e numeri (niente spazi o simboli)",
        }
      }
    }

    return {
      isValid: true,
      message: "Username valido",
    }
  }

  const validatePassword = (value) => {
    if (!value) {
      return {
        isValid: false,
        message: "La password è obbligatoria",
      }
    }

    if (value.length < 8) {
      return {
        isValid: false,
        message: "La password deve avere almeno 8 caratteri",
      }
    }

    let hasLetter = false
    let hasNumber = false
    let hasSymbol = false

    for (const char of value) {
      const lowerChar = char.toLowerCase()

      if (letters.includes(lowerChar)) {
        hasLetter = true
      } else if (numbers.includes(char)) {
        hasNumber = true
      } else if (symbols.includes(char)) {
        hasSymbol = true
      }
    }

    if (!hasLetter || !hasNumber || !hasSymbol) {
      return {
        isValid: false,
        message: "La password deve contenere almeno 1 lettera, 1 numero e 1 simbolo",
      }
    }

    return {
      isValid: true,
      message: "Password valida",
    }
  }

  const validateDescrizione = (value) => {
    const trimmed = value.trim()
    const length = trimmed.length

    if (!length) {
      return {
        isValid: false,
        message: "La descrizione è obbligatoria",
      }
    }

    if (length < 100) {
      return {
        isValid: false,
        message: `La descrizione deve avere almeno 100 caratteri (ora: ${length})`,
      }
    }

    if (length > 1000) {
      return {
        isValid: false,
        message: `La descrizione non può superare i 1000 caratteri (ora: ${length})`,
      }
    }

    return {
      isValid: true,
      message: "Descrizione valida",
    }
  }

  const usernameValidation = validateUsername(utente.username)
  const passwordValidation = validatePassword(utente.password)
  const descrizioneValidation = validateDescrizione(utente.descrizione)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomeCompleto"
          placeholder="Nome completo"
          ref={nomeCompletoRef}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={utente.username}
          onChange={handleChange}
        />

        <p
          className={`helper-text ${
            usernameValidation.isValid ? 'helper-text--valid' : 'helper-text--error'
          }`}
        >
          {usernameValidation.message}
        </p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={utente.password}
          onChange={handleChange}
        />

        <p
          className={`helper-text ${
            passwordValidation.isValid ? 'helper-text--valid' : 'helper-text--error'
          }`}
        >
          {passwordValidation.message}
        </p>

        <select
          name="specializzazione"
          ref={specializzazioneRef}
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
          ref={anniEsperienzaRef}
          min="1"
        />

        <textarea
          name="descrizione"
          placeholder="Inserisci una breve descrizione"
          value={utente.descrizione}
          onChange={handleChange}
        />

        <p
          className={`helper-text ${
            descrizioneValidation.isValid ? 'helper-text--valid' : 'helper-text--error'
          }`}
        >
          {descrizioneValidation.message}
        </p>

        <button type="submit">Registrati</button>
      </form>
      <button type="button" onClick={handleReset} className="reset-button">
        Reset
      </button>

      <button
        type="button"
        className="scroll-top"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      >
        ↑
      </button>
    </>
  )
}

export default App
