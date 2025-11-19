"use client"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfileTab() {
  const { user } = useAuth()
  const { doctorProfiles } = useData()

  const profile = doctorProfiles.find((d) => d.id === user?.id)

  if (!profile) {
    return <p className="text-gray-600">Perfil no encontrado</p>
  }

  return (
    <div>
      <Card className="bg-white border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle>Mi Perfil Profesional</CardTitle>
          <CardDescription className="text-green-100">Información de tu cuenta médica</CardDescription>
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
              <p className="text-xs font-semibold text-gray-500 uppercase">Especialidad</p>
              <p className="text-gray-900 mt-1">{profile.specialty}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Número de Licencia</p>
              <p className="text-gray-900 mt-1">{profile.licenseNumber}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Teléfono</p>
              <p className="text-gray-900 mt-1">{profile.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Costo de Consulta</p>
              <p className="text-gray-900 mt-1">${profile.consultationFee}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Biografía Profesional</p>
              <p className="text-gray-900 mt-1">{profile.bio || "No registrada"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
