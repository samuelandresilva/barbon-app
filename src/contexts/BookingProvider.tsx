import { type PropsWithChildren, useState } from 'react'
import type { Barbeiro, Servico } from '../types'
import {
  BookingContext,
  type BookingState,
  initialBookingState,
} from './bookingContext'

export function BookingProvider({ children }: PropsWithChildren) {
  const [servicoSelecionado, setServicoSelecionado] =
    useState<Servico | null>(initialBookingState.servicoSelecionado)
  const [barbeiroSelecionado, setBarbeiroSelecionado] =
    useState<Barbeiro | null>(initialBookingState.barbeiroSelecionado)
  const [data, setData] = useState(initialBookingState.data)
  const [horario, setHorario] = useState(initialBookingState.horario)
  const [nomeCliente, setNomeCliente] = useState(
    initialBookingState.nomeCliente,
  )
  const [telefoneCliente, setTelefoneCliente] = useState(
    initialBookingState.telefoneCliente,
  )

  function resetBooking() {
    setServicoSelecionado(initialBookingState.servicoSelecionado)
    setBarbeiroSelecionado(initialBookingState.barbeiroSelecionado)
    setData(initialBookingState.data)
    setHorario(initialBookingState.horario)
    setNomeCliente(initialBookingState.nomeCliente)
    setTelefoneCliente(initialBookingState.telefoneCliente)
  }

  const bookingState: BookingState = {
    servicoSelecionado,
    barbeiroSelecionado,
    data,
    horario,
    nomeCliente,
    telefoneCliente,
  }

  return (
    <BookingContext.Provider
      value={{
        ...bookingState,
        setServicoSelecionado,
        setBarbeiroSelecionado,
        setData,
        setHorario,
        setNomeCliente,
        setTelefoneCliente,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
