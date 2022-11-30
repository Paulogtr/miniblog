import styles from './Register.module.css'

import { useState, useEffect } from 'react'
import { useAuthentcation } from '../../hooks/useAuthentcation'

const Regiser = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentcation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user ={
      displayName, email, password
    }

    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais!")
      return
    }

    const res = await createUser(user)

    console.log(user)

  };

  useEffect(() => {
    if(authError){
      setError(authError)
    }

  },[authError])

  return (
    <div className={styles.register}>
      <h2>Cadastre-se para postar</h2>
      <p>Crie seu usuário e compartilhe as suas histórias</p>
      <form onSubmit={handleSubmit} >
        <label>
          <span>Nome:</span>
          <input 
          type="text" 
          name='displayName'
          required
          placeholder='Nome do usuário' 
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}/>
        </label>
        <label>
          <span>Nome:</span>
          <input 
          type="email" 
          name='email'
          required
          placeholder='E-mail do usuário' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <span>Senha:</span>
          <input 
          type="password" 
          name='password'
          required
          placeholder='Insira sua senha' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <label>
          <span>Confirme sua senha:</span>
          <input 
          type="password" 
          name='conrfirmPassword'
          required
          placeholder='Confirme a sua senha' 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}/>
        </label>
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Regiser