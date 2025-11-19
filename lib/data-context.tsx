"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  specialty?: string
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  notes?: string
}

export interface MedicalHistory {
  id: string
  patientId: string
  patientName: string
  diagnosis: string
  treatment: string
  notes: string
  date: string
  doctorId: string
  doctorName: string
}

export interface PatientProfile {
  id: string
  name: string
  email: string
  document: string
  phone: string
  birthDate?: string
  bloodType?: string
  emergencyContact?: string
}

export interface DoctorProfile {
  id: string
  name: string
  email: string
  specialty: string
  licenseNumber: string
  phone: string
  bio?: string
  consultationFee?: number
}

interface DataContextType {
  appointments: Appointment[]
  medicalHistories: MedicalHistory[]
  patientProfiles: PatientProfile[]
  doctorProfiles: DoctorProfile[]
  addAppointment: (appointment: Appointment) => void
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void
  cancelAppointment: (id: string) => void
  addMedicalHistory: (history: MedicalHistory) => void
  updateMedicalHistory: (id: string, history: Partial<MedicalHistory>) => void
  deleteMedicalHistory: (id: string) => void
  updatePatientProfile: (id: string, profile: Partial<PatientProfile>) => void
  updateDoctorProfile: (id: string, profile: Partial<DoctorProfile>) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Initial demo data
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt1",
    patientId: "p1",
    patientName: "Juan Pérez",
    doctorId: "d1",
    doctorName: "Dra. María García",
    date: "2024-12-20",
    time: "10:00",
    specialty: "Medicina General",
    status: "scheduled",
    notes: "Revisión de hipertensión",
  },
  {
    id: "apt2",
    patientId: "p1",
    patientName: "Juan Pérez",
    doctorId: "d1",
    doctorName: "Dra. María García",
    date: "2024-12-15",
    time: "14:30",
    specialty: "Medicina General",
    status: "completed",
    notes: "Consulta general",
  },
]

const INITIAL_MEDICAL_HISTORIES: MedicalHistory[] = [
  {
    id: "mh1",
    patientId: "p1",
    patientName: "Juan Pérez",
    diagnosis: "Hipertensión",
    treatment: "Lisinopril 10mg diarios",
    notes: "Paciente estable, seguimiento en 3 meses",
    date: "2024-12-15",
    doctorId: "d1",
    doctorName: "Dra. María García",
  },
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS)
  const [medicalHistories, setMedicalHistories] = useState<MedicalHistory[]>(INITIAL_MEDICAL_HISTORIES)
  const [patientProfiles, setPatientProfiles] = useState<PatientProfile[]>([
    {
      id: "p1",
      name: "Juan Pérez",
      email: "paciente@mediapp.com",
      document: "123456789",
      phone: "+34 666 777 888",
      birthDate: "1990-05-15",
      bloodType: "O+",
      emergencyContact: "+34 666 777 889",
    },
  ])
  const [doctorProfiles, setDoctorProfiles] = useState<DoctorProfile[]>([
    {
      id: "d1",
      name: "Dra. María García",
      email: "medico@mediapp.com",
      specialty: "Medicina General",
      licenseNumber: "LIC-2024-001",
      phone: "+34 912 345 678",
      bio: "Especialista en medicina general con 15 años de experiencia",
      consultationFee: 50,
    },
  ])

  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment])
  }

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)))
  }

  const cancelAppointment = (id: string) => {
    updateAppointment(id, { status: "cancelled" })
  }

  const addMedicalHistory = (history: MedicalHistory) => {
    setMedicalHistories([...medicalHistories, history])
  }

  const updateMedicalHistory = (id: string, updates: Partial<MedicalHistory>) => {
    setMedicalHistories(medicalHistories.map((mh) => (mh.id === id ? { ...mh, ...updates } : mh)))
  }

  const deleteMedicalHistory = (id: string) => {
    setMedicalHistories(medicalHistories.filter((mh) => mh.id !== id))
  }

  const updatePatientProfile = (id: string, updates: Partial<PatientProfile>) => {
    setPatientProfiles(patientProfiles.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const updateDoctorProfile = (id: string, updates: Partial<DoctorProfile>) => {
    setDoctorProfiles(doctorProfiles.map((d) => (d.id === id ? { ...d, ...updates } : d)))
  }

  return (
    <DataContext.Provider
      value={{
        appointments,
        medicalHistories,
        patientProfiles,
        doctorProfiles,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        addMedicalHistory,
        updateMedicalHistory,
        deleteMedicalHistory,
        updatePatientProfile,
        updateDoctorProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within DataProvider")
  }
  return context
}
