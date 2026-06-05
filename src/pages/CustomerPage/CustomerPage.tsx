import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import { getDadosEmpresa } from '../../services/googleSheetsService'
import type { DadosEmpresa } from '../../types'

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : ''
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function isValidPhone(value: string) {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(value)
}

export function CustomerPage() {
  const navigate = useNavigate()
  const {
    profissionalSelecionado,
    data,
    horario,
    nomeCliente,
    servicoSelecionado,
    setNomeCliente,
    setTelefoneCliente,
    telefoneCliente,
  } = useBooking()
  const [empresa, setDadosEmpresa] = useState<DadosEmpresa | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const isNameValid = useMemo(
    () => nomeCliente.trim().length >= 3,
    [nomeCliente],
  )
  const isPhoneValid = useMemo(
    () => isValidPhone(telefoneCliente),
    [telefoneCliente],
  )
  const isFormValid = isNameValid && isPhoneValid

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

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setNomeCliente(event.target.value)
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setTelefoneCliente(formatPhone(event.target.value))
  }

  if (!servicoSelecionado || !profissionalSelecionado || !data || !horario) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-muted)]">
              Complete as etapas anteriores antes de informar seus dados.
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
    <AppLayout dadosEmpresa={empresa} currentStep="dados">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">
            Informe seus dados
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Usaremos essas informações para confirmar a solicitação.
          </p>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[var(--color-muted)]">Nome</span>
            <input
              type="text"
              className="min-h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-text)] outline-none shadow-inner shadow-[color:var(--color-shadow)] transition focus:border-[var(--color-primary)]"
              value={nomeCliente}
              onChange={handleNameChange}
              placeholder="Seu nome"
            />
            {!isNameValid && nomeCliente.length > 0 ? (
              <span className="text-xs text-[var(--color-accent)]">
                Informe pelo menos 3 caracteres.
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-[var(--color-muted)]">
              Telefone
            </span>
            <input
              type="tel"
              inputMode="numeric"
              className="min-h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-text)] outline-none shadow-inner shadow-[color:var(--color-shadow)] transition focus:border-[var(--color-primary)]"
              value={telefoneCliente}
              onChange={handlePhoneChange}
              placeholder="(11) 99999-9999"
            />
            {!isPhoneValid && telefoneCliente.length > 0 ? (
              <span className="text-xs text-[var(--color-accent)]">
                Use o formato (11) 99999-9999.
              </span>
            ) : null}
          </label>
        </div>

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-border-hover)]"
            onClick={() => navigate('/horarios')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded-md bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--color-on-primary)] shadow-lg shadow-[color:var(--color-shadow)] transition enabled:hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-secondary)] disabled:text-[var(--color-subtle)] disabled:shadow-none"
            disabled={!isFormValid}
            onClick={() => navigate('/revisao')}
          >
            Continuar
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
