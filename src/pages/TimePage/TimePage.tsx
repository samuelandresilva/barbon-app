import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TimeSlotList } from '../../components/calendar'
import { AppLayout, HeaderOakbeard } from '../../components/layout'
import { useBooking } from '../../contexts'
import { generateAvailableSlots } from '../../domain/rules'
import { getEventosOcupados } from '../../services/googleCalendarService'
import {
  getAgendas,
  getDadosEmpresa,
} from '../../services/googleSheetsService'
import type { DadosEmpresa, HorarioDisponivel } from '../../types'

export function TimePage() {
  const navigate = useNavigate()
  const {
    profissionalSelecionado,
    data,
    horario,
    servicoSelecionado,
    setHorario,
  } = useBooking()
  const [empresa, setDadosEmpresa] = useState<DadosEmpresa | null>(null)
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<
    HorarioDisponivel[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadAvailableSlots() {
      if (!servicoSelecionado || !profissionalSelecionado || !data) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setErrorMessage('')

        const [loadedDadosEmpresa, agendas] = await Promise.all([
          getDadosEmpresa(),
          getAgendas(),
        ])
        const agenda = agendas.find(
          (item) => item.profissionalId === profissionalSelecionado.id,
        )

        if (!agenda) {
          throw new Error('Agenda do profissional não encontrada.')
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
          setDadosEmpresa(loadedDadosEmpresa)
          setHorariosDisponiveis(availableSlots)
        }
      } catch {
        if (isMounted) {
          setErrorMessage(
            'Não foi possível carregar os horários disponíveis.',
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
  }, [profissionalSelecionado, data, servicoSelecionado])

  function handleTimeSelect(selectedTime: string) {
    setHorario(selectedTime)
  }

  if (!servicoSelecionado || !profissionalSelecionado || !data) {
    return (
      <div className="min-h-dvh bg-transparent text-[var(--color-text)]">
        <HeaderOakbeard />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-muted)]">
              Selecione serviço, profissional e data antes de escolher o horário.
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
            Carregando horários disponíveis...
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
            {errorMessage || 'Não foi possível carregar os horários disponíveis.'}
          </p>
        </main>
      </div>
    )
  }

  return (
    <AppLayout dadosEmpresa={empresa} currentStep="horario">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">
            Escolha o horário
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Selecione um horário para continuar.
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
            className="min-h-12 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-border-hover)]"
            onClick={() => navigate('/data')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded-md bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--color-on-primary)] shadow-lg shadow-[color:var(--color-shadow)] transition enabled:hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-secondary)] disabled:text-[var(--color-subtle)] disabled:shadow-none"
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
