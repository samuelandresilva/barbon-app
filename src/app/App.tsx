import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { BookingProvider } from '../contexts'
import { AppRoutes } from '../routes/AppRoutes'
import { getTemaCores } from '../services/googleSheetsService'
import { applyTemaCores } from '../services/themeService'

function App() {
  const [isThemeReady, setIsThemeReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadTheme() {
      const temaCores = await getTemaCores()
      applyTemaCores(temaCores)

      if (isMounted) {
        setIsThemeReady(true)
      }
    }

    void loadTheme()

    return () => {
      isMounted = false
    }
  }, [])

  if (!isThemeReady) {
    return (
      <div className="grid min-h-dvh place-items-center bg-[#0c0a09] px-5 text-stone-100">
        <div className="grid justify-items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-2 border-stone-700 border-t-amber-400" />
          <p className="text-sm font-semibold text-stone-300">
            Carregando experiência...
          </p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <BookingProvider>
        <AppRoutes />
      </BookingProvider>
    </BrowserRouter>
  )
}

export default App
