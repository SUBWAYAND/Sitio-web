"use client"

import { useAuth } from "@/lib/auth-context"
import LoginPage from "@/components/login-page"
import PatientDashboard from "@/components/dashboards/patient-dashboard"
import DoctorDashboard from "@/components/dashboards/doctor-dashboard"
import { AuthProvider } from "@/lib/auth-context"
import { DataProvider as DataProviderComponent } from "@/lib/data-context"

function AppContent() {
  const { user } = useAuth()

  if (!user) {
    return <LoginPage />
  }

  if (user.role === "patient") {
    return <PatientDashboard />
  }

  return <DoctorDashboard />
}

export default function RootPage() {
  return (
    <AuthProvider>
      <DataProviderComponent>
        <AppContent />
      </DataProviderComponent>
    </AuthProvider>
  )
}
