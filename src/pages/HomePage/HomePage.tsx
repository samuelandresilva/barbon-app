import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { getDadosEmpresa } from '../../services/googleSheetsService'
import type { DadosEmpresa } from '../../types'

export function HomePage() {
  const navigate = useNavigate()
  const [empresa, setDadosEmpresa] = useState<DadosEmpresa | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadDadosEmpresa() {
      try {
        setIsLoading(true)
        setErrorMessage('')
        const loadedDadosEmpresa = await getDadosEmpresa()

        if (isMounted) {
          setDadosEmpresa(loadedDadosEmpresa)
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

    void loadDadosEmpresa()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
            Carregando informações...
          </p>
        </main>
      </div>
    )
  }

  if (errorMessage || !empresa) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-[var(--color-error-border)] bg-[var(--color-error-background)] p-4">
            <p className="text-sm text-[var(--color-error-text)]">
              {errorMessage ||
                'Não foi possível carregar as informações do estabelecimento.'}
            </p>
            <button
              type="button"
              className="mt-4 min-h-11 rounded bg-[var(--color-primary)] px-4 text-sm font-semibold text-[var(--color-on-primary)]"
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
    <AppLayout dadosEmpresa={empresa}>
      <div className="flex min-h-72 flex-col justify-center gap-6">
        <div>
          <p className="text-sm font-bold uppercase text-[var(--color-primary-hover)]">
            Agendamento
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            Escolha seu horário com praticidade.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
            Consulte serviços, profissionais e horários disponíveis antes de enviar
            sua solicitação para o estabelecimento.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="min-h-12 rounded-md bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--color-on-primary)] shadow-lg shadow-[color:var(--color-shadow)] transition hover:bg-[var(--color-primary-hover)]"
            onClick={() => navigate('/servicos')}
          >
            Agendar Horário
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
