import type {
  AgendaBarbeiro,
  Barbearia,
  Barbeiro,
  BarbeiroServico,
  Servico,
} from '../types'

export interface GoogleSheetsData {
  barbearia: Barbearia
  servicos: Servico[]
  barbeiros: Barbeiro[]
  barbeiroServicos: BarbeiroServico[]
  agendas: AgendaBarbeiro[]
}

const mockBarbearia: Barbearia = {
  nome: 'Barbearia Carvalho',
  telefoneWhatsapp: '(11) 99999-9999',
  endereco: 'Rua Exemplo, 123',
  instagram: '@barbeariacarvalho',
  logoUrl: '',
  descricao: 'Cortes classicos, barba alinhada e atendimento tradicional.',
}

const mockServicos: Servico[] = [
  {
    id: 'corte-masculino',
    nome: 'Corte Masculino',
    descricao: 'Corte tradicional masculino.',
    preco: 45,
    duracaoMinutos: 30,
    ativo: true,
  },
  {
    id: 'barba',
    nome: 'Barba',
    descricao: 'Modelagem de barba com acabamento classico.',
    preco: 35,
    duracaoMinutos: 30,
    ativo: true,
  },
  {
    id: 'corte-barba',
    nome: 'Corte e Barba',
    descricao: 'Servico completo com corte masculino e barba.',
    preco: 75,
    duracaoMinutos: 60,
    ativo: true,
  },
]

const mockBarbeiros: Barbeiro[] = [
  {
    id: 'carlos-silva',
    nome: 'Carlos Silva',
    descricao: 'Especialista em cortes classicos.',
    fotoUrl: '',
    ativo: true,
  },
  {
    id: 'marcos-almeida',
    nome: 'Marcos Almeida',
    descricao: 'Barbeiro focado em acabamento de barba.',
    fotoUrl: '',
    ativo: true,
  },
]

const mockBarbeiroServicos: BarbeiroServico[] = [
  {
    barbeiroId: 'carlos-silva',
    servicoId: 'corte-masculino',
  },
  {
    barbeiroId: 'carlos-silva',
    servicoId: 'corte-barba',
  },
  {
    barbeiroId: 'marcos-almeida',
    servicoId: 'barba',
  },
  {
    barbeiroId: 'marcos-almeida',
    servicoId: 'corte-barba',
  },
]

const mockAgendas: AgendaBarbeiro[] = [
  {
    barbeiroId: 'carlos-silva',
    googleCalendarId: 'carlos@barbeariacarvalho.com',
    horaInicio: '09:00',
    horaFim: '18:00',
    intervaloMinutos: 30,
    ativo: true,
  },
  {
    barbeiroId: 'marcos-almeida',
    googleCalendarId: 'marcos@barbeariacarvalho.com',
    horaInicio: '10:00',
    horaFim: '19:00',
    intervaloMinutos: 30,
    ativo: true,
  },
]

async function readMockData<T>(data: T): Promise<T> {
  try {
    return data
  } catch {
    throw new Error('Nao foi possivel carregar as informacoes.')
  }
}

export async function getBarbearia(): Promise<Barbearia> {
  return readMockData(mockBarbearia)
}

export async function getServicos(): Promise<Servico[]> {
  return readMockData(mockServicos.filter((servico) => servico.ativo))
}

export async function getBarbeiros(): Promise<Barbeiro[]> {
  return readMockData(mockBarbeiros.filter((barbeiro) => barbeiro.ativo))
}

export async function getBarbeiroServicos(): Promise<BarbeiroServico[]> {
  return readMockData(mockBarbeiroServicos)
}

export async function getAgendas(): Promise<AgendaBarbeiro[]> {
  return readMockData(mockAgendas.filter((agenda) => agenda.ativo))
}

export async function getGoogleSheetsData(): Promise<GoogleSheetsData> {
  try {
    const [barbearia, servicos, barbeiros, barbeiroServicos, agendas] =
      await Promise.all([
        getBarbearia(),
        getServicos(),
        getBarbeiros(),
        getBarbeiroServicos(),
        getAgendas(),
      ])

    return {
      barbearia,
      servicos,
      barbeiros,
      barbeiroServicos,
      agendas,
    }
  } catch {
    throw new Error('Nao foi possivel carregar os dados da planilha.')
  }
}
