"use client"

import React from "react"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MyAppointmentsTab() {
  const { user } = useAuth()
  const { appointments, updateAppointment } = useData()
  const [selectedStatus, setSelectedStatus] = React.useState("all")

  const doctorAppointments = appointments.filter((apt) => apt.doctorId === user?.id)

  const filteredAppointments =
    selectedStatus === "all" ? doctorAppointments : doctorAppointments.filter((apt) => apt.status === selectedStatus)

  const statusColors: { [key: string]: string } = {
    scheduled: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    rescheduled: "bg-yellow-100 text-yellow-800",
  }

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    updateAppointment(appointmentId, { status: newStatus as any })
    alert("Estado de cita actualizado")
  }

  return (
    <div>
      <Card className="bg-white border-green-200 mb-6">
        <CardHeader>
          <CardTitle>Filtrar por Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las citas</SelectItem>
              <SelectItem value="scheduled">Agendadas</SelectItem>
              <SelectItem value="completed">Completadas</SelectItem>
              <SelectItem value="cancelled">Canceladas</SelectItem>
              <SelectItem value="rescheduled">Reprogramadas</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="bg-white border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle>Mis Citas Médicas</CardTitle>
          <CardDescription className="text-green-100">Total: {filteredAppointments.length} citas</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredAppointments.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No hay citas para este filtro</p>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">Paciente</p>
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

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="mt-3 w-full bg-green-600 hover:bg-green-700">
                              Cambiar Estado
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cambiar Estado de Cita</DialogTitle>
                              <DialogDescription>Paciente: {appointment.patientName}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Select
                                value={appointment.status}
                                onValueChange={(val) => handleStatusChange(appointment.id, val)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="scheduled">Agendada</SelectItem>
                                  <SelectItem value="completed">Completada</SelectItem>
                                  <SelectItem value="cancelled">Cancelada</SelectItem>
                                  <SelectItem value="rescheduled">Reprogramada</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </DialogContent>
                        </Dialog>
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
