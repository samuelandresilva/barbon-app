import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import { getDadosEmpresa } from '../../services/googleSheetsService'
import type { DadosEmpresa } from '../../types'

export function WhatsAppRedirectPage() {
  const navigate = useNavigate()
  const { resetBooking } = useBooking()
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

  function handleBackHome() {
    resetBooking()
    navigate('/')
  }

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
          <p className="rounded-md border border-[var(--color-error-border)] bg-[var(--color-error-background)] p-4 text-sm text-[var(--color-error-text)]">
            {errorMessage ||
              'Não foi possível carregar as informações do estabelecimento.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout dadosEmpresa={empresa}>
      <div className="flex min-h-72 flex-col justify-center gap-5">
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-5">
          <p className="text-sm font-bold uppercase text-[var(--color-primary-hover)]">
            Solicitação enviada
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[var(--color-text)]">
            Você foi redirecionado para o WhatsApp.
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            Sua solicitação foi preparada para envio. A confirmação do
            agendamento será feita manualmente pela equipe {empresa?.nome}.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="min-h-12 rounded-md bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--color-on-primary)] shadow-lg shadow-[color:var(--color-shadow)] transition hover:bg-[var(--color-primary-hover)]"
            onClick={handleBackHome}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
