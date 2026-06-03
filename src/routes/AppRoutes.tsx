import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout'
import type { Barbearia } from '../types'

const barbeariaPreview: Barbearia = {
  nome: 'Barbearia Carvalho',
  telefoneWhatsapp: '(11) 99999-9999',
  endereco: 'Rua Exemplo, 123',
  instagram: '@barbeariacarvalho',
  logoUrl: '',
  descricao: 'Cortes classicos, barba alinhada e atendimento tradicional.',
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout barbearia={barbeariaPreview} currentStep="servico">
            <div className="flex min-h-64 items-center justify-center text-center text-sm text-stone-400">
              Oakbeard.app
            </div>
          </AppLayout>
        }
      />
    </Routes>
  )
}
