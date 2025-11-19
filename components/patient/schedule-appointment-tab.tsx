"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import StatsBar from "./stats-bar"

export default function ScheduleAppointmentTab() {
  const { user } = useAuth()
  const { addAppointment, doctorProfiles } = useData()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    time: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.doctorId || !formData.date || !formData.time) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    const selectedDoctor = doctorProfiles.find((d) => d.id === formData.doctorId)
    const newAppointment = {
      id: `apt-${Date.now()}`,
      patientId: user?.id || "",
      patientName: user?.name || "",
      doctorId: formData.doctorId,
      doctorName: selectedDoctor?.name || "",
      date: formData.date,
      time: formData.time,
      specialty: selectedDoctor?.specialty,
      status: "scheduled" as const,
      notes: formData.notes,
    }

    addAppointment(newAppointment)
    setFormData({ doctorId: "", date: "", time: "", notes: "" })
    setIsOpen(false)
    alert("Cita agendada exitosamente")
  }

  return (
    <div>
      <StatsBar />

      <Card className="bg-white border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle>Agendar Nueva Cita</CardTitle>
          <CardDescription className="text-blue-100">Selecciona un médico y un horario disponible</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Agendar Cita</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agendar Nueva Cita</DialogTitle>
                <DialogDescription>Completa el formulario para agendar tu cita médica</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Médico</label>
                  <Select value={formData.doctorId} onValueChange={(val) => handleInputChange("doctorId", val)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona un médico" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctorProfiles.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Fecha</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Hora</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Notas (opcional)</label>
                  <Textarea
                    placeholder="Agrega notas adicionales sobre tu cita..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Confirmar Cita
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Médicos Disponibles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctorProfiles.map((doctor) => (
                <Card key={doctor.id} className="border-gray-200">
                  <CardContent className="pt-6">
                    <p className="font-semibold text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500 mt-2">Costo: ${doctor.consultationFee}</p>
                    <p className="text-xs text-gray-500">Lic: {doctor.licenseNumber}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
