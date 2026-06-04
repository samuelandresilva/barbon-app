import { Route, Routes } from 'react-router-dom'
import { BarberPage } from '../pages/BarberPage'
import { DatePage } from '../pages/DatePage'
import { HomePage } from '../pages/HomePage'
import { ServicePage } from '../pages/ServicePage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicos" element={<ServicePage />} />
      <Route path="/barbeiros" element={<BarberPage />} />
      <Route path="/data" element={<DatePage />} />
    </Routes>
  )
}
