import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TimeSlotList } from '../../components/calendar'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import { generateAvailableSlots } from '../../domain/rules'
import { getEventosOcupados } from '../../services/googleCalendarService'
import {
  getAgendas,
  getBarbearia,
} from '../../services/googleSheetsService'
import type { Barbearia, HorarioDisponivel } from '../../types'

export function TimePage() {
  const navigate = useNavigate()
  const {
    barbeiroSelecionado,
    data,
    horario,
    servicoSelecionado,
    setHorario,
  } = useBooking()
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<
    HorarioDisponivel[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadAvailableSlots() {
      if (!servicoSelecionado || !barbeiroSelecionado || !data) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setErrorMessage('')

        const [loadedBarbearia, agendas] = await Promise.all([
          getBarbearia(),
          getAgendas(),
        ])
        const agenda = agendas.find(
          (item) => item.barbeiroId === barbeiroSelecionado.id,
        )

        if (!agenda) {
          throw new Error('Agenda do barbeiro nao encontrada.')
        }

        const eventosOcupados = await getEventosOcupados({
          data,
          googleCalendarId: agenda.googleCalendarId,
        })
        const availableSlots = generateAvailableSlots({
          agenda,
          data,
          eventosOcupados,
          servico: servicoSelecionado,
        })

        if (isMounted) {
          setBarbearia(loadedBarbearia)
          setHorariosDisponiveis(availableSlots)
        }
      } catch {
        if (isMounted) {
          setErrorMessage(
            'Nao foi possivel carregar os horarios disponiveis.',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadAvailableSlots()

    return () => {
      isMounted = false
    }
  }, [barbeiroSelecionado, data, servicoSelecionado])

  function handleTimeSelect(selectedTime: string) {
    setHorario(selectedTime)
  }

  if (!servicoSelecionado || !barbeiroSelecionado || !data) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-stone-800 bg-stone-900 p-4">
            <p className="text-sm text-stone-300">
              Selecione servico, barbeiro e data antes de escolher o horario.
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
            Carregando horarios disponiveis...
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
            {errorMessage || 'Nao foi possivel carregar os horarios.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout barbearia={barbearia} currentStep="horario">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-stone-50">
            Escolha o horario
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Horarios ocupados sao removidos automaticamente da lista.
          </p>
        </div>

        <TimeSlotList
          horarios={horariosDisponiveis}
          selectedTime={horario}
          onSelectTime={handleTimeSelect}
        />

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded border border-stone-700 px-5 text-sm font-semibold text-stone-200"
            onClick={() => navigate('/data')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded bg-amber-400 px-5 text-sm font-semibold text-stone-950 transition enabled:hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400"
            disabled={!horario}
            onClick={() => navigate('/cliente')}
          >
            Continuar
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
