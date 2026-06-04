import type { EventoOcupado } from '../types'

interface GetEventosOcupadosParams {
  data: string
  googleCalendarId: string
}

const mockBusyHoursByCalendarId: Record<string, Array<[string, string]>> = {
  'carlos@barbeariacarvalho.com': [
    ['10:00', '11:00'],
    ['14:30', '15:00'],
  ],
  'marcos@barbeariacarvalho.com': [
    ['11:30', '12:30'],
    ['16:00', '17:00'],
  ],
}

function buildDateTime(data: string, horario: string) {
  return new Date(`${data}T${horario}:00`)
}

export async function getEventosOcupados({
  data,
  googleCalendarId,
}: GetEventosOcupadosParams): Promise<EventoOcupado[]> {
  try {
    const busyHours = mockBusyHoursByCalendarId[googleCalendarId] ?? []

    return busyHours.map(([inicio, fim]) => ({
      inicio: buildDateTime(data, inicio),
      fim: buildDateTime(data, fim),
    }))
  } catch {
    throw new Error('Nao foi possivel consultar a disponibilidade do barbeiro.')
  }
}
