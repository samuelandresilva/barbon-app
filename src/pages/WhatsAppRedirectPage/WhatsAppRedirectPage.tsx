import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderApp } from '../../components/layout'
import { useBooking } from '../../contexts'
import { hasBookingSlotConflict } from '../../domain/rules'
import { getEventosOcupados } from '../../services/googleCalendarService'
import {
  getAgendas,
  getBarbearia,
} from '../../services/googleSheetsService'
import type { Barbearia } from '../../types'

type AppointmentStatus = 'pending' | 'confirmed' | 'error'
type TimelineStepStatus = 'completed' | 'active' | 'upcoming'

const statusPollingIntervalMs = 15_000
const maxStatusPollingAttempts = 40

function formatCheckTime(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

function formatSelectedDate(data: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${data}T00:00:00`))
}

function getTimelineIndicatorClasses(status: TimelineStepStatus) {
  if (status === 'completed') {
    return 'border-emerald-400 bg-emerald-500 shadow-emerald-950/40'
  }

  if (status === 'active') {
    return 'border-amber-300 bg-amber-400 shadow-amber-950/40'
  }

  return 'border-stone-700 bg-stone-900 shadow-black/20'
}

function getTimelineLineClasses(status: TimelineStepStatus) {
  if (status === 'completed') {
    return 'bg-emerald-600/70'
  }

  return 'bg-stone-800'
}

interface TimelineStepProps {
  description: string
  isLast?: boolean
  meta?: string
  status: TimelineStepStatus
  title: string
}

function TimelineStep({
  description,
  isLast = false,
  meta,
  status,
  title,
}: TimelineStepProps) {
  const isActive = status === 'active'

  return (
    <li className="grid grid-cols-[2rem_1fr] gap-4">
      <div className="relative flex justify-center">
        <span
          className={[
            'relative z-10 mt-1 grid size-5 place-items-center rounded-full border-2 shadow-lg',
            getTimelineIndicatorClasses(status),
          ].join(' ')}
          aria-hidden="true"
        >
          {isActive ? (
            <span className="absolute inset-0 rounded-full bg-amber-300 opacity-60 motion-safe:animate-ping" />
          ) : null}
          {status === 'completed' ? (
            <span className="size-2 rounded-full bg-stone-950/80" />
          ) : null}
          {status === 'upcoming' ? (
            <span className="size-2 rounded-full bg-stone-600" />
          ) : null}
        </span>

        {!isLast ? (
          <span
            className={[
              'absolute bottom-[-1.25rem] top-7 w-px',
              getTimelineLineClasses(status),
            ].join(' ')}
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className={isLast ? '' : 'pb-6'}>
        <h2
          className={[
            'text-base font-bold',
            status === 'upcoming' ? 'text-stone-500' : 'text-stone-50',
          ].join(' ')}
        >
          {title}
        </h2>
        <p
          className={[
            'mt-1 text-sm leading-6',
            status === 'upcoming' ? 'text-stone-500' : 'text-stone-300',
          ].join(' ')}
        >
          {description}
        </p>
        {meta ? (
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            {meta}
          </p>
        ) : null}
      </div>
    </li>
  )
}

export function WhatsAppRedirectPage() {
  const navigate = useNavigate()
  const {
    barbeiroSelecionado,
    data,
    horario,
    resetBooking,
    servicoSelecionado,
  } = useBooking()
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
  const [appointmentStatus, setAppointmentStatus] =
    useState<AppointmentStatus>('pending')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [lastStatusCheckAt, setLastStatusCheckAt] = useState('')
  const [requestSentAt] = useState(() => formatCheckTime(new Date()))

  const hasBookingData = Boolean(
    barbeiroSelecionado && data && horario && servicoSelecionado,
  )

  useEffect(() => {
    if (!hasBookingData) {
      navigate('/', { replace: true })
    }
  }, [hasBookingData, navigate])

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
            'Nao foi possivel carregar as informacoes do estabelecimento.',
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

  useEffect(() => {
    if (!barbeiroSelecionado || !data || !horario || !servicoSelecionado) {
      return
    }

    const selectedBarber = barbeiroSelecionado
    const selectedDate = data
    const selectedService = servicoSelecionado
    const selectedTime = horario

    let isMounted = true
    let pollingAttempts = 0

    async function checkAppointmentStatus() {
      pollingAttempts += 1

      try {
        const agendas = await getAgendas()
        const agenda = agendas.find(
          (item) => item.barbeiroId === selectedBarber.id,
        )

        if (!agenda) {
          throw new Error('Agenda do profissional nao encontrada.')
        }

        const eventosOcupados = await getEventosOcupados({
          data: selectedDate,
          googleCalendarId: agenda.googleCalendarId,
        })
        const isConfirmed = hasBookingSlotConflict({
          data: selectedDate,
          duracaoMinutos: selectedService.duracaoMinutos,
          eventosOcupados,
          horario: selectedTime,
        })

        if (!isMounted) {
          return
        }

        setLastStatusCheckAt(formatCheckTime(new Date()))
        setAppointmentStatus(isConfirmed ? 'confirmed' : 'pending')

        if (isConfirmed && intervalId) {
          window.clearInterval(intervalId)
        }
      } catch {
        if (!isMounted) {
          return
        }

        setLastStatusCheckAt(formatCheckTime(new Date()))
        setAppointmentStatus('error')
      }
    }

    const intervalId = window.setInterval(() => {
      if (pollingAttempts >= maxStatusPollingAttempts) {
        window.clearInterval(intervalId)
        return
      }

      void checkAppointmentStatus()
    }, statusPollingIntervalMs)

    void checkAppointmentStatus()

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [barbeiroSelecionado, data, horario, servicoSelecionado])

  function handleBackHome() {
    resetBooking()
    navigate('/')
  }

  if (!barbeiroSelecionado || !data || !horario || !servicoSelecionado) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderApp />
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
        <HeaderApp />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <p className="rounded-md border border-red-900/60 bg-red-950/30 p-4 text-sm text-red-100">
            {errorMessage ||
              'Nao foi possivel carregar as informacoes do estabelecimento.'}
          </p>
        </main>
      </div>
    )
  }

  const isConfirmed = appointmentStatus === 'confirmed'
  const hasStatusCheckError = appointmentStatus === 'error'
  const waitingStatus: TimelineStepStatus = isConfirmed ? 'completed' : 'active'
  const confirmedStatus: TimelineStepStatus = isConfirmed
    ? 'completed'
    : 'upcoming'
  const appointmentSummary = [
    servicoSelecionado.nome,
    barbeiroSelecionado.nome,
    `${formatSelectedDate(data)} as ${horario}`,
  ].join(' - ')

  return (
    <AppLayout barbearia={barbearia}>
      <div className="flex min-h-72 flex-col gap-5">
        <div>
          <p className="text-sm font-bold uppercase text-amber-400">
            Status do agendamento
          </p>
          <h1 className="mt-2 text-2xl font-bold text-stone-50">
            Acompanhe a confirmacao do seu horario
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            O status atualiza automaticamente quando o evento aparece na agenda
            do profissional.
          </p>
        </div>

        <div className="rounded-md border border-stone-800 bg-stone-900/90 p-5 shadow-sm shadow-black/20">
          {appointmentSummary ? (
            <p className="mb-5 rounded-md border border-stone-800 bg-stone-950/70 px-4 py-3 text-sm font-semibold leading-6 text-stone-200">
              {appointmentSummary}
            </p>
          ) : null}

          <ol aria-label="Historico do agendamento">
            <TimelineStep
              description="Voce foi redirecionado para o WhatsApp com a mensagem pronta."
              meta={`Enviado as ${requestSentAt}`}
              status="completed"
              title="Solicitacao enviada"
            />
            <TimelineStep
              description="Estamos verificando se o barbeiro confirmou o agendamento na agenda."
              meta={
                lastStatusCheckAt
                  ? `Ultima verificacao: ${lastStatusCheckAt}`
                  : 'Aguardando primeira verificacao'
              }
              status={waitingStatus}
              title="Aguardando confirmacao"
            />
            <TimelineStep
              description="Seu horario foi confirmado na agenda do profissional."
              isLast
              status={confirmedStatus}
              title="Agendamento confirmado"
            />
          </ol>
        </div>

        {hasStatusCheckError && hasBookingData ? (
          <p className="rounded-md border border-amber-700/50 bg-amber-950/30 p-4 text-sm leading-6 text-amber-100">
            A ultima verificacao nao foi concluida. O acompanhamento continua
            tentando consultar a agenda automaticamente.
          </p>
        ) : null}

        {isConfirmed ? (
          <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm font-semibold leading-6 text-emerald-100">
            Tudo certo! Seu agendamento foi confirmado pela equipe{' '}
            {barbearia.nome}.
          </p>
        ) : null}

        <div>
          <button
            type="button"
            className="min-h-12 rounded-md bg-amber-400 px-5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300"
            onClick={handleBackHome}
          >
            Voltar ao inicio
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
