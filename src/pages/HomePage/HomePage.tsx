import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
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
          <div className="rounded-md border border-red-900/60 bg-red-950/30 p-4">
            <p className="text-sm text-red-100">
              {errorMessage ||
                'Nao foi possivel carregar as informacoes da barbearia.'}
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
      <div className="flex min-h-72 flex-col justify-center gap-5">
        <div>
          <p className="text-sm font-semibold uppercase text-amber-400">
            Agendamento
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-50">
            Escolha seu horario com praticidade.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-300">
            Consulte servicos, barbeiros e horarios disponiveis antes de enviar
            sua solicitacao para a barbearia.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="min-h-12 rounded bg-amber-400 px-5 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
            onClick={() => navigate('/servicos')}
          >
            Agendar Horario
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
