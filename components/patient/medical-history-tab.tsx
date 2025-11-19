"use client"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MedicalHistoryTab() {
  const { user } = useAuth()
  const { medicalHistories } = useData()

  const userHistories = medicalHistories.filter((mh) => mh.patientId === user?.id)

  return (
    <div>
      <Card className="bg-white border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle>Mi Historial Médico</CardTitle>
          <CardDescription className="text-blue-100">Total: {userHistories.length} registros</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {userHistories.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No hay historiales médicos registrados</p>
          ) : (
            <div className="space-y-4">
              {userHistories.map((history) => (
                <Card key={history.id} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Diagnóstico</p>
                        <p className="text-gray-900 font-medium">{history.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Médico</p>
                        <p className="text-gray-900">{history.doctorName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Tratamiento</p>
                        <p className="text-gray-900">{history.treatment}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Fecha</p>
                        <p className="text-gray-900">{new Date(history.date).toLocaleDateString("es-ES")}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Notas</p>
                        <p className="text-gray-900">{history.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
