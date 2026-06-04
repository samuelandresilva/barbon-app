import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { ServicePage } from '../pages/ServicePage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicos" element={<ServicePage />} />
    </Routes>
  )
}
