import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import { getBarbearia } from '../../services/googleSheetsService'
import type { Barbearia } from '../../types'

export function WhatsAppRedirectPage() {
  const navigate = useNavigate()
  const { resetBooking } = useBooking()
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadBarbearia() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const loadedBarbearia = await getBarbearia()

        if (isMounted) {
          setBarbearia(loadedBarbearia)
        }
      } catch {
        if (isMounted) {
          setErrorMessage(
            'Nao foi possivel carregar as informacoes da barbearia.',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadBarbearia()

    return () => {
      isMounted = false
    }
  }, [])

  function handleBackHome() {
    resetBooking()
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-stone-800 bg-stone-900 p-4 text-sm text-stone-300">
            Carregando informacoes...
          </p>
        </main>
      </div>
    )
  }

  if (errorMessage || !barbearia) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-100">
            {errorMessage ||
              'Nao foi possivel carregar as informacoes da barbearia.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout barbearia={barbearia}>
      <div className="flex min-h-72 flex-col justify-center gap-5">
        <div className="rounded-md border border-amber-400/40 bg-amber-400/10 p-5">
          <p className="text-sm font-bold uppercase text-amber-300">
            Solicitacao enviada
          </p>
          <h1 className="mt-2 text-2xl font-bold text-stone-50">
            Voce foi redirecionado para o WhatsApp.
          </h1>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            Sua solicitacao foi preparada para envio. A confirmacao do
            agendamento sera feita manualmente pela equipe da barbearia.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="min-h-12 rounded-md bg-amber-400 px-5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300"
            onClick={handleBackHome}
          >
            Voltar ao inicio
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
