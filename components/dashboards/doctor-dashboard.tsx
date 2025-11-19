"use client"
import { useAuth } from "@/lib/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import DashboardAnalyticsTab from "@/components/doctor/dashboard-analytics-tab"
import MyAppointmentsTab from "@/components/doctor/my-appointments-tab"
import MedicalHistoryManagementTab from "@/components/doctor/medical-history-management-tab"
import ProfileTab from "@/components/doctor/profile-tab"
import EditProfileTab from "@/components/doctor/edit-profile-tab"

export default function DoctorDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-900">MediApp - Médico</h1>
            <p className="text-sm text-gray-600">Bienvenido, {user?.name}</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
          >
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-green-200 rounded-lg p-1">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="my-appointments"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
            >
              Mis Citas
            </TabsTrigger>
            <TabsTrigger
              value="medical-history"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
            >
              Historial Médico
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
            >
              Perfil
            </TabsTrigger>
            <TabsTrigger
              value="edit-profile"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-900"
            >
              Actualizar Perfil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <DashboardAnalyticsTab />
          </TabsContent>

          <TabsContent value="my-appointments" className="mt-6">
            <MyAppointmentsTab />
          </TabsContent>

          <TabsContent value="medical-history" className="mt-6">
            <MedicalHistoryManagementTab />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="edit-profile" className="mt-6">
            <EditProfileTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
