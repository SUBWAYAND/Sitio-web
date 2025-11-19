"use client"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function DashboardAnalyticsTab() {
  const { user } = useAuth()
  const { appointments } = useData()

  // Filter doctor's appointments
  const doctorAppointments = appointments.filter((apt) => apt.doctorId === user?.id)

  // Today's stats
  const today = new Date().toISOString().split("T")[0]
  const todayAppointments = doctorAppointments.filter((apt) => apt.date === today)
  const todayPending = todayAppointments.filter((apt) => apt.status === "scheduled").length
  const todayCompleted = todayAppointments.filter((apt) => apt.status === "completed").length
  const todayCancelled = todayAppointments.filter((apt) => apt.status === "cancelled").length

  // This month stats
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const thisMonthAppointments = doctorAppointments.filter((apt) => {
    const aptDate = new Date(apt.date)
    return aptDate.getMonth() + 1 === currentMonth && aptDate.getFullYear() === currentYear
  })

  const monthlyStats = {
    total: thisMonthAppointments.length,
    scheduled: thisMonthAppointments.filter((apt) => apt.status === "scheduled").length,
    completed: thisMonthAppointments.filter((apt) => apt.status === "completed").length,
    cancelled: thisMonthAppointments.filter((apt) => apt.status === "cancelled").length,
    rescheduled: thisMonthAppointments.filter((apt) => apt.status === "rescheduled").length,
  }

  // Calculate percentages
  const completionPercentage =
    monthlyStats.total > 0 ? Math.round((monthlyStats.completed / monthlyStats.total) * 100) : 0
  const cancellationPercentage =
    monthlyStats.total > 0 ? Math.round((monthlyStats.cancelled / monthlyStats.total) * 100) : 0

  // Daily chart data (last 7 days)
  const dailyData = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]
    const dayAppointments = doctorAppointments.filter((apt) => apt.date === dateStr)

    dailyData.push({
      date: date.toLocaleDateString("es-ES", { month: "short", day: "numeric" }),
      pendientes: dayAppointments.filter((apt) => apt.status === "scheduled").length,
      completadas: dayAppointments.filter((apt) => apt.status === "completed").length,
      canceladas: dayAppointments.filter((apt) => apt.status === "cancelled").length,
    })
  }

  return (
    <div className="space-y-6">
      {/* Today's Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-blue-900">Citas Totales Hoy</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">{todayAppointments.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-yellow-900">Pendientes Hoy</p>
            <p className="text-3xl font-bold text-yellow-900 mt-2">{todayPending}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-green-900">Completadas Hoy</p>
            <p className="text-3xl font-bold text-green-900 mt-2">{todayCompleted}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-100 to-red-50 border-red-200">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-red-900">Canceladas Hoy</p>
            <p className="text-3xl font-bold text-red-900 mt-2">{todayCancelled}</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Appointments Chart */}
      <Card className="bg-white border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle>Citas por Día (Últimos 7 días)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pendientes" fill="#fbbf24" name="Pendientes" />
              <Bar dataKey="completadas" fill="#10b981" name="Completadas" />
              <Bar dataKey="canceladas" fill="#ef4444" name="Canceladas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-lg">Resumen del Mes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Citas Totales</span>
              <span className="text-2xl font-bold text-blue-600">{monthlyStats.total}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Agendadas</span>
              <span className="text-2xl font-bold text-yellow-600">{monthlyStats.scheduled}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Completadas</span>
              <span className="text-2xl font-bold text-green-600">{monthlyStats.completed}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-lg">Más Estadísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Canceladas</span>
              <span className="text-2xl font-bold text-red-600">{monthlyStats.cancelled}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">Reprogramadas</span>
              <span className="text-2xl font-bold text-purple-600">{monthlyStats.rescheduled}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-green-200">
          <CardHeader>
            <CardTitle className="text-lg">Porcentajes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 rounded border border-green-200">
              <p className="text-sm font-medium text-gray-700">Tasa de Completación</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{completionPercentage}%</p>
            </div>
            <div className="p-3 bg-red-50 rounded border border-red-200">
              <p className="text-sm font-medium text-gray-700">Tasa de Cancelación</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{cancellationPercentage}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
