# barbon.app - Regras de Implementação (Implementation Rules)

## Objetivo

Este documento define as regras obrigatórias que devem ser seguidas durante a implementação do barbon.app.

Estas regras possuem prioridade sobre decisões automáticas da IA.

Quando existir dúvida, a implementação deve seguir este documento.

---

# Princípios Gerais

## Simplicidade

Priorizar soluções simples.

Evitar abstrações desnecessárias.

Evitar arquiteturas complexas para problemas simples.

---

## Legibilidade

O código deve ser escrito para humanos.

A leitura deve ser priorizada sobre otimizações prematuras.

---

## Evolução

Toda implementação deve facilitar futuras evoluções.

A V1 é simples, mas deve permitir crescimento futuro sem grandes refatorações.

---

# Stack Obrigatória

## Frontend

Utilizar:

* React
* TypeScript
* Vite

Não utilizar:

* Next.js
* Remix
* Angular
* Vue

---

## Estilização

Utilizar:

* Tailwind CSS

Não utilizar:

* Bootstrap
* Material UI
* Ant Design

---

## Estado

Utilizar:

* React Context
* React Hooks

Não utilizar:

* Redux
* Zustand
* MobX
* Recoil

---

## Navegação

Utilizar:

* react-router-dom

---

# TypeScript

## Obrigatório

Todo código deve ser escrito em TypeScript.

---

## Proibido

Não utilizar:

```ts
any
```

---

## Preferência

Utilizar:

```ts
unknown
```

quando necessário.

---

## Interfaces

Toda estrutura de dados deve possuir tipagem explícita.

Exemplo:

```ts
interface Servico {
  id: string
  nome: string
}
```

---

# Organização de Código

## Pages

Responsáveis apenas por:

* montar a tela;
* orquestrar componentes;
* navegar entre páginas.

Não devem conter regras de negócio.

---

## Components

Responsáveis apenas por:

* renderização;
* captura de interação do usuário.

Não devem conhecer:

* Google Sheets;
* Google Calendar;
* WhatsApp.

---

## Services

Responsáveis por:

* integração externa;
* leitura de dados;
* transformação de respostas.

---

## Domain

Responsável por:

* regras de negócio;
* cálculos;
* validações;
* geração de horários disponíveis.

---

## Utils

Responsáveis por:

* formatações;
* funções auxiliares.

Não devem conter regras de negócio.

---

# Componentização

Criar componentes pequenos e reutilizáveis.

Evitar componentes gigantes.

---

## Limite Recomendado

Sempre que possível:

```txt
até 200 linhas por componente
```

---

# Regras de Disponibilidade

Toda lógica de disponibilidade deve ficar dentro da camada:

```txt
domain/rules
```

---

## Proibido

Não calcular disponibilidade dentro:

* de páginas;
* de componentes.

---

# Context Global

Criar um único contexto principal:

```txt
BookingContext
```

Responsável por armazenar:

* serviço selecionado;
* barbeiro selecionado;
* data;
* horário;
* nome;
* telefone.

---

## Proibido

Não criar múltiplos contextos sem necessidade.

---

# Integração com Google Sheets

Criar serviço dedicado:

```txt
googleSheetsService.ts
```

---

## Responsabilidades

* carregar dados da barbearia;
* carregar serviços;
* carregar barbeiros;
* carregar configurações.

---

# Integração com Google Calendar

Criar serviço dedicado:

```txt
googleCalendarService.ts
```

---

## Responsabilidades

* consultar eventos;
* retornar períodos ocupados.

---

# Integração com WhatsApp

Criar serviço dedicado:

```txt
whatsappService.ts
```

---

## Responsabilidades

* gerar mensagem;
* gerar URL;
* abrir WhatsApp.

---

# Tratamento de Erros

## Obrigatório

Toda chamada assíncrona deve possuir:

```ts
try {
} catch {
}
```

---

## Experiência do Usuário

Mensagens amigáveis.

Exemplo:

```txt
Não foi possível carregar as informações.
```

---

## Proibido

Nunca exibir:

* stack trace;
* mensagens técnicas;
* detalhes internos.

---

# Loading

Toda operação assíncrona deve possuir estado de carregamento.

---

## Exemplo

```txt
Carregando informações...
```

---

# Formatação de Dados

## Dinheiro

Utilizar formato brasileiro.

Exemplo:

```txt
R$ 45,00
```

---

## Data

Utilizar formato brasileiro.

Exemplo:

```txt
15/07/2026
```

---

## Telefone

Utilizar máscara brasileira.

Exemplo:

```txt
(11) 99999-9999
```

---

# Responsividade

## Obrigatório

A aplicação deve ser mobile-first.

---

## Desktop

Deve adaptar-se adequadamente para telas maiores.

---

## Proibido

Não permitir:

* rolagem horizontal;
* elementos cortados;
* textos sobrepostos.

---

# Acessibilidade

Sempre utilizar:

* labels em campos;
* textos alternativos em imagens;
* contraste adequado.

---

# Performance

## Evitar

* consultas repetidas;
* re-renderizações desnecessárias.

---

## Preferir

* memoização quando justificável;
* reaproveitamento de dados carregados.

---

# Estrutura de Arquivos

Utilizar exatamente:

```txt
src/
│
├── app/
├── pages/
├── components/
├── services/
├── hooks/
├── contexts/
├── domain/
├── types/
├── utils/
└── routes/
```

---

# Convenções de Nomenclatura

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

## Interfaces

Utilizar:

```txt
PascalCase
```

Exemplo:

```txt
Servico
Barbeiro
```

---

## Services

Utilizar:

```txt
camelCase
```

Exemplo:

```txt
googleSheetsService.ts
googleCalendarService.ts
whatsappService.ts
```

---

# Código Morto

## Proibido

Não deixar:

* código comentado;
* imports não utilizados;
* variáveis não utilizadas.

---

# Comentários

## Preferência

Código autoexplicativo.

---

## Utilizar comentários apenas quando

* a regra de negócio não for óbvia;
* existir uma decisão arquitetural importante.

---

# Testes

A V1 não exige testes automatizados.

Porém o código deve ser escrito de forma que testes possam ser adicionados futuramente.

---

# Fora do Escopo

Não implementar:

* backend;
* autenticação;
* banco de dados;
* Redux;
* Zustand;
* React Query;
* Server Side Rendering;
* PWA;
* WebSockets;
* Microfrontends;
* Docker;
* Kubernetes.

---

# Regra Final

Antes de implementar qualquer funcionalidade, verificar:

* 01-product-requirements.md
* 02-ui-spec.md
* 03-data-model.md
* 04-technical-architecture.md
* 05-acceptance-criteria.md

Nenhuma implementação deve contrariar qualquer especificação existente.
