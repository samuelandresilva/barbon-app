# barbon.app - Modelo de Dados (Data Model) - V1

## Objetivo

Este documento define o modelo conceitual e estrutural dos dados utilizados pelo barbon.app.

O objetivo é garantir que todas as implementações utilizem as mesmas entidades, relacionamentos e contratos internos.

---

# Visão Geral

O barbon.app utiliza duas fontes de dados externas:

## Google Sheets

Responsável pelos dados cadastrais.

Contém:

* informações da barbearia;
* serviços;
* barbeiros;
* relacionamento entre barbeiros e serviços;
* configuração das agendas dos barbeiros.

---

## Google Calendar

Responsável pela disponibilidade.

Contém:

* eventos ocupados dos barbeiros;
* períodos indisponíveis;
* bloqueios de agenda.

---

# Fontes da Verdade

| Informação                 | Fonte                           |
| -------------------------- | ------------------------------- |
| Dados da barbearia         | Google Sheets                   |
| Serviços                   | Google Sheets                   |
| Barbeiros                  | Google Sheets                   |
| Relação barbeiro-serviço   | Google Sheets                   |
| Configuração da agenda     | Google Sheets                   |
| Horários ocupados          | Google Calendar                 |
| Horários disponíveis       | Calculados pela aplicação       |
| Solicitação de agendamento | Memória temporária da aplicação |

---

# Modelo Conceitual

```txt
Barbearia
│
├── possui Serviços
│
├── possui Barbeiros
│       │
│       └── executam Serviços
│
├── possui Configurações de Agenda
│
└── recebe Solicitações de Agendamento
```

---

# Entidades

## Barbearia

Representa os dados institucionais da barbearia.

### Estrutura

```ts
interface Barbearia {
  nome: string
  telefoneWhatsapp: string
  endereco: string
  instagram: string
  logoUrl: string
  descricao?: string
}
```

---

## Serviço

Representa um serviço oferecido pela barbearia.

### Estrutura

```ts
interface Servico {
  id: string
  nome: string
  descricao: string
  preco: number
  duracaoMinutos: number
  ativo: boolean
}
```

---

### Exemplo

```json
{
  "id": "corte",
  "nome": "Corte Masculino",
  "descricao": "Corte tradicional masculino",
  "preco": 45,
  "duracaoMinutos": 30,
  "ativo": true
}
```

---

## Barbeiro

Representa um profissional da barbearia.

### Estrutura

```ts
interface Barbeiro {
  id: string
  nome: string
  descricao: string
  fotoUrl?: string
  ativo: boolean
}
```

---

### Exemplo

```json
{
  "id": "carlos",
  "nome": "Carlos Silva",
  "descricao": "Especialista em cortes clássicos",
  "fotoUrl": "https://...",
  "ativo": true
}
```

---

## BarbeiroServico

Relaciona barbeiros aos serviços que podem executar.

### Estrutura

```ts
interface BarbeiroServico {
  barbeiroId: string
  servicoId: string
}
```

---

### Exemplo

```json
{
  "barbeiroId": "carlos",
  "servicoId": "corte"
}
```

---

## AgendaBarbeiro

Representa a configuração operacional da agenda.

Não representa eventos.

Representa regras de atendimento.

### Estrutura

```ts
interface AgendaBarbeiro {
  barbeiroId: string
  googleCalendarId: string
  horaInicio: string
  horaFim: string
  intervaloMinutos: number
  ativo: boolean
}
```

---

### Exemplo

```json
{
  "barbeiroId": "carlos",
  "googleCalendarId": "carlos@barbearia.com",
  "horaInicio": "09:00",
  "horaFim": "18:00",
  "intervaloMinutos": 30,
  "ativo": true
}
```

---

## EventoOcupado

Representa um evento retornado pelo Google Calendar.

### Estrutura

```ts
interface EventoOcupado {
  inicio: Date
  fim: Date
}
```

