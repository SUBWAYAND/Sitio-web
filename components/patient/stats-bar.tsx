"use client"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Card } from "@/components/ui/card"

export default function StatsBar() {
  const { user } = useAuth()
  const { appointments, medicalHistories } = useData()

  const userAppointments = appointments.filter((apt) => apt.patientId === user?.id)
  const totalAppointments = userAppointments.length
  const scheduledAppointments = userAppointments.filter((apt) => apt.status === "scheduled").length
  const cancelledAppointments = userAppointments.filter((apt) => apt.status === "cancelled").length
  const medicalRecords = medicalHistories.filter((mh) => mh.patientId === user?.id).length

  const stats = [
    { label: "Citas Totales", value: totalAppointments, color: "bg-blue-100 text-blue-900" },
    { label: "Citas Agendadas", value: scheduledAppointments, color: "bg-green-100 text-green-900" },
    { label: "Citas Canceladas", value: cancelledAppointments, color: "bg-red-100 text-red-900" },
    { label: "Historiales Médicos", value: medicalRecords, color: "bg-purple-100 text-purple-900" },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`p-4 ${stat.color}`}>
          <p className="text-sm font-medium opacity-75">{stat.label}</p>
          <p className="text-3xl font-bold">{stat.value}</p>
        </Card>
      ))}
    </div>
  )
}
