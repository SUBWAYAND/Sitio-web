"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

export type UserRole = "patient" | "doctor"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  document?: string
  phone?: string
  specialty?: string
  licenseNumber?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users
const DEMO_USERS: { [key: string]: { password: string; user: User } } = {
  "paciente@mediapp.com": {
    password: "123456",
    user: {
      id: "p1",
      name: "Juan Pérez",
      email: "paciente@mediapp.com",
      role: "patient",
      document: "123456789",
      phone: "+34 666 777 888",
    },
  },
  "medico@mediapp.com": {
    password: "123456",
    user: {
      id: "d1",
      name: "Dra. María García",
      email: "medico@mediapp.com",
      role: "doctor",
      specialty: "Medicina General",
      licenseNumber: "LIC-2024-001",
      phone: "+34 912 345 678",
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const demoUser = DEMO_USERS[email]
      if (!demoUser || demoUser.password !== password) {
        throw new Error("Credenciales inválidas")
      }

      setUser(demoUser.user)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
