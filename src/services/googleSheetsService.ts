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

type GoogleSheetName =
  | 'barbearia'
  | 'servicos'
  | 'barbeiros'
  | 'barbeiro_servicos'
  | 'barbeiro_agendas'

type SheetRow = Record<string, string>

const sheetRowsCache = new Map<GoogleSheetName, Promise<SheetRow[]>>()

function getSpreadsheetId() {
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID

  if (!spreadsheetId) {
    throw new Error('Planilha Google Sheets nao configurada.')
  }

  return spreadsheetId
}

function buildSheetCsvUrl(sheetName: GoogleSheetName) {
  const spreadsheetId = getSpreadsheetId()
  const searchParams = new URLSearchParams({
    sheet: sheetName,
    tqx: 'out:csv',
  })

  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?${searchParams.toString()}`
}

function parseCsv(csv: string) {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentCell = ''
  let isInsideQuotes = false

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index]
    const nextCharacter = csv[index + 1]

    if (character === '"' && nextCharacter === '"') {
      currentCell += '"'
      index += 1
    } else if (character === '"') {
      isInsideQuotes = !isInsideQuotes
    } else if (character === ',' && !isInsideQuotes) {
      currentRow.push(currentCell)
      currentCell = ''
    } else if (character === '\n' && !isInsideQuotes) {
      currentRow.push(currentCell)
      rows.push(currentRow)
      currentRow = []
      currentCell = ''
    } else if (character !== '\r') {
      currentCell += character
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell)
    rows.push(currentRow)
  }

  return rows
}

function parseSheetRows(csv: string): SheetRow[] {
  const [headerRow, ...dataRows] = parseCsv(csv)

  if (!headerRow) {
    return []
  }

  const headers = headerRow.map((header) => header.trim())

  return dataRows
    .filter((row) => row.some((cell) => cell.trim()))
    .map((row) =>
      headers.reduce<SheetRow>((sheetRow, header, index) => {
        sheetRow[header] = (row[index] ?? '').trim()
        return sheetRow
      }, {}),
    )
}

async function fetchSheetRows(sheetName: GoogleSheetName): Promise<SheetRow[]> {
  try {
    const response = await fetch(buildSheetCsvUrl(sheetName))

    if (!response.ok) {
      throw new Error('Falha ao carregar planilha.')
    }

    const csv = await response.text()

    return parseSheetRows(csv)
  } catch {
    throw new Error('Nao foi possivel carregar os dados da planilha.')
  }
}

function getSheetRows(sheetName: GoogleSheetName): Promise<SheetRow[]> {
  const cachedRows = sheetRowsCache.get(sheetName)

  if (cachedRows) {
    return cachedRows
  }

  const rowsPromise = fetchSheetRows(sheetName).catch((error: unknown) => {
    sheetRowsCache.delete(sheetName)
    throw error
  })

  sheetRowsCache.set(sheetName, rowsPromise)

  return rowsPromise
}

function parseBoolean(value: string) {
  return value.trim().toUpperCase() === 'TRUE'
}

function parseNumber(value: string) {
  return Number(value.replace(',', '.'))
}

function mapBarbearia(row: SheetRow): Barbearia {
  return {
    nome: row.nome,
    telefoneWhatsapp: row.telefone_whatsapp,
    endereco: row.endereco,
    instagram: row.instagram,
    logoUrl: row.logo_url,
    descricao: row.descricao || undefined,
  }
}

function mapServico(row: SheetRow): Servico {
  return {
    id: row.id,
    nome: row.nome,
    descricao: row.descricao,
    preco: parseNumber(row.preco),
    duracaoMinutos: parseNumber(row.duracao_minutos),
    ativo: parseBoolean(row.ativo),
  }
}

function mapBarbeiro(row: SheetRow): Barbeiro {
  return {
    id: row.id,
    nome: row.nome,
    descricao: row.descricao,
    fotoUrl: row.foto_url || undefined,
    ativo: parseBoolean(row.ativo),
  }
}

function mapBarbeiroServico(row: SheetRow): BarbeiroServico {
  return {
    barbeiroId: row.barbeiro_id,
    servicoId: row.servico_id,
  }
}

function mapAgenda(row: SheetRow): AgendaBarbeiro {
  return {
    barbeiroId: row.barbeiro_id,
    googleCalendarId: row.google_calendar_id,
    horaInicio: row.hora_inicio,
    horaFim: row.hora_fim,
    intervaloMinutos: parseNumber(row.intervalo_minutos),
    ativo: parseBoolean(row.ativo),
  }
}

export async function getBarbearia(): Promise<Barbearia> {
  try {
    const [barbeariaRow] = await getSheetRows('barbearia')

    if (!barbeariaRow) {
      throw new Error('Dados da barbearia nao encontrados.')
    }

    return mapBarbearia(barbeariaRow)
  } catch {
    throw new Error('Nao foi possivel carregar as informacoes da barbearia.')
  }
}

export async function getServicos(): Promise<Servico[]> {
  try {
    const rows = await getSheetRows('servicos')

    return rows.map(mapServico).filter((servico) => servico.ativo)
  } catch {
    throw new Error('Nao foi possivel carregar os servicos disponiveis.')
  }
}

export async function getBarbeiros(): Promise<Barbeiro[]> {
  try {
    const rows = await getSheetRows('barbeiros')

    return rows.map(mapBarbeiro).filter((barbeiro) => barbeiro.ativo)
  } catch {
    throw new Error('Nao foi possivel carregar os barbeiros disponiveis.')
  }
}

export async function getBarbeiroServicos(): Promise<BarbeiroServico[]> {
  try {
    const rows = await getSheetRows('barbeiro_servicos')

    return rows.map(mapBarbeiroServico)
  } catch {
    throw new Error('Nao foi possivel carregar os vinculos de servicos.')
  }
}

export async function getAgendas(): Promise<AgendaBarbeiro[]> {
  try {
    const rows = await getSheetRows('barbeiro_agendas')

    return rows.map(mapAgenda).filter((agenda) => agenda.ativo)
  } catch {
    throw new Error('Nao foi possivel carregar as agendas dos barbeiros.')
  }
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
