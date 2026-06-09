import type { EventoOcupado } from '../../types'

interface HasBookingSlotConflictParams {
  data: string
  duracaoMinutos: number
  eventosOcupados: EventoOcupado[]
  horario: string
}

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}

function formatMinutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function buildDateTime(data: string, timeInMinutes: number) {
  return new Date(`${data}T${formatMinutesToTime(timeInMinutes)}:00`)
}

export function hasBookingSlotConflict({
  data,
  duracaoMinutos,
  eventosOcupados,
  horario,
}: HasBookingSlotConflictParams) {
  const slotStartMinutes = parseTimeToMinutes(horario)
  const slotStart = buildDateTime(data, slotStartMinutes)
  const slotEnd = buildDateTime(data, slotStartMinutes + duracaoMinutos)

  return eventosOcupados.some(
    (evento) => slotStart < evento.fim && slotEnd > evento.inicio,
  )
}
