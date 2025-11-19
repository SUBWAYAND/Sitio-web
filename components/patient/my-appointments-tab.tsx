"use client"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import StatsBar from "./stats-bar"

export default function MyAppointmentsTab() {
  const { user } = useAuth()
  const { appointments, cancelAppointment } = useData()

  const userAppointments = appointments.filter((apt) => apt.patientId === user?.id)

  const statusColors: { [key: string]: string } = {
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    rescheduled: "bg-yellow-100 text-yellow-800",
  }

  const handleCancel = (id: string) => {
    if (confirm("¿Deseas cancelar esta cita?")) {
      cancelAppointment(id)
      alert("Cita cancelada exitosamente")
    }
  }

  return (
    <div>
      <StatsBar />

      <Card className="bg-white border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle>Mis Citas Médicas</CardTitle>
          <CardDescription className="text-blue-100">Total: {userAppointments.length} citas</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {userAppointments.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No tienes citas agendadas aún</p>
          ) : (
            <div className="space-y-4">
              {userAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                          <p>Fecha: {new Date(appointment.date).toLocaleDateString("es-ES")}</p>
                          <p>Hora: {appointment.time}</p>
                          {appointment.notes && <p>Notas: {appointment.notes}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={statusColors[appointment.status]}>
                          {appointment.status === "scheduled" && "Agendada"}
                          {appointment.status === "completed" && "Completada"}
                          {appointment.status === "cancelled" && "Cancelada"}
                          {appointment.status === "rescheduled" && "Reprogramada"}
                        </Badge>
                        {appointment.status === "scheduled" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancel(appointment.id)}
                            className="mt-3 w-full"
                          >
                            Cancelar
                          </Button>
                        )}
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
