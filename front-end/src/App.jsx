import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Cliente from './pages/Cliente'
import Funcionario from './pages/Funcionario'
import Rota from './components/Rotas' // rotas

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cliente' element={<Cliente />} />
        <Route
          path='/funcionario'
          element={
            <Rota tipoPermitido="funcionario">
              <Funcionario />
            </Rota>
          }
        />
      </Routes>
    </>
  )
}

export default App