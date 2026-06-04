import type { Barbeiro, Servico } from '../types'

interface BuildWhatsAppMessageParams {
  barbeiro: Barbeiro
  data: string
  horario: string
  nomeCliente: string
  servico: Servico
  telefoneCliente: string
}

interface BuildWhatsAppUrlParams {
  message: string
  telefoneWhatsapp: string
}

function formatDate(data: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${data}T00:00:00`))
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

export function buildWhatsAppMessage({
  barbeiro,
  data,
  horario,
  nomeCliente,
  servico,
  telefoneCliente,
}: BuildWhatsAppMessageParams) {
  return [
    'Ola, gostaria de solicitar um agendamento.',
    '',
    `Nome: ${nomeCliente}`,
    `Telefone: ${telefoneCliente}`,
    `Servico: ${servico.nome}`,
    `Barbeiro: ${barbeiro.nome}`,
    `Data: ${formatDate(data)}`,
    `Horario: ${horario}`,
    '',
    'Entendo que o agendamento sera confirmado manualmente pela equipe.',
  ].join('\n')
}

export function buildWhatsAppUrl({
  message,
  telefoneWhatsapp,
}: BuildWhatsAppUrlParams) {
  const phone = onlyDigits(telefoneWhatsapp)

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function openWhatsAppUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
