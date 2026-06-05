import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderApp } from '../../components/layout'
import { getBarbearia } from '../../services/googleSheetsService'
import type { Barbearia } from '../../types'

export function HomePage() {
  const navigate = useNavigate()
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
            'Não foi possível carregar as informações do estabelecimento.',
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

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderApp />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-stone-800 bg-stone-900 p-4 text-sm text-stone-300">
            Carregando informações...
          </p>
        </main>
      </div>
    )
  }

  if (errorMessage || !barbearia) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderApp />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-red-900/60 bg-red-950/30 p-4">
            <p className="text-sm text-red-100">
              {errorMessage ||
                'Não foi possível carregar as informações do estabelecimento.'}
            </p>
            <button
              type="button"
              className="mt-4 min-h-11 rounded bg-amber-400 px-4 text-sm font-semibold text-stone-950"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <AppLayout barbearia={barbearia}>
      <div className="flex min-h-72 flex-col justify-center gap-6">
        <div>
          <p className="text-sm font-bold uppercase text-amber-400">
            Agendamento
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold text-stone-50 sm:text-4xl">
            Escolha seu horário com praticidade.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-300">
            Consulte serviços, profissionais e horários disponíveis antes de enviar
            sua solicitação para o estabelecimento.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="min-h-12 rounded-md bg-amber-400 px-5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300"
            onClick={() => navigate('/servicos')}
          >
            Agendar Horário
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
