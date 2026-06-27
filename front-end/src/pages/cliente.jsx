import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = () => {
  const navigate = useNavigate()
  function fazerLogout(){
  
    navigate('/login')

  }
  return (
    <>
    <h1>Página do cliente</h1>
    <button onClick={fazerLogout}>Sair</button>
    </>
    
  )
}

export default Cliente