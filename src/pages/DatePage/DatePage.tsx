import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DateCalendar } from '../../components/calendar'
import { AppLayout, HeaderApp } from '../../components/layout'
import { useBooking } from '../../contexts'
import { getBarbearia } from '../../services/googleSheetsService'
import type { Barbearia } from '../../types'

export function DatePage() {
  const navigate = useNavigate()
  const {
    barbeiroSelecionado,
    data,
    servicoSelecionado,
    setData,
    setHorario,
  } = useBooking()
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

  function handleDateSelect(selectedDate: string) {
    setData(selectedDate)
    setHorario('')
  }

  if (!servicoSelecionado || !barbeiroSelecionado) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderApp />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-stone-800 bg-stone-900 p-4">
            <p className="text-sm text-stone-300">
              Selecione serviço e profissional antes de escolher a data.
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
          <p className="rounded-md border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-100">
            {errorMessage ||
              'Não foi possível carregar as informações do estabelecimento.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout barbearia={barbearia} currentStep="data">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-stone-50">
            Escolha a data
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Selecione uma data para continuar.
          </p>
        </div>

        <DateCalendar selectedDate={data} onSelectDate={handleDateSelect} />

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded-md border border-stone-700 bg-stone-950/60 px-5 text-sm font-semibold text-stone-200 transition hover:border-amber-700"
            onClick={() => navigate('/barbeiros')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded-md bg-amber-400 px-5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-950/20 transition enabled:hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400 disabled:shadow-none"
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
