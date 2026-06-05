# barbon.app - Critérios de Aceitação - V1

## Objetivo

Este documento define os critérios de aceitação da versão 1 do barbon.app.

Uma funcionalidade somente pode ser considerada concluída quando todos os critérios descritos neste documento forem atendidos.

---

# CA-001 - Carregamento Inicial

## Cenário

Cliente acessa o aplicativo.

## Critérios

* Deve exibir o Header do barbon.app.
* Deve exibir as informações da barbearia.
* Deve carregar os dados do Google Sheets.
* Não deve exibir erros no console.
* Deve exibir loading enquanto os dados são carregados.

## Resultado Esperado

O usuário visualiza corretamente as informações da plataforma e da barbearia.

---

# CA-002 - Seleção de Serviço

## Cenário

Cliente deseja escolher um serviço.

## Critérios

* Todos os serviços ativos devem ser exibidos.
* Nome do serviço deve ser exibido.
* Descrição deve ser exibida.
* Preço deve ser exibido.
* Duração deve ser exibida.
* Apenas um serviço pode ser selecionado.
* O serviço selecionado deve possuir destaque visual.

## Resultado Esperado

O cliente consegue escolher um serviço sem ambiguidades.

---

# CA-003 - Seleção de Barbeiro

## Cenário

Cliente escolheu um serviço.

## Critérios

* Devem ser exibidos apenas barbeiros compatíveis com o serviço.
* Nome do barbeiro deve ser exibido.
* Descrição do barbeiro deve ser exibida.
* Foto deve ser exibida quando disponível.
* Apenas um barbeiro pode ser selecionado.

## Resultado Esperado

O cliente consegue escolher um barbeiro apto a realizar o serviço.

---

# CA-004 - Seleção de Data

## Cenário

Cliente escolheu um barbeiro.

## Critérios

* Datas passadas não podem ser selecionadas.
* Data atual pode ser selecionada.
* Datas futuras podem ser selecionadas.

## Resultado Esperado

O cliente consegue escolher uma data válida.

---

# CA-005 - Consulta de Disponibilidade

## Cenário

Cliente escolheu um barbeiro e uma data.

## Critérios

* O app deve consultar a agenda Google correspondente.
* O app deve considerar a configuração da agenda do barbeiro.
* O app deve considerar a duração do serviço.
* O app deve remover horários em conflito com eventos existentes.
* Não deve exibir horários indisponíveis.

## Resultado Esperado

A lista de horários deve refletir a disponibilidade real da agenda.

---

# CA-006 - Seleção de Horário

## Cenário

Cliente visualiza horários disponíveis.

## Critérios

* Apenas horários livres devem ser exibidos.
* Apenas um horário pode ser selecionado.
* O horário selecionado deve possuir destaque visual.

## Resultado Esperado

O cliente consegue escolher um horário válido.

---

# CA-007 - Dados do Cliente

## Cenário

Cliente informa seus dados.

## Critérios

### Nome

* Campo obrigatório.
* Deve possuir pelo menos 3 caracteres.

### Telefone

* Campo obrigatório.
* Deve aceitar formato brasileiro.
* Deve impedir envio vazio.

## Resultado Esperado

Os dados mínimos para contato são coletados.

---

# CA-008 - Revisão da Solicitação

## Cenário

Cliente chegou à etapa final.

## Critérios

Devem ser exibidos:

* Serviço.
* Preço.
* Duração.
* Barbeiro.
* Data.
* Horário.
* Nome.
* Telefone.

## Resultado Esperado

O cliente consegue revisar todas as informações antes do envio.

---

# CA-009 - Aviso de Confirmação

## Cenário

Cliente está prestes a solicitar o agendamento.

## Critérios

O sistema deve exibir a mensagem:

```txt
Sua solicitação será enviada para a barbearia.

O agendamento será confirmado manualmente pela equipe.
```

## Resultado Esperado

O usuário entende que ainda não possui um agendamento confirmado.

---

# CA-010 - Integração com WhatsApp

## Cenário

Cliente clica em "Solicitar Agendamento".

## Critérios

* O WhatsApp deve ser aberto.
* A mensagem deve ser preenchida automaticamente.
* O número da barbearia deve ser obtido do Google Sheets.

## Resultado Esperado

O cliente consegue enviar sua solicitação sem digitar novamente as informações.

---

# CA-011 - Conteúdo da Mensagem

## Cenário

Mensagem é gerada.

## Critérios

A mensagem deve conter:

* Nome do cliente.
* Telefone do cliente.
* Serviço.
* Preço.
* Barbeiro.
* Data.
* Horário.

## Exemplo

```txt
Olá!

Gostaria de solicitar um agendamento.

Nome: João da Silva
Telefone: (11) 99999-9999

Serviço: Corte Masculino
Preço: R$ 45,00

Barbeiro: Carlos Silva

Data: 15/07/2026
Horário: 14:30

Aguardo confirmação.
```

## Resultado Esperado

A barbearia recebe todas as informações necessárias.

---

# CA-012 - Tratamento de Erros

## Cenário

Falha ao carregar dados.

## Critérios

* Não exibir stack trace.
* Não exibir mensagens técnicas.
* Exibir mensagem amigável.
* Permitir tentar novamente quando possível.

## Resultado Esperado

O usuário entende que ocorreu um problema sem ser exposto a detalhes técnicos.

---

# CA-013 - Responsividade

## Cenário

Acesso em dispositivo móvel.

## Critérios

* Todas as telas devem ser utilizáveis em smartphones.
* Não deve existir rolagem horizontal.
* Botões devem possuir área adequada para toque.

## Resultado Esperado

Boa experiência em dispositivos móveis.

---

# CA-014 - Performance

## Cenário

Uso normal do aplicativo.

## Critérios

* Dados devem ser carregados apenas quando necessário.
* Não realizar consultas duplicadas sem necessidade.
* Navegação entre etapas deve ser fluida.

## Resultado Esperado

Aplicação rápida e responsiva.

---

# CA-015 - Fluxo Completo

## Cenário

Cliente realiza uma solicitação completa.

## Critérios

O usuário deve conseguir:

1. Escolher serviço.
2. Escolher barbeiro.
3. Escolher data.
4. Escolher horário.
5. Informar nome.
6. Informar telefone.
7. Revisar os dados.
8. Abrir o WhatsApp.

Sem erros.

## Resultado Esperado

O fluxo completo de solicitação de agendamento funciona do início ao fim.

---

# Definição de Pronto (Definition of Done)

A versão 1 somente poderá ser considerada concluída quando:

* Todos os critérios deste documento forem atendidos.
* Não existirem erros bloqueantes.
* O fluxo principal funcionar integralmente.
* O WhatsApp abrir corretamente.
* A disponibilidade for calculada corretamente.
* A interface estiver responsiva.
* Não existirem erros visíveis ao usuário.
