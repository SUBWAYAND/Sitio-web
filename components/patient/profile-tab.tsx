"use client"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfileTab() {
  const { user } = useAuth()
  const { patientProfiles } = useData()

  const profile = patientProfiles.find((p) => p.id === user?.id)

  if (!profile) {
    return <p className="text-gray-600">Perfil no encontrado</p>
  }

  return (
    <div>
      <Card className="bg-white border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle>Mi Perfil</CardTitle>
          <CardDescription className="text-blue-100">Información personal</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Nombre Completo</p>
              <p className="text-gray-900 font-medium mt-1">{profile.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
              <p className="text-gray-900 mt-1">{profile.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Número de Documento</p>
              <p className="text-gray-900 mt-1">{profile.document}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Teléfono</p>
              <p className="text-gray-900 mt-1">{profile.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Fecha de Nacimiento</p>
              <p className="text-gray-900 mt-1">
                {profile.birthDate ? new Date(profile.birthDate).toLocaleDateString("es-ES") : "No registrada"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Tipo de Sangre</p>
              <p className="text-gray-900 mt-1">{profile.bloodType || "No registrado"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Contacto de Emergencia</p>
              <p className="text-gray-900 mt-1">{profile.emergencyContact || "No registrado"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
