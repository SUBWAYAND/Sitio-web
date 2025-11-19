"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditProfileTab() {
  const { user } = useAuth()
  const { patientProfiles, updatePatientProfile } = useData()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "",
    phone: "",
    birthDate: "",
    bloodType: "",
    emergencyContact: "",
  })

  const profile = patientProfiles.find((p) => p.id === user?.id)

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        document: profile.document,
        phone: profile.phone,
        birthDate: profile.birthDate || "",
        bloodType: profile.bloodType || "",
        emergencyContact: profile.emergencyContact || "",
      })
    }
  }, [profile])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user?.id) {
      updatePatientProfile(user.id, formData)
      alert("Perfil actualizado exitosamente")
    }
  }

  if (!profile) {
    return <p className="text-gray-600">Perfil no encontrado</p>
  }

  return (
    <div>
      <Card className="bg-white border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle>Actualizar Perfil</CardTitle>
          <CardDescription className="text-blue-100">Modifica tu información personal</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Número de Documento</label>
                <Input
                  value={formData.document}
                  onChange={(e) => handleInputChange("document", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Tipo de Sangre</label>
                <Input
                  value={formData.bloodType}
                  onChange={(e) => handleInputChange("bloodType", e.target.value)}
                  className="mt-1"
                  placeholder="Ej: O+"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">Contacto de Emergencia</label>
                <Input
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
