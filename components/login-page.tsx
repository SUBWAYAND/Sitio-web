"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    }
  }

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("123456")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">MediApp</h1>
          <p className="text-gray-600">Plataforma de Gestión Médica</p>
        </div>

        <Card className="shadow-lg border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription className="text-blue-100">Accede a tu cuenta MediApp</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Contraseña</label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="mt-1"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
                {isLoading ? "Cargando..." : "Ingresar"}
              </Button>
            </form>

            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Usuarios Demo:</p>
              <Tabs defaultValue="patient" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                  <TabsTrigger value="patient">Paciente</TabsTrigger>
                  <TabsTrigger value="doctor">Médico</TabsTrigger>
                </TabsList>
                <TabsContent value="patient" className="space-y-3 mt-3">
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs font-medium text-gray-700">Email:</p>
                    <p className="text-sm font-mono text-blue-700">paciente@mediapp.com</p>
                    <p className="text-xs font-medium text-gray-700 mt-2">Contraseña:</p>
                    <p className="text-sm font-mono text-blue-700">123456</p>
                    <Button
                      type="button"
                      onClick={() => handleDemoLogin("paciente@mediapp.com")}
                      className="w-full mt-3 bg-blue-500 hover:bg-blue-600"
                      size="sm"
                    >
                      Usar este usuario
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="doctor" className="space-y-3 mt-3">
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <p className="text-xs font-medium text-gray-700">Email:</p>
                    <p className="text-sm font-mono text-green-700">medico@mediapp.com</p>
                    <p className="text-xs font-medium text-gray-700 mt-2">Contraseña:</p>
                    <p className="text-sm font-mono text-green-700">123456</p>
                    <Button
                      type="button"
                      onClick={() => handleDemoLogin("medico@mediapp.com")}
                      className="w-full mt-3 bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      Usar este usuario
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
