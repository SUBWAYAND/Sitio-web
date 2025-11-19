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

export default function MedicalHistoryManagementTab() {
  const { user } = useAuth()
  const { patientProfiles, medicalHistories, addMedicalHistory, updateMedicalHistory, deleteMedicalHistory } = useData()
  const [selectedPatient, setSelectedPatient] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingId, setEditingId] = useState("")
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    notes: "",
  })

  const patientHistories = medicalHistories.filter(
    (mh) => mh.doctorId === user?.id && (selectedPatient === "" || mh.patientId === selectedPatient),
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPatient || !formData.diagnosis || !formData.treatment) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    const selectedPatientData = patientProfiles.find((p) => p.id === selectedPatient)
    const newHistory = {
      id: `mh-${Date.now()}`,
      patientId: selectedPatient,
      patientName: selectedPatientData?.name || "",
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      notes: formData.notes,
      date: new Date().toISOString().split("T")[0],
      doctorId: user?.id || "",
      doctorName: user?.name || "",
    }

    addMedicalHistory(newHistory)
    setFormData({ diagnosis: "", treatment: "", notes: "" })
    setIsCreateOpen(false)
    alert("Historial médico creado exitosamente")
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    updateMedicalHistory(editingId, {
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      notes: formData.notes,
    })
    setFormData({ diagnosis: "", treatment: "", notes: "" })
    setIsEditOpen(false)
    setEditingId("")
    alert("Historial médico actualizado exitosamente")
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Deseas eliminar este historial médico?")) {
      deleteMedicalHistory(id)
      alert("Historial médico eliminado exitosamente")
    }
  }

  const openEditDialog = (history: any) => {
    setEditingId(history.id)
    setFormData({
      diagnosis: history.diagnosis,
      treatment: history.treatment,
      notes: history.notes,
    })
    setIsEditOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Filters and Create Button */}
      <Card className="bg-white border-green-200">
        <CardHeader>
          <CardTitle>Seleccionar Paciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Paciente</label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona un paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los pacientes</SelectItem>
                {patientProfiles.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-green-600 hover:bg-green-700">Crear Nuevo Historial</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Historial Médico</DialogTitle>
                <DialogDescription>Agrega un nuevo registro médico para el paciente</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Paciente</label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los pacientes</SelectItem>
                      {patientProfiles.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Diagnóstico *</label>
                  <Input
                    value={formData.diagnosis}
                    onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                    placeholder="Ej: Hipertensión"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Tratamiento *</label>
                  <Textarea
                    value={formData.treatment}
                    onChange={(e) => handleInputChange("treatment", e.target.value)}
                    placeholder="Descripción del tratamiento..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Notas</label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Notas adicionales..."
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Crear Historial
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Medical Histories List */}
      <Card className="bg-white border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle>Historiales Médicos</CardTitle>
          <CardDescription className="text-green-100">Total: {patientHistories.length} registros</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {patientHistories.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No hay historiales médicos registrados</p>
          ) : (
            <div className="space-y-4">
              {patientHistories.map((history) => (
                <Card key={history.id} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Paciente</p>
                        <p className="text-gray-900 font-medium">{history.patientName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Diagnóstico</p>
                        <p className="text-gray-900">{history.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Fecha</p>
                        <p className="text-gray-900">{new Date(history.date).toLocaleDateString("es-ES")}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Tratamiento</p>
                        <p className="text-gray-900">{history.treatment}</p>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          onClick={() => openEditDialog(history)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(history.id)}>
                          Eliminar
                        </Button>
                      </div>
                    </div>
                    {history.notes && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Notas</p>
                        <p className="text-gray-900">{history.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Historial Médico</DialogTitle>
            <DialogDescription>Modifica los detalles del historial médico</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Diagnóstico *</label>
              <Input
                value={formData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Tratamiento *</label>
              <Textarea
                value={formData.treatment}
                onChange={(e) => handleInputChange("treatment", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Notas</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Guardar Cambios
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
