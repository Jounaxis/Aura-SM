import React, { useState } from 'react'
import { useAutenticacao } from '../../context/AutenticacaoContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  
  const { login } = useAutenticacao()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro('')
    
    const sucesso = await login(email, senha)
    
    if (sucesso) {
      onClose()
    } else {
      setErro('E-mail ou senha inválidos')
    }
    
    setCarregando(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:max-w-md mx-auto shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Acessar Portal</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 text-2xl hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {erro && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {erro}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu e-mail"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sua senha"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
          
          <div className="mt-4 text-center text-gray-600">
            <p>Não tem uma conta? <a href="#cadastro" className="text-blue-600 hover:underline">Solicitar acesso</a></p>
            <p className="mt-1"><a href="#esqueci-senha" className="text-blue-600 hover:underline">Esqueci minha senha</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginModal