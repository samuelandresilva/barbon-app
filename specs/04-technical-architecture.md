# barbon.app - Arquitetura Técnica - V1

## Objetivo

Definir a arquitetura técnica da aplicação para garantir consistência durante a implementação gerada por IA.

Este documento descreve:

* stack tecnológica;
* organização do projeto;
* responsabilidades das camadas;
* convenções de código;
* padrões arquiteturais.

---

# Stack Tecnológica

## Frontend

* React 19+
* TypeScript
* Vite

---

## Estilização

* Tailwind CSS

---

## Gerenciamento de Estado

Para a V1 não utilizar Redux.

Utilizar apenas:

* React Context
* React Hooks

Quando possível, preferir estado local.

---

## Navegação

Utilizar:

```txt
react-router-dom
```

---

## Integrações Externas

### Google Sheets

Leitura somente.

---

### Google Calendar

Leitura somente.

---

### WhatsApp

Redirecionamento utilizando URL do WhatsApp.

---

# Padrão Arquitetural

A aplicação deve seguir uma arquitetura baseada em responsabilidades.

Separar:

* interface;
* regras de negócio;
* integração com APIs;
* tipos.

---

# Estrutura de Pastas

```txt
src/
│
├── app/
│
├── pages/
│   ├── HomePage
│   ├── ServicePage
│   ├── BarberPage
│   ├── DatePage
│   ├── TimePage
│   ├── CustomerPage
│   └── ReviewPage
│
├── components/
│   ├── layout/
│   ├── barber/
│   ├── service/
│   ├── calendar/
│   └── shared/
│
├── services/
│   ├── googleSheetsService.ts
│   ├── googleCalendarService.ts
│   └── whatsappService.ts
│
├── hooks/
│
├── contexts/
│
├── domain/
│   ├── models/
│   ├── mappers/
│   └── rules/
│
├── types/
│
├── utils/
│
└── routes/
```

---

# Responsabilidade das Camadas

## Pages

Responsáveis por:

* composição da tela;
* navegação;
* integração entre componentes.

Não devem conter regras de negócio.

---

## Components

Responsáveis apenas por:

* renderização;
* captura de eventos.

Não devem conhecer Google Sheets ou Google Calendar.

---

## Services

Responsáveis por:

* chamadas externas;
* leitura de dados.

---

## Domain

Responsável pelas regras de negócio.

Exemplos:

* cálculo de disponibilidade;
* validação de horários;
* geração de slots.

---

## Types

Responsável pelas interfaces TypeScript.

---

# Context Global

Criar um contexto principal:

```ts
BookingContext
```

Responsável por armazenar:

* serviço selecionado;
* barbeiro selecionado;
* data selecionada;
* horário selecionado;
* nome do cliente;
* telefone do cliente.

---

# Modelo de Navegação

```txt
Home
 ↓
Serviço
 ↓
Barbeiro
 ↓
Data
 ↓
Horário
 ↓
Dados
 ↓
Revisão
```

O usuário não pode pular etapas.

---

# Regras de Carregamento

Ao iniciar o app:

1. Carregar informações da barbearia.
2. Carregar serviços.
3. Carregar barbeiros.
4. Carregar relacionamento barbeiro-serviço.
5. Carregar configurações de agenda.

---

# Integração com Google Sheets

Criar serviço dedicado:

```ts
googleSheetsService.ts
```

Responsável por:

* obter barbearia;
* obter serviços;
* obter barbeiros;
* obter agendas.

---

# Integração com Google Calendar

Criar serviço dedicado:

```ts
googleCalendarService.ts
```

Responsável por:

* consultar eventos ocupados;
* retornar períodos indisponíveis.

---

# Integração com WhatsApp

Criar serviço dedicado:

```ts
whatsappService.ts
```

Responsável por:

* montar mensagem;
* gerar URL;
* abrir WhatsApp.

---

# Regras de Componentização

Criar componentes reutilizáveis para:

* Header barbon
* Card da Barbearia
* Card de Serviço
* Card de Barbeiro
* Calendário
* Lista de Horários
* Indicador de Etapas
* Loading
* Error State

---

# Tratamento de Erros

Todo erro deve possuir:

* mensagem amigável;
* opção de tentar novamente quando possível.

Não exibir erros técnicos ao usuário.

---

# Performance

A aplicação deve:

* evitar chamadas repetidas;
* reutilizar dados carregados;
* minimizar renderizações desnecessárias.

---

# Convenções

## Componentes

Utilizar:

```txt
PascalCase
```

Exemplo:

```txt
ServiceCard.tsx
```

---

## Hooks

Utilizar:

```txt
useNomeDoHook
```

Exemplo:

```txt
useServices.ts
```

---

## Tipos

Utilizar:

```txt
PascalCase
```

Exemplo:

```txt
Servico.ts
Barbeiro.ts
```

---

## Services

Utilizar:

```txt
camelCase + Service
```

Exemplo:

```txt
googleSheetsService.ts
```

---

# Fora do Escopo

Não implementar:

* Redux;
* Zustand;
* React Query;
* Backend;
* Banco de dados;
* Autenticação;
* Microfrontends;
* Server Side Rendering;
* PWA.

A arquitetura deve permanecer simples e fácil de manter.
