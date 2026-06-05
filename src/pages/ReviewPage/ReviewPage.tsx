import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout, HeaderApp } from '../../components/layout'
import { useBooking } from '../../contexts'
import { getBarbearia } from '../../services/googleSheetsService'
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  openWhatsAppUrl,
} from '../../services/whatsappService'
import type { Barbearia } from '../../types'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

function formatDate(data: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${data}T00:00:00`))
}

export function ReviewPage() {
  const navigate = useNavigate()
  const {
    barbeiroSelecionado,
    data,
    horario,
    nomeCliente,
    servicoSelecionado,
    telefoneCliente,
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

  if (
    !servicoSelecionado ||
    !barbeiroSelecionado ||
    !data ||
    !horario ||
    !nomeCliente ||
    !telefoneCliente
  ) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100">
        <HeaderApp />
        <main className="mx-auto w-full max-w-5xl px-5 py-8">
          <div className="rounded-md border border-stone-800 bg-stone-900 p-4">
            <p className="text-sm text-stone-300">
              Complete as etapas anteriores antes de revisar a solicitação.
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

  const confirmedBarbearia = barbearia
  const bookingDetails = {
    barbeiro: barbeiroSelecionado,
    data,
    horario,
    nomeCliente,
    servico: servicoSelecionado,
    telefoneCliente,
  }

  function handleBookingRequest() {
    const message = buildWhatsAppMessage(bookingDetails)
    const whatsappUrl = buildWhatsAppUrl({
      message,
      telefoneWhatsapp: confirmedBarbearia.telefoneWhatsapp,
    })

    openWhatsAppUrl(whatsappUrl)
    navigate('/whatsapp')
  }

  return (
    <AppLayout barbearia={barbearia} currentStep="revisao">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-stone-50">
            Revise sua solicitação
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            Confira os dados antes de enviar.
          </p>
        </div>

        <dl className="grid gap-3">
          <div className="rounded-md border border-stone-800 bg-stone-900/90 p-4 shadow-sm shadow-black/20">
            <dt className="text-xs font-semibold uppercase text-stone-500">
              Serviço
            </dt>
            <dd className="mt-2 text-base font-semibold text-stone-50">
              {servicoSelecionado.nome}
            </dd>
            <dd className="mt-1 text-sm text-stone-300">
              {currencyFormatter.format(servicoSelecionado.preco)} -{' '}
              {servicoSelecionado.duracaoMinutos} min
            </dd>
          </div>

          <div className="rounded-md border border-stone-800 bg-stone-900/90 p-4 shadow-sm shadow-black/20">
            <dt className="text-xs font-semibold uppercase text-stone-500">
              Profissional
            </dt>
            <dd className="mt-2 text-base font-semibold text-stone-50">
              {barbeiroSelecionado.nome}
            </dd>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-stone-800 bg-stone-900/90 p-4 shadow-sm shadow-black/20">
              <dt className="text-xs font-semibold uppercase text-stone-500">
                Data
              </dt>
              <dd className="mt-2 text-base font-semibold text-stone-50">
                {formatDate(data)}
              </dd>
            </div>

            <div className="rounded-md border border-stone-800 bg-stone-900/90 p-4 shadow-sm shadow-black/20">
              <dt className="text-xs font-semibold uppercase text-stone-500">
                Horário
              </dt>
              <dd className="mt-2 text-base font-semibold text-stone-50">
                {horario}
              </dd>
            </div>
          </div>

          <div className="rounded-md border border-stone-800 bg-stone-900/90 p-4 shadow-sm shadow-black/20">
            <dt className="text-xs font-semibold uppercase text-stone-500">
              Cliente
            </dt>
            <dd className="mt-2 text-base font-semibold text-stone-50">
              {nomeCliente}
            </dd>
            <dd className="mt-1 text-sm text-stone-300">{telefoneCliente}</dd>
          </div>
        </dl>

        <p className="rounded-md border border-amber-400/40 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
          Sua solicitação será enviada para o estabelecimento. 
          O agendamento será confirmado manualmente pela equipe.
        </p>

        <div className="flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded-md border border-stone-700 bg-stone-950/60 px-5 text-sm font-semibold text-stone-200 transition hover:border-amber-700"
            onClick={() => navigate('/cliente')}
          >
            Voltar
          </button>
          <button
            type="button"
            className="min-h-12 rounded-md bg-amber-400 px-5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300"
            onClick={handleBookingRequest}
          >
            Solicitar Agendamento
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
