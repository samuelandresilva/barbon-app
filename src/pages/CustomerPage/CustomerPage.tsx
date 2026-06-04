import { type ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import { getBarbearia } from '../../services/googleSheetsService'
import type { Barbearia } from '../../types'

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
    barbeiroSelecionado,
    data,
    horario,
    nomeCliente,
    servicoSelecionado,
    setNomeCliente,
    setTelefoneCliente,
    telefoneCliente,
  } = useBooking()
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
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

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setNomeCliente(event.target.value)
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setTelefoneCliente(formatPhone(event.target.value))
  }

  if (!servicoSelecionado || !barbeiroSelecionado || !data || !horario) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-stone-800 bg-stone-900 p-4">
            <p className="text-sm text-stone-300">
              Complete as etapas anteriores antes de informar seus dados.
            </p>
            <button
              type="button"
              className="mt-4 min-h-11 rounded bg-amber-400 px-4 text-sm font-semibold text-stone-950"
              onClick={() => navigate('/servicos')}
            >
              Voltar ao inicio do fluxo
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderOakbeard />
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
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-100">
            {errorMessage ||
              'Não foi possível carregar as informações do estabelecimento.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout barbearia={barbearia} currentStep="dados">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-stone-50">
            Informe seus dados
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Usaremos essas informações para confirmar a solicitação.
          </p>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-stone-200">Nome</span>
            <input
              type="text"
              className="min-h-12 rounded-md border border-stone-700 bg-stone-950/70 px-4 text-sm text-stone-50 outline-none shadow-inner shadow-black/20 transition focus:border-amber-400"
              value={nomeCliente}
              onChange={handleNameChange}
              placeholder="Seu nome"
            />
            {!isNameValid && nomeCliente.length > 0 ? (
              <span className="text-xs text-amber-200">
                Informe pelo menos 3 caracteres.
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-stone-200">
              Telefone
            </span>
            <input
              type="tel"
              inputMode="numeric"
              className="min-h-12 rounded-md border border-stone-700 bg-stone-950/70 px-4 text-sm text-stone-50 outline-none shadow-inner shadow-black/20 transition focus:border-amber-400"
              value={telefoneCliente}
              onChange={handlePhoneChange}
              placeholder="(11) 99999-9999"
            />
            {!isPhoneValid && telefoneCliente.length > 0 ? (
              <span className="text-xs text-amber-200">
                Use o formato (11) 99999-9999.
              </span>
            ) : null}
          </label>
        </div>

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded-md border border-stone-700 bg-stone-950/60 px-5 text-sm font-semibold text-stone-200 transition hover:border-amber-700"
            onClick={() => navigate('/horarios')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded-md bg-amber-400 px-5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-950/20 transition enabled:hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400 disabled:shadow-none"
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
