'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useData } from '@/lib/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function EditProfileTab() {
  const { user } = useAuth()
  const { doctorProfiles, updateDoctorProfile } = useData()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    licenseNumber: '',
    phone: '',
    bio: '',
    consultationFee: '',
  })

  const profile = doctorProfiles.find(d => d.id === user?.id)

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        specialty: profile.specialty,
        licenseNumber: profile.licenseNumber,
        phone: profile.phone,
        bio: profile.bio || '',
        consultationFee: String(profile.consultationFee || ''),
      })
    }
  }, [profile])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user?.id) {
      updateDoctorProfile(user.id, {
        name: formData.name,
        email: formData.email,
        specialty: formData.specialty,
        licenseNumber: formData.licenseNumber,
        phone: formData.phone,
        bio: formData.bio,
        consultationFee: parseFloat(formData.consultationFee) || 0,
      })
      alert('Perfil actualizado exitosamente')
    }
  }

  if (!profile) {
    return <p className="text-gray-600">Perfil no encontrado</p>
  }

  return (
    <div>
      <Card className="bg-white border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle>Actualizar Perfil Profesional</CardTitle>
          <CardDescription className="text-green-100">Modifica tu información profesional</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Especialidad</label>
                <Input
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Número de Licencia</label>
                <Input
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Costo de Consulta ($)</label>
                <Input
                  type="number"
                  value={formData.consultationFee}
                  onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">Biografía Profesional</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Cuéntanos sobre tu experiencia y especialización..."
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
