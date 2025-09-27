# Challenge_Aura-SM
Pojeto do challenge para o HC

# Componente Principal: Rota Home do Portal de Auto-Atendimento

O código apresentado define o componente **`Home`**, que atua como a **página inicial** e o **painel de controle central** de um sistema de auto-atendimento (provavelmente focado em serviços de saúde). Sua principal função é apresentar ao usuário uma visão clara e **acessos rápidos** às funcionalidades mais importantes do portal.

---

## Implementação Técnica

O componente `Home` é construído em **React** e **TypeScript**, utilizando `react-router-dom` para navegação e ícones visuais (`react-icons/ci`).

### Estrutura de Dados e Estado

1.  **Tipagem:** É definida a interface **`FuncionalidadeType`** para garantir que cada item de serviço (cartão) siga um formato consistente, contendo `id`, `titulo`, `icone` (string), `descricao` e `link` de destino.
2.  **Estado:** O *hook* **`useState`** (`funcionalidades`) é usado para armazenar a lista de serviços que será renderizada na tela.
3.  **Carregamento:** O *hook* **`useEffect`** simula o carregamento dos dados. No código atual, ele carrega uma lista estática de quatro funcionalidades. Em um ambiente de produção, esta seria a área responsável por buscar dinamicamente os dados de uma **API** ou serviço de *backend*.

### Lógica de Renderização

1.  **Mapeamento de Ícones:** A função **`getIcon`** é crucial para a interface. Ela recebe o nome do ícone em *string* (e.g., `'calendar'`, `'user'`) e retorna o componente React de ícone correspondente (`CiCalendar`, `CiUser`), garantindo a correlação visual.
2.  **Exibição Dinâmica:** O corpo do componente mapeia o *array* `funcionalidades`, renderizando um cartão para cada item. Cada cartão é envolto pelo componente **`Link`** do React Router, transformando-o em um atalho direto para a rota de destino (`/consultas`, `/historico`, etc.).

---

## Funcionalidades de Acesso Rápido

A página é estruturada em torno de quatro cartões principais, que fornecem acesso imediato aos serviços centrais do portal:

* **Minhas Consultas:** Foco na **gestão de agendamentos**. Permite ao usuário visualizar consultas pendentes, além de realizar ações como confirmação e cancelamento.
* **Histórico Médico:** Proporciona a **consulta segura** aos dados de saúde do usuário, incluindo registros de consultas anteriores, diagnósticos e exames realizados.
* **Agendar Consulta:** Serve como o ponto de partida para o **início de um novo serviço**. Direciona o usuário para a interface de seleção de especialistas e horários.
* **Dados Pessoais:** Dedicado à **atualização do perfil**. Permite que o usuário mantenha suas informações de contato e cadastro sempre atualizadas.

### Design e Experiência do Usuário

O design da página utiliza técnicas de **layout responsivo** (grid de 1, 2 ou 3 colunas) para se adaptar a diferentes dispositivos. Cada cartão possui um **efeito visual de *hover***, indicando interatividade ao "levantar" ligeiramente, o que melhora a usabilidade e engajamento do usuário.

---

# Rota Agendar: Formulário de Nova Consulta

O componente **`Agendar`** define a interface de usuário (UI) e a lógica de *frontend* para que um paciente possa **solicitar o agendamento de uma nova consulta médica** dentro do sistema. Esta rota é dedicada exclusivamente à coleta das informações necessárias e ao envio desses dados para o servidor de *backend* através de uma API.

## Objetivo e Fluxo de Trabalho

O objetivo principal desta página é guiar o usuário na seleção de um médico, informar seus dados e escolher a data e hora desejadas para a consulta.

O fluxo de trabalho dentro do componente é o seguinte:

