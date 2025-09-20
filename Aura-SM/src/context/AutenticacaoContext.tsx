// src/context/AutenticacaoContext.tsx
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface Usuario {
  id: string
  nome: string
  email: string
  avatar: string
}

interface AuthContextType {
  usuario: Usuario | null
  login: (email: string, senha: string) => Promise<boolean>
  logout: () => void
  estaAutenticado: boolean
}

const AutenticacaoContext = createContext<AuthContextType | undefined>(undefined)

export const useAutenticacao = () => {
  const context = useContext(AutenticacaoContext)
  if (context === undefined) {
    throw new Error('useAutenticacao deve ser usado dentro de um AutenticacaoProvider')
  }
  return context
}

interface AutenticacaoProviderProps {
  children: ReactNode
}

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const login = async (email: string, senha: string): Promise<boolean> => {
    // Simulação de chamada à API
    try {
      // Em uma aplicação real, isso seria uma chamada à API
      if (email && senha) {
        const usuarioMock: Usuario = {
          id: '1',
          nome: email.split('@')[0],
          email: email,
          avatar: email.charAt(0).toUpperCase()
        }
        setUsuario(usuarioMock)
        return true
      }
      return false
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  }

  const logout = () => {
    setUsuario(null)
  }

  const value = {
    usuario,
    login,
    logout,
    estaAutenticado: !!usuario
  }

  return (
    <AutenticacaoContext.Provider value={value}>
      {children}
    </AutenticacaoContext.Provider>
  )
}