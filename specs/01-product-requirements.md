# Oakbeard.app - Product Requirements Document - V1

## Visão Geral

O Oakbeard.app é uma aplicação web para solicitação de agendamentos em barbearias.

O cliente acessa o app, escolhe um serviço, escolhe um barbeiro, visualiza horários disponíveis com base na agenda Google do barbeiro e solicita o agendamento via WhatsApp.

A confirmação final do agendamento não acontece dentro do app. Ela será feita manualmente pela barbearia.

---

# Objetivo

Permitir que clientes solicitem agendamentos de forma simples, consultando disponibilidade real da agenda do barbeiro.

---

# Público-Alvo

Clientes da barbearia.

---

# Escopo da V1

A V1 terá:

* experiência somente para cliente;
* listagem de serviços;
* listagem de barbeiros;
* consulta de disponibilidade via Google Calendar somente leitura;
* envio da solicitação via WhatsApp.

A V1 não terá:

* login;
* backend;
* painel administrativo;
* banco de dados próprio;
* confirmação automática;
* escrita em Google Calendar;
* escrita em Google Sheets;
* pagamento online.

---

# Fluxo Principal

1. Cliente acessa o app.
2. Cliente escolhe o serviço.
3. Cliente escolhe o barbeiro.
4. App lê a agenda Google do barbeiro.
5. App calcula horários disponíveis entre hora inicial e hora final de atendimento.
6. Cliente escolhe data e horário disponível.
7. Cliente informa nome e telefone.
8. Cliente clica em “Solicitar agendamento”.
9. App abre o WhatsApp da barbearia com mensagem pronta.
10. Barbearia confirma manualmente.
11. Barbearia atualiza a agenda Google do barbeiro.

---

# Requisitos Funcionais

## RF-001 - Visualizar Serviços

O app deve exibir a lista de serviços disponíveis.

Cada serviço deve possuir:

* id;
* nome;
* descrição;
* preço;
* duração em minutos.

---

## RF-002 - Selecionar Serviço

O cliente deve selecionar exatamente um serviço antes de escolher o barbeiro.

---

## RF-003 - Visualizar Barbeiros por Serviço

Após selecionar um serviço, o app deve exibir somente os barbeiros aptos a realizar aquele serviço.

Cada barbeiro deve possuir:

* id;
* nome;
* descrição;
* foto opcional.

---

## RF-004 - Selecionar Barbeiro

O cliente deve selecionar exatamente um barbeiro.

---

## RF-005 - Consultar Agenda do Barbeiro

Após selecionar o barbeiro, o app deve consultar a agenda Google vinculada a ele em modo somente leitura.

---

## RF-006 - Calcular Horários Disponíveis

O app deve gerar horários disponíveis considerando:

* data selecionada;
* hora inicial de atendimento;
* hora final de atendimento;
* duração do serviço;
* eventos ocupados na agenda Google do barbeiro.

---

## RF-007 - Exibir Datas Disponíveis

O app deve permitir que o cliente escolha uma data.

Na V1, o app deve considerar inicialmente a data atual e datas futuras.

---

## RF-008 - Exibir Horários Disponíveis

Após escolher uma data, o app deve exibir os horários disponíveis.

Um horário disponível é aquele que:

* está dentro da janela de atendimento;
* respeita a duração do serviço;
* não conflita com eventos ocupados na agenda Google.

---

## RF-009 - Informar Dados do Cliente

O cliente deve informar:

* nome completo;
* telefone.

---

## RF-010 - Solicitar Agendamento

O botão “Solicitar agendamento” só deve ficar disponível quando todos os dados obrigatórios forem preenchidos.

---

## RF-011 - Abrir WhatsApp

Ao solicitar o agendamento, o app deve abrir o WhatsApp da barbearia.

---

## RF-012 - Gerar Mensagem Automática

A mensagem enviada ao WhatsApp deve conter:

* nome do cliente;
* telefone do cliente;
* serviço escolhido;
* preço do serviço;
* barbeiro escolhido;
* data escolhida;
* horário escolhido.

Exemplo:

Olá! Gostaria de solicitar um agendamento.

Nome: João da Silva
Telefone: (11) 99999-9999
Serviço: Corte Masculino
Preço: R$ 45,00
Barbeiro: Carlos
Data: 15/07/2026
Horário: 14:30

Aguardo confirmação.

---

# Regras de Negócio

## RN-001

O app não confirma agendamentos automaticamente.

## RN-002

Toda solicitação deve ser confirmada manualmente pela barbearia.

## RN-003

O app não escreve na agenda Google.

## RN-004

O app não escreve na planilha Google.

## RN-005

A disponibilidade exibida depende da leitura da agenda Google do barbeiro.

## RN-006

Após confirmar um agendamento, a barbearia é responsável por atualizar manualmente a agenda Google.

## RN-007

Um horário só deve ser exibido se comportar a duração completa do serviço.

## RN-008

Se um evento da agenda ocupar qualquer parte de um bloco de horário, esse horário não deve ser exibido.

## RN-009

O app deve deixar claro que a solicitação ainda depende de confirmação da barbearia.

---

# Fonte de Dados

A V1 utilizará duas fontes externas somente leitura:

* Google Sheets;
* Google Calendar.

---

# Google Sheets

A planilha será usada para dados cadastrais e configurações.

## Aba: barbearia

Campos:

* nome;
* telefone_whatsapp;
* endereco;
* instagram;
* logo_url.

---

## Aba: servicos

Campos:

* id;
* nome;
* descricao;
* preco;
* duracao_minutos;
* ativo.

---

## Aba: barbeiros

Campos:

* id;
* nome;
* descricao;
* foto_url;
* ativo.

---

## Aba: barbeiro_servicos

Relaciona barbeiros com serviços.

Campos:

* barbeiro_id;
* servico_id.

---

## Aba: barbeiro_agendas

Configura a agenda e janela de atendimento de cada barbeiro.

Campos:

* barbeiro_id;
* google_calendar_id;
* hora_inicio;
* hora_fim;
* intervalo_minutos;
* ativo.

Exemplo:

barbeiro_id: 1
google_calendar_id: [carlos@barbearia.com](mailto:carlos@barbearia.com)
hora_inicio: 09:00
hora_fim: 18:00
intervalo_minutos: 30
ativo: true

---

# Google Calendar

O Google Calendar será usado apenas para leitura de ocupações.

O app deve consultar os eventos ocupados da agenda do barbeiro para a data selecionada.

O app não deve criar, editar ou remover eventos.

---

# Cálculo de Disponibilidade

## Entrada

Para calcular horários disponíveis, o app precisa de:

* duração do serviço;
* hora inicial de atendimento;
* hora final de atendimento;
* intervalo entre horários;
* eventos ocupados da agenda;
* data selecionada.

## Processo

O app deve:

1. Gerar blocos de horário entre `hora_inicio` e `hora_fim`.
2. Considerar a duração do serviço.
3. Consultar eventos ocupados na agenda Google.
4. Remover horários que conflitam com eventos existentes.
5. Exibir somente horários livres.

## Exemplo

Configuração:

* Atendimento: 09:00 até 18:00
* Intervalo: 30 minutos
* Serviço: 30 minutos

Agenda ocupada:

* 10:00 até 11:00
* 14:30 até 15:00

Horários disponíveis:

* 09:00
* 09:30
* 11:00
* 11:30
* 12:00
* 12:30
* 13:00
* 13:30
* 14:00
* 15:00
* 15:30

---

# Requisitos Não Funcionais

## RNF-001

A aplicação deve ser desenvolvida com React.

## RNF-002

A aplicação deve utilizar TypeScript.

## RNF-003

A aplicação deve ser mobile-first.

## RNF-004

A aplicação deve ser responsiva.

## RNF-005

A aplicação deve ter carregamento rápido.

## RNF-006

O código deve ser simples, modular e fácil de evoluir.

## RNF-007

A aplicação deve separar:

* componentes visuais;
* serviços de leitura de dados;
* regras de cálculo de disponibilidade;
* tipos TypeScript.

---

# Diretrizes Visuais

O Oakbeard.app deve ter identidade visual:

* rústica;
* masculina;
* premium;
* tradicional;
* inspirada em barbearias clássicas.

A estética deve remeter a:

* madeira;
* carvalho;
* barba;
* navalha;
* couro;
* tradição;
* elegância;
* cuidado pessoal masculino.

---

# Mensagens e Comunicação

O app deve usar o termo:

“Solicitar agendamento”

E evitar o termo:

“Confirmar agendamento”

Mensagem sugerida na tela final:

Sua solicitação será enviada para a barbearia via WhatsApp.
O agendamento será confirmado manualmente pela equipe.

---

# Fora do Escopo da V1

Não faz parte da V1:

* autenticação;
* área do barbeiro;
* painel administrativo;
* backend próprio;
* escrita em Google Sheets;
* escrita em Google Calendar;
* banco de dados;
* pagamento online;
* integração com PIX;
* notificações push;
* envio automático de e-mail;
* cancelamento pelo app;
* reagendamento pelo app;
* múltiplas barbearias;
* avaliações;
* cupons;
* programa de fidelidade.
