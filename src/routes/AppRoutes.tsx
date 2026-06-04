import { Route, Routes } from 'react-router-dom'
import { BarberPage } from '../pages/BarberPage'
import { HomePage } from '../pages/HomePage'
import { ServicePage } from '../pages/ServicePage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicos" element={<ServicePage />} />
      <Route path="/barbeiros" element={<BarberPage />} />
    </Routes>
  )
}
