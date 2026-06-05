import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { BookingProvider } from '../contexts'
import { AppRoutes } from '../routes/AppRoutes'
import { getTemaCores } from '../services/googleSheetsService'
import { applyTemaCores } from '../services/themeService'

function App() {
  useEffect(() => {
    void getTemaCores().then(applyTemaCores)
  }, [])

  return (
    <BrowserRouter>
      <BookingProvider>
        <AppRoutes />
      </BookingProvider>
    </BrowserRouter>
  )
}

export default App
