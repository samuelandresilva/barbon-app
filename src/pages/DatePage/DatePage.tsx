import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateCalendar } from '../../components/calendar'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import { getDadosEmpresa } from '../../services/googleSheetsService'
import type { DadosEmpresa } from '../../types'

export function DatePage() {
  const navigate = useNavigate()
  const {
    profissionalSelecionado,
    data,
    servicoSelecionado,
    setData,
    setHorario,
  } = useBooking()
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

  function handleDateSelect(selectedDate: string) {
    setData(selectedDate)
    setHorario('')
  }

  if (!servicoSelecionado || !profissionalSelecionado) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-muted)]">
              Selecione serviço e profissional antes de escolher a data.
            </p>
            <button
              type="button"
              className="mt-4 min-h-11 rounded bg-[var(--color-primary)] px-4 text-sm font-semibold text-[var(--color-on-primary)]"
              onClick={() => navigate('/servicos')}
            >
              Voltar ao início do fluxo
            </button>
          </div>
        </main>
      </div>
    )
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
    <AppLayout dadosEmpresa={empresa} currentStep="data">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">
            Escolha a data
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Selecione uma data para continuar.
          </p>
        </div>

        <DateCalendar selectedDate={data} onSelectDate={handleDateSelect} />

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-border-hover)]"
            onClick={() => navigate('/profissionais')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded-md bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--color-on-primary)] shadow-lg shadow-[color:var(--color-shadow)] transition enabled:hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-secondary)] disabled:text-[var(--color-subtle)] disabled:shadow-none"
            disabled={!data}
            onClick={() => navigate('/horarios')}
          >
            Continuar
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
