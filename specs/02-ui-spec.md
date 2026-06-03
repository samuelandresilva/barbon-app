# Oakbeard.app - Especificação de Interface (UI Spec) - V1

## Objetivo

Este documento define a estrutura visual, navegação, telas e componentes da interface do Oakbeard.app.

O objetivo é garantir que a implementação siga exatamente a experiência planejada, evitando decisões implícitas durante o desenvolvimento.

---

# Diretrizes Gerais

## Mobile First

A aplicação deve ser desenvolvida priorizando dispositivos móveis.

Posteriormente a interface deve se adaptar para tablets e desktops.

---

## Navegação

A navegação deverá ocorrer em fluxo sequencial.

O usuário deve avançar etapa por etapa até concluir a solicitação do agendamento.

---

## Cabeçalho da Aplicação

O cabeçalho representa o produto Oakbeard.app.

As informações exibidas no cabeçalho não pertencem à barbearia.

O cabeçalho deve conter:

* logo do Oakbeard.app;
* nome Oakbeard.app;
* slogan opcional;
* identidade visual da plataforma.

Exemplo:

```txt
[LOGO OAKBEARD]

Oakbeard.app
Seu horário, sua barba, sem complicação.
```

---

## Informações da Barbearia

As informações da barbearia devem aparecer abaixo do cabeçalho principal da aplicação.

Essas informações serão carregadas da planilha Google.

O bloco deve conter:

* logo da barbearia;
* nome da barbearia;
* telefone;
* endereço;
* Instagram;
* descrição opcional.

Exemplo:

```txt
Barbearia Carvalho

📞 (11) 99999-9999

📍 Rua Exemplo, 123

📷 @barbeariacarvalho
```

---

# Fluxo de Navegação

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
Dados do Cliente
 ↓
Revisão
 ↓
WhatsApp
```

---

# Tela 1 - Home

## Objetivo

Apresentar a plataforma e a barbearia.

---

## Componentes

### Header Oakbeard

Exibir:

* logo Oakbeard;
* nome Oakbeard.app;
* slogan opcional.

---

### Card da Barbearia

Exibir:

* logo da barbearia;
* nome da barbearia;
* telefone;
* endereço;
* Instagram.

---

### Botão Principal

Texto:

```txt
Agendar Horário
```

Ação:

Navegar para a seleção de serviço.

---

# Tela 2 - Seleção de Serviço

## Objetivo

Permitir que o cliente escolha o serviço desejado.

---

## Componentes

### Lista de Serviços

Cada item deve exibir:

* nome;
* descrição;
* preço;
* duração.

Exemplo:

```txt
Corte Masculino

Corte tradicional masculino.

R$ 45,00

30 minutos
```

---

## Seleção

Somente um serviço pode ser selecionado.

O item selecionado deve possuir destaque visual.

---

## Botão Continuar

Estado inicial:

```txt
Desabilitado
```

Após seleção:

```txt
Habilitado
```

---

# Tela 3 - Seleção de Barbeiro

## Objetivo

Permitir que o cliente escolha um barbeiro.

---

## Componentes

### Lista de Barbeiros

Cada barbeiro deve exibir:

* foto;
* nome;
* descrição.

Exemplo:

```txt
[FOTO]

Carlos Silva

Especialista em cortes clássicos.
```

---

## Regra

Exibir somente barbeiros que executam o serviço escolhido.

---

## Botão Continuar

Disponível somente após selecionar um barbeiro.

---

# Tela 4 - Seleção de Data

## Objetivo

Permitir a escolha da data desejada.

---

## Componentes

### Calendário

Exibir calendário mensal.

---

## Regras

Não permitir:

* datas passadas.

Permitir:

* data atual;
* datas futuras.

---

## Botão Continuar

Disponível somente após selecionar uma data.

---

# Tela 5 - Seleção de Horário

## Objetivo

Permitir a escolha de um horário disponível.

---

## Componentes

### Lista de Horários

Exemplo:

```txt
09:00
09:30
10:00
10:30
11:00
```

---

## Regras

Exibir apenas horários livres calculados pelo sistema.

Não exibir horários indisponíveis.

---

## Seleção

Permitir apenas um horário selecionado.

---

## Botão Continuar

Disponível somente após selecionar um horário.

---

# Tela 6 - Dados do Cliente

## Objetivo

Coletar os dados básicos do cliente.

---

## Campos

### Nome

Tipo:

```txt
Texto
```

Obrigatório:

```txt
Sim
```

Validação:

```txt
Mínimo de 3 caracteres
```

---

### Telefone

Tipo:

```txt
Telefone
```

Obrigatório:

```txt
Sim
```

Validação:

```txt
Formato brasileiro
```

Exemplo:

```txt
(11) 99999-9999
```

---

## Botão Continuar

Disponível somente quando todos os campos forem válidos.

---

# Tela 7 - Revisão

## Objetivo

Permitir que o cliente revise os dados antes de enviar a solicitação.

---

## Resumo

Exibir:

* serviço;
* preço;
* duração;
* barbeiro;
* data;
* horário;
* nome;
* telefone.

---

## Exemplo

```txt
Serviço: Corte Masculino

Preço: R$ 45,00

Duração: 30 minutos

Barbeiro: Carlos Silva

Data: 15/07/2026

Horário: 14:30

Nome: João da Silva

Telefone: (11) 99999-9999
```

---

## Aviso

Exibir mensagem:

```txt
Sua solicitação será enviada para a barbearia.

O agendamento será confirmado manualmente pela equipe.
```

---

## Botões

### Voltar

Permite alterar informações anteriores.

---

### Solicitar Agendamento

Abre o WhatsApp.

---

# Tela 8 - Redirecionamento para WhatsApp

## Objetivo

Informar ao usuário que será direcionado para o WhatsApp.

---

## Componentes

### Mensagem

```txt
Você será redirecionado para o WhatsApp da barbearia para finalizar sua solicitação.
```

---

### Botão

```txt
Abrir WhatsApp
```

---

# Componentes Compartilhados

## Header Oakbeard

Presente em todas as telas.

---

## Card da Barbearia

Presente em todas as telas.

---

## Indicador de Etapas

Exibir progresso do fluxo.

Exemplo:

```txt
Serviço → Barbeiro → Data → Horário → Dados → Revisão
```

Etapa atual deve possuir destaque visual.

---

## Loading

Utilizado durante:

* leitura da planilha Google;
* leitura da agenda Google.

Mensagem padrão:

```txt
Carregando informações...
```

---

# Estados de Erro

## Falha ao carregar dados da barbearia

Mensagem:

```txt
Não foi possível carregar as informações da barbearia.
```

---

## Falha ao carregar serviços

Mensagem:

```txt
Não foi possível carregar os serviços disponíveis.
```

---

## Falha ao consultar agenda

Mensagem:

```txt
Não foi possível consultar a disponibilidade do barbeiro.
```

---

# Diretrizes Visuais

A interface deve transmitir:

* profissionalismo;
* tradição;
* elegância;
* confiança.

Elementos visuais recomendados:

* madeira;
* carvalho;
* couro;
* tons escuros;
* detalhes dourados discretos;
* tipografia clássica.

O visual deve remeter a uma barbearia premium tradicional.
