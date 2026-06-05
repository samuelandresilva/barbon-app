# barbon.app - Plano de Implementação

## Objetivo

Dividir a implementação em pequenas etapas independentes para reduzir alucinações da IA e facilitar validações frequentes.

Cada etapa deve ser concluída, revisada e validada antes do início da próxima.

---

# Estratégia

## Regra Principal

A IA nunca deve implementar mais de uma etapa por vez.

Ao concluir uma etapa:

1. Apresentar o resultado.
2. Aguardar validação.
3. Prosseguir para a próxima etapa.

---

# Fase 01 - Bootstrap do Projeto

## Objetivo

Criar a estrutura inicial da aplicação.

---

## Escopo

Criar:

* projeto React;
* TypeScript;
* Vite;
* Tailwind;
* React Router.

Criar estrutura de diretórios definida em:

```txt
04-technical-architecture.md
```

---

## Entregáveis

```txt
src/
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

## Critério de Conclusão

Aplicação inicia corretamente.

---

# Fase 02 - Modelos e Tipos

## Objetivo

Criar todos os modelos TypeScript.

---

## Escopo

Criar:

* Barbearia
* Servico
* Barbeiro
* BarbeiroServico
* AgendaBarbeiro
* EventoOcupado
* HorarioDisponivel
* SolicitacaoAgendamento

---

## Referência

```txt
03-data-model.md
```

---

## Critério de Conclusão

Todos os tipos compilam sem erros.

---

# Fase 03 - BookingContext

## Objetivo

Criar o estado global do fluxo.

---

## Escopo

Implementar:

```txt
BookingContext
```

Armazenando:

* serviço;
* barbeiro;
* data;
* horário;
* nome;
* telefone.

---

## Critério de Conclusão

Dados persistem durante navegação.

---

# Fase 04 - Layout Base

## Objetivo

Criar a estrutura visual comum.

---

## Escopo

Criar:

* Header barbon;
* Card da Barbearia;
* Container principal;
* Indicador de etapas.

---

## Critério de Conclusão

Layout base funcional.

---

# Fase 05 - Integração Google Sheets Mock

## Objetivo

Implementar fonte de dados simulada.

---

## Escopo

Criar:

```txt
googleSheetsService.ts
```

Inicialmente utilizando dados mockados.

---

## Critério de Conclusão

Dados carregam corretamente.

---

# Fase 06 - Home

## Objetivo

Implementar tela inicial.

---

## Escopo

Criar:

```txt
HomePage
```

Exibindo:

* Header;
* Dados da barbearia;
* Botão iniciar.

---

## Critério de Conclusão

Navegação para seleção de serviço.

---

# Fase 07 - Seleção de Serviço

## Objetivo

Implementar escolha de serviço.

---

## Escopo

Criar:

* ServicePage;
* ServiceCard.

---

## Critério de Conclusão

Serviço selecionado é salvo no contexto.

---

# Fase 08 - Seleção de Barbeiro

## Objetivo

Implementar escolha de barbeiro.

---

## Escopo

Criar:

* BarberPage;
* BarberCard.

---

## Critério de Conclusão

Barbeiro selecionado é salvo.

---

# Fase 09 - Seleção de Data

## Objetivo

Implementar calendário.

---

## Escopo

Criar:

* DatePage;
* componente de calendário.

---

## Critério de Conclusão

Data selecionada é salva.

---

# Fase 10 - Google Calendar Mock

## Objetivo

Simular disponibilidade.

---

## Escopo

Criar:

```txt
googleCalendarService.ts
```

Retornando eventos fictícios.

---

## Critério de Conclusão

Eventos simulados retornam corretamente.

---

# Fase 11 - Regra de Disponibilidade

## Objetivo

Implementar cálculo de horários.

---

## Escopo

Criar regra:

```txt
generateAvailableSlots()
```

---

## Referência

```txt
03-data-model.md
```

---

## Critério de Conclusão

Horários livres calculados corretamente.

---

# Fase 12 - Seleção de Horário

## Objetivo

Exibir horários calculados.

---

## Escopo

Criar:

* TimePage.

---

## Critério de Conclusão

Horário selecionado é salvo.

---

# Fase 13 - Dados do Cliente

## Objetivo

Implementar formulário.

---

## Escopo

Criar:

* CustomerPage.

Campos:

* nome;
* telefone.

---

## Critério de Conclusão

Validações funcionando.

---

# Fase 14 - Revisão

## Objetivo

Criar tela de resumo.

---

## Escopo

Criar:

* ReviewPage.

---

## Critério de Conclusão

Todas as informações exibidas corretamente.

---

# Fase 15 - WhatsApp

## Objetivo

Gerar mensagem.

---

## Escopo

Criar:

```txt
whatsappService.ts
```

---

## Critério de Conclusão

URL gerada corretamente.

---

# Fase 16 - Fluxo Completo

## Objetivo

Validar integração entre etapas.

---

## Escopo

Executar fluxo completo.

---

## Critério de Conclusão

Usuário consegue:

* selecionar serviço;
* selecionar barbeiro;
* selecionar data;
* selecionar horário;
* preencher dados;
* abrir WhatsApp.

---

# Fase 17 - Integração Real Google Sheets

## Objetivo

Substituir mocks.

---

## Escopo

Implementar leitura real.

---

## Critério de Conclusão

Dados carregados da planilha.

---

# Fase 18 - Integração Real Google Calendar

## Objetivo

Substituir mocks.

---

## Escopo

Implementar consulta real.

---

## Critério de Conclusão

Disponibilidade baseada na agenda real.

---

# Fase 19 - Refinamento Visual

## Objetivo

Aplicar identidade visual barbon.

---

## Escopo

Ajustar:

* cores;
* tipografia;
* espaçamento;
* responsividade.

---

## Critério de Conclusão

Interface alinhada com a proposta premium da marca.

---

# Regra Final

A IA não deve iniciar uma fase sem concluir a anterior.

A IA deve sempre implementar a menor unidade possível de trabalho.