---

## HorarioDisponivel

Representa um horário calculado pela aplicação.

Não existe na planilha.

Não existe no Google Calendar.

É gerado dinamicamente.

### Estrutura

```ts
interface HorarioDisponivel {
  data: string
  horario: string
}
```

---

### Exemplo

```json
{
  "data": "2026-07-15",
  "horario": "14:30"
}
```

---

## SolicitacaoAgendamento

Representa uma solicitação enviada pelo cliente.

Importante:

Na V1 não existe entidade "Agendamento".

Existe apenas "Solicitação de Agendamento".

A confirmação ocorre fora do sistema.

### Estrutura

```ts
interface SolicitacaoAgendamento {
  nomeCliente: string
  telefoneCliente: string

  servicoId: string
  barbeiroId: string

  data: string
  horario: string
}
```

---

### Exemplo

```json
{
  "nomeCliente": "João da Silva",
  "telefoneCliente": "11999999999",
  "servicoId": "corte",
  "barbeiroId": "carlos",
  "data": "2026-07-15",
  "horario": "14:30"
}
```

---

# Estrutura da Planilha

## Aba: barbearia

| Campo             |
| ----------------- |
| nome              |
| telefone_whatsapp |
| endereco          |
| instagram         |
| logo_url          |
| descricao         |

---

## Aba: servicos

| Campo           |
| --------------- |
| id              |
| nome            |
| descricao       |
| preco           |
| duracao_minutos |
| ativo           |

---

## Aba: barbeiros

| Campo     |
| --------- |
| id        |
| nome      |
| descricao |
| foto_url  |
| ativo     |

---

## Aba: barbeiro_servicos

| Campo       |
| ----------- |
| barbeiro_id |
| servico_id  |

---

## Aba: barbeiro_agendas

| Campo              |
| ------------------ |
| barbeiro_id        |
| google_calendar_id |
| hora_inicio        |
| hora_fim           |
| intervalo_minutos  |
| ativo              |

---

# Regras de Relacionamento

## Serviço → Barbeiro

Um serviço pode ser executado por vários barbeiros.

Um barbeiro pode executar vários serviços.

Relacionamento:

```txt
N : N
```

---

## Barbeiro → Agenda

Cada barbeiro possui exatamente uma configuração de agenda.

Relacionamento:

```txt
1 : 1
```

---

## Barbeiro → Eventos

Um barbeiro possui vários eventos ocupados.

Relacionamento:

```txt
1 : N
```

Origem:

```txt
Google Calendar
```

---

# Regras de Cálculo de Disponibilidade

## Entradas

Para calcular disponibilidade são necessários:

* serviço selecionado;
* duração do serviço;
* agenda do barbeiro;
* eventos ocupados;
* data selecionada.

---

## Processo

A aplicação deve:

1. Obter a duração do serviço.
2. Obter a configuração da agenda.
3. Gerar todos os blocos possíveis.
4. Consultar eventos ocupados.
5. Remover conflitos.
6. Retornar apenas horários livres.

---

# Responsabilidades das Fontes

## Google Sheets

Responsável por:

* cadastro da barbearia;
* cadastro de serviços;
* cadastro de barbeiros;
* relacionamento barbeiro-serviço;
* configuração da agenda.

---

## Google Calendar

Responsável por:

* períodos ocupados;
* bloqueios;
* férias;
* compromissos.

---

## Aplicação React

Responsável por:

* carregar dados;
* calcular disponibilidade;
* coletar dados do cliente;
* gerar mensagem do WhatsApp;
* abrir WhatsApp.

---

# Fora do Escopo da V1

Não existe:

* persistência própria;
* banco de dados;
* tabela de agendamentos;
* histórico;
* status de agendamento;
* cancelamento;
* reagendamento;
* sincronização de agendas;
* escrita em Google Calendar;
* escrita em Google Sheets.