1.  **Carregamento de Dados:** Ao iniciar, o componente busca a **lista completa de médicos** (`/medicos`) na API. Essa lista é crucial para popular o campo de seleção (dropdown), permitindo que o usuário escolha o profissional desejado.
2.  **Preenchimento do Formulário:** O usuário preenche os campos obrigatórios: a seleção do médico, seu nome completo, e a data e hora da consulta.
3.  **Validação:** O formulário é controlado pelo *hook* **`useForm`** (`react-hook-form`), que gerencia o estado e as regras de validação. Ele garante que todos os campos obrigatórios sejam preenchidos antes da submissão.
4.  **Submissão (POST):** Após a validação bem-sucedida, a função **`onSubmit`** é acionada. Ela envia os dados da nova consulta via **método `POST`** para o *endpoint* `/consultas` da API.
5.  **Feedback e Redirecionamento:** Se a API retornar sucesso, o usuário recebe uma **mensagem de confirmação**. Em seguida, um *timer* é iniciado para **redirecioná-lo** para a página ` Minhas Consultas` (`/consultas`), onde ele poderá visualizar o agendamento recém-criado. Em caso de falha, uma mensagem de erro é exibida.

## Implementação Técnica Detalhada

### Tecnologias Principais

* **React e TypeScript:** Usado para criar o componente funcional e garantir a tipagem segura dos dados (`MedicoType`, `ConsultaType`).
* **`react-router-dom`:** Utilizado para navegação (`useNavigate`) entre as rotas do aplicativo.
* **`react-hook-form`:** Responsável por simplificar a criação, validação e submissão do formulário.

### Gerenciamento de Estado e API

* **`useEffect` (Carregamento):** O *hook* é usado para realizar a **primeira chamada de API** (`/medicos`) logo na montagem do componente. O resultado é armazenado no estado `medicos`.
* **`useState` (Controle):** O estado **`medicos`** armazena a lista de profissionais disponíveis, e **`statusMessage`** é usado para exibir mensagens de sucesso ou erro ao usuário.
* **Comunicação com o Backend:** A comunicação com o *backend* é feita por meio de *fetch* para a URL base (`http://localhost:3001`), com tratamento robusto para sucesso (`response.ok`) e falhas de rede ou da API.

### Campos do Formulário

O formulário é composto pelos seguintes campos obrigatórios, que utilizam o padrão de registro do `react-hook-form`:

* **Médico (Dropdown):** Seleção do profissional. Popula-se dinamicamente com a lista de médicos buscada na API.
* **Nome do Paciente (Texto):** O nome da pessoa que será atendida.
* **Data (Seletor de Data):** A data escolhida para o agendamento.
* **Hora (Seletor de Hora):** O horário específico da consulta.

Este componente garante que o processo de agendamento seja eficiente, validado no *frontend* e transmitido corretamente para o *backend* para registro.

# Rota Consultas: Minhas Consultas Agendadas

O componente **`Consultas`** é a página central de **gerenciamento e visualização** de todos os agendamentos de um usuário no portal. Seu objetivo principal é listar as consultas, fornecer detalhes essenciais e permitir ações diretas, como a edição e o cancelamento.

---

## Implementação Técnica e Fluxo de Dados

A rota realiza uma série de operações assíncronas para garantir que todos os dados necessários sejam exibidos de forma completa e coerente.

### 1. Carregamento de Dados Múltiplos

O *hook* **`useEffect`** coordena duas chamadas de API simultâneas ao montar o componente:

* **Busca de Consultas (`/consultas`):** Carrega a lista de todos os agendamentos registrados no *backend*. O resultado é armazenado no estado **`consultas`**.
* **Busca de Médicos (`/medicos`):** Carrega a lista completa de profissionais. Esta lista é crucial para **correlacionar** o `medicoId` (presente nos dados da consulta) com o **nome e especialidade** do médico, que são informações essenciais para o usuário.

### 2. Mapeamento de Dados

Após carregar os médicos, é criado um mapa (`medicosMap`) para armazenar o nome e a especialidade de cada médico, indexado pelo seu `id`. Isso permite que, na renderização, a consulta exiba o **nome completo do médico** em vez de apenas o ID.

### 3. Gerenciamento de Estado

Três estados são utilizados para controlar a interface do usuário:

* **`consultas`:** Armazena a lista principal de agendamentos.
* **`loading`:** Indica que os dados estão sendo buscados. É usado para exibir uma **mensagem de carregamento** enquanto a API responde.
* **`error`:** Armazena e exibe qualquer **mensagem de erro** de *network* ou API, caso o carregamento falhe.

---

## Funcionalidades de Exibição e Interatividade

A rota renderiza uma lista de cartões, onde cada cartão representa uma consulta agendada.

### Visualização dos Agendamentos

Cada cartão de consulta exibe as seguintes informações de forma clara:

* **Médico e Especialidade:** O nome do profissional é exibido junto à sua área de atuação, utilizando o mapeamento de médicos carregado previamente.
* **Paciente:** O nome do paciente associado à consulta.
* **Data e Hora:** Os detalhes exatos do agendamento.
* **Status Dinâmico:** A função **`getStatus`** calcula se a consulta está no futuro (**'Confirmada'**) ou se já ocorreu no passado (**'Realizada'**), exibindo essa informação com um rótulo visualmente distinto.

### Ações do Usuário

Abaixo de cada consulta, o usuário tem acesso a duas ações principais:

1.  **Editar:** O botão "Editar" é um **`Link`** que direciona para a rota de edição (`/editar/consulta/:id`), permitindo que o usuário modifique os detalhes do agendamento.
2.  **Cancelar:** O botão "Cancelar" aciona a função **`handleDelete`**, que executa uma chamada de API usando o **método `DELETE`** no *endpoint* específico da consulta (`/consultas/:id`). Após a exclusão bem-sucedida, o estado **`consultas`** é atualizado para remover o item cancelado, refletindo a mudança na interface instantaneamente.

---

# Rota EditarConsulta: Modificação de Agendamentos

O componente **`EditarConsulta`** é a rota de **Atualização (*Update*)** do portal. Sua principal função é permitir que o usuário modifique os detalhes de uma consulta que já está agendada, como trocar o médico, ajustar a data ou corrigir o horário.

## Fluxo de Carregamento e Pré-Preenchimento

O componente é acessado através do `id` da consulta (usando `useParams`) e foi construído para ser um **formulário pré-preenchido**:

1.  **Carga Dupla de Dados:** Um único `useEffect` busca a lista completa de **médicos** (para o *dropdown* de seleção) e os **dados da consulta específica** (`GET /consultas/:id`).
2.  **Preparação do Formulário:** O *hook* `reset` do **`react-hook-form`** é utilizado para injetar os dados da consulta carregada nos campos correspondentes, permitindo que o usuário veja as informações atuais antes de alterá-las.

## Transação de Atualização (`PUT`)

A lógica de submissão (**`onSubmit`**) gerencia a transação de atualização:

* **Validação:** O formulário valida se todos os campos obrigatórios estão preenchidos corretamente.
* **Requisição:** Em caso de sucesso na validação, ele envia os dados modificados através do método **`PUT`** para o *endpoint* da consulta específica (`/consultas/:id`).
* **Feedback:** Um componente auxiliar **`StatusMessage`** exibe mensagens claras de sucesso ou erro para o usuário.
* **Redirecionamento:** Após a confirmação bem-sucedida da API, o usuário é automaticamente enviado de volta para a tela **`Consultas`**, onde o agendamento já aparece com as informações atualizadas.

---

# Resumo Final do Portal e Cobertura CRUD

Com a inclusão da rota **`EditarConsulta`**, o sistema atinge a **cobertura completa das quatro operações fundamentais do CRUD** (Create, Read, Update, Delete) no gerenciamento de agendamentos, elevando-o a um sistema de gestão robusto.

## Complementaridade dos Componentes

Os componentes trabalham em conjunto para cobrir o ciclo de vida completo do agendamento:

* **`Home`:** Centraliza e direciona o usuário para as áreas de criação e gestão.
* **`Agendar`:** Responsável pela **Criação** (`POST`) de novos registros.
* **`Consultas`:** Permite a **Leitura** (`GET`) de agendamentos ativos, o **Cancelamento** (`DELETE`) de agendamentos e serve como ponto de partida para a **Atualização** (link para `EditarConsulta`).
* **`EditarConsulta`:** Executa a função de **Atualização** (`PUT`) do agendamento.
* **`Historico`:** Focado na **Leitura** e **Análise** de registros passados, com funcionalidade de filtro por data.

## Tecnologias Chave em Resumo

O portal utiliza uma arquitetura moderna baseada nos seguintes pilares:

* **Base:** **React** e **TypeScript** para desenvolvimento de componentes tipados.
* **Navegação:** **`react-router-dom`** gerencia rotas, links, parâmetros (`useParams`) e redirecionamentos programáticos (`useNavigate`).
* **Formulários:** **`react-hook-form`** é a solução para gerenciar o estado, a validação e, crucialmente, o **pré-preenchimento** dos dados existentes na edição.
* **Comunicação:** O método **`fetch`** implementa todas as requisições à API, cobrindo o ciclo completo do agendamento: `POST` (Criar), `GET` (Ler), `PUT` (Atualizar) e `DELETE` (Cancelar).

# Rota Histórico: Visualizador de Registros Médicos

O componente **`Historico`** é a interface dedicada a apresentar ao usuário seu **histórico completo de atendimentos médicos**. Ele foi projetado para carregar todos os registros de consultas passadas, correlacioná-los com as informações dos médicos responsáveis e oferecer uma ferramenta eficiente para a busca e filtragem por período.

---

## Estrutura e Carregamento de Dados

O componente utiliza o **React** com **TypeScript** e gerencia múltiplos estados para garantir que a exibição dos dados seja precisa e completa.

### Carga Inicial de Dados

Um *hook* **`useEffect`** realiza a busca de dados de forma assíncrona, sendo o ponto de partida para popular a página:

1.  **Busca de Histórico:** Carrega todos os registros de consultas passadas (`/historico`), que são armazenados no estado **`historico`**.
2.  **Busca de Médicos:** Carrega a lista completa de profissionais (`/medicos`).
3.  **Mapeamento:** O componente transforma a lista de médicos em um objeto mapa (`medicos`) indexado pelo `id` do profissional. Essa correlação é vital para que a tabela de histórico exiba o **nome e a especialidade** do médico, em vez de apenas um ID.

### Lógica de Filtragem

A página implementa a funcionalidade de filtro por intervalo de datas de forma reativa:

* **Estados de Filtro:** Os campos de entrada de data (`dataInicial` e `dataFinal`) controlam seus respectivos estados.
* **Filtro Dinâmico:** Um segundo **`useEffect`** monitora as alterações no histórico e nas datas de filtro. Ele recalcula o *array* **`historicoFiltrado`** sempre que as datas são alteradas.
* **Processamento de Data:** A lógica converte as *strings* de data para objetos `Date` de JavaScript para realizar comparações precisas, permitindo que o usuário visualize somente os registros dentro do período especificado.

## Apresentação e Interatividade

A interface foca na clareza, utilizando uma estrutura de tabela para exibir dados estruturados.

### Controles de Período

No topo da seção, há um painel de filtros que contém dois campos de entrada do tipo *date*, permitindo que o usuário insira a data de início e a data final desejadas para a busca.

### Tabela Principal

O histórico é apresentado em formato tabular com as seguintes colunas essenciais:

* **Data:** O dia em que a consulta ocorreu.
* **Médico e Especialidade:** O nome e a área de atuação do profissional que realizou o atendimento.
* **Diagnóstico:** O sumário ou a conclusão principal registrada.
* **Ações:** Um botão "Ver Detalhes" sugere a funcionalidade futura de visualizar o relatório médico completo de forma individualizada.

A tabela é populada pelo *array* **`historicoFiltrado`**, garantindo que apenas os dados que se enquadram nos critérios de data do usuário sejam exibidos.

# Visão Geral e Complementaridade do Portal de Saúde

O conjunto de componentes analisados (`Home`, `Agendar`, `Consultas`, e `Historico`) forma um sistema coeso de **Portal de Auto-Atendimento Médico**. Eles se complementam ao mapear o ciclo completo da jornada do paciente, desde a primeira navegação até o gerenciamento e consulta de seus registros de saúde.

---

# Visão Geral e Complementaridade do Portal de Saúde

O conjunto de componentes analisados (**`Home`**, **`Agendar`**, **`Consultas`**, **`Historico`** e **`EditarConsulta`**) forma um sistema coeso de **Portal de Auto-Atendimento Médico**. Eles se complementam ao mapear o ciclo completo da jornada do paciente, desde a primeira navegação até o gerenciamento e consulta de seus registros de saúde.

## O Fluxo Integrado dos Componentes

O portal foi projetado para guiar o usuário de forma lógica através de suas necessidades médicas:

1.  Ponto de Partida e Navegação: Componente `Home`
O **`Home`** atua como o painel principal e agregador. Ele centraliza os serviços e fornece os links de navegação essenciais. Sua função é direcionar o usuário para as áreas de criação de serviço (`Agendar`) e gerenciamento de dados (`Consultas` e `Historico`), unindo todas as funcionalidades em uma única tela de fácil acesso.

2.  Criação de Serviço: Componente `Agendar`
A rota **`Agendar`** é a interface transacional. Ela busca a lista de médicos (`GET /medicos`) e utiliza um formulário robusto (`react-hook-form`) para coletar os dados de uma nova consulta. Após a submissão bem-sucedida (`POST /consultas`), o componente redireciona o usuário para a página `Consultas`, confirmando o ciclo de agendamento.

3.  Gestão Ativa, Modificação e Visualização: `Consultas`, **`EditarConsulta`** e `Historico`
Estas rotas lidam com a gestão do ciclo de vida dos agendamentos, cobrindo o ciclo completo de **CRUD** (Criação, Leitura, **Atualização** e Exclusão):

* **`Consultas` (Consultas Ativas):** Focado no futuro e na interação ativa. Ele busca as consultas (`GET /consultas`) e a lista de médicos, permitindo ao usuário **cancelar agendamentos** (`DELETE /consultas/:id`) e fornece o link para a **edição**. Ele exibe os dados criados pelo componente `Agendar`.

* **`EditarConsulta` (Atualização/Update):** Este componente é o responsável por toda a lógica de **modificação de agendamentos**. Ele utiliza `useParams` para obter o ID da consulta e um `useEffect` para carregar o registro (`GET /consultas/:id`) e **pré-preencher** o formulário. O envio de dados é feito através do método **`PUT`**, garantindo que as alterações sejam salvas. Após a atualização, ele redireciona o usuário para a tela `Consultas`.

* **`Historico` (Consultas Passadas):** Focado na análise e consulta de registros já concluídos. Ele busca o histórico (`GET /historico`), cruza as informações com os dados dos médicos, e implementa uma poderosa lógica de **filtragem dinâmica por período**, tornando mais fácil a localização de registros passados.

## Resumo das Ferramentas e Tecnologias

O sistema é construído sobre uma base moderna de desenvolvimento *frontend*, garantindo segurança, usabilidade e eficiência na comunicação com o *backend*.

Tecnologias de Base: **React** e **TypeScript** formam a estrutura do código, fornecendo componentes reativos e tipagem rigorosa para evitar erros.

Gerenciamento de Fluxo: **`react-router-dom`** é essencial para a navegação (links), extração de **parâmetros de rota** (`useParams` em `EditarConsulta`) e o controle de fluxo (redirecionamento com `useNavigate`).

Comunicação com API (CRUD): O portal utiliza chamadas `fetch` para realizar as quatro operações básicas: Criação (`POST` em `Agendar`), Leitura (`GET` em todas as páginas), **Atualização** (`PUT` em `EditarConsulta`), e Exclusão (`DELETE` em `Consultas`).

Usabilidade: **`react-hook-form`** simplifica a coleta de dados e a validação em `Agendar` e, de forma crítica, lida com o **pré-preenchimento** e a validação do formulário em **`EditarConsulta`**, enquanto os *hooks* `useEffect` e `useState` são usados em todas as rotas para gerenciar o estado da aplicação, os dados das APIs e as lógicas de filtro.

---

# Informação sobre a Aba "Dados Pessoais"

Observação importante sobre a aba **"Dados Pessoais"** está visível na navegação, mas sua funcionalidade ainda não está implementada. A construção completa dessa funcionalidade, incluindo a edição e visualização dos dados do usuário, está planejada para ser desenvolvida na **próxima *Sprint***.

### Motivo da Manutenção da Rota

Embora ainda não esteja operacional, mantivemos a aba "Dados Pessoais" no menu com um objetivo específico: demonstrar o tratamento de rotas inválidas ou desconhecidas.

Ao clicar em "Dados Pessoais", o *framework* de roteamento encaminha o usuário para uma rota que, propositalmente, não faz parte do nosso sistema de **(SPA)**. Isso permite que você visualize o nosso componente de **"Página Não Encontrada" (Erro 404)**.

Este comportamento confirma que o sistema de roteamento está configurado corretamente para identificar e tratar situações onde o usuário tenta acessar uma URL que não é válida em nossa aplicação.