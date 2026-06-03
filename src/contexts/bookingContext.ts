import { createContext } from 'react'
import type { Barbeiro, Servico } from '../types'

export interface BookingState {
  servicoSelecionado: Servico | null
  barbeiroSelecionado: Barbeiro | null
  data: string
  horario: string
  nomeCliente: string
  telefoneCliente: string
}

export interface BookingContextValue extends BookingState {
  setServicoSelecionado: (servico: Servico | null) => void
  setBarbeiroSelecionado: (barbeiro: Barbeiro | null) => void
  setData: (data: string) => void
  setHorario: (horario: string) => void
  setNomeCliente: (nomeCliente: string) => void
  setTelefoneCliente: (telefoneCliente: string) => void
  resetBooking: () => void
}

export const initialBookingState: BookingState = {
  servicoSelecionado: null,
  barbeiroSelecionado: null,
  data: '',
  horario: '',
  nomeCliente: '',
  telefoneCliente: '',
}

export const BookingContext = createContext<BookingContextValue | undefined>(
  undefined,
)
