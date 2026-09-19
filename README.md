# NEKFORT Connect

NEKFORT SERVICE DESK — PROMPT MESTRE

Crie uma aplicação web profissional chamada NEKFORT SERVICE DESK.

O sistema será uma plataforma própria da NEKFORT TECNOLOGIA INTELIGENTE, destinada à gestão profissional de:

Help Desk;

Suporte técnico;

Manutenção preventiva e corretiva;

Gestão de clientes;

Gestão de contratos recorrentes;

Gestão de equipamentos/ativos;

Gestão de visitas técnicas;

Checklists;

CFTV;

Redes e infraestrutura;

Controle de acesso;

Portões automáticos;

Orçamentos e serviços adicionais;

Relatórios;

Futuro monitoramento remoto dos computadores através de um agente.

O sistema deve possuir aparência de software profissional de gestão empresarial/RMM/Help Desk, com interface moderna, limpa, responsiva e preparada para crescimento.

NÃO criar apenas uma landing page ou protótipo visual.

Criar uma aplicação funcional, com autenticação, banco de dados, CRUDs, relacionamentos, permissões, filtros, pesquisa, dashboards e fluxos reais.

1. IDENTIDADE DO SISTEMA

Nome:

NEKFORT SERVICE DESK

Empresa:

NEKFORT TECNOLOGIA INTELIGENTE

Subtítulo:

Help Desk • Monitoramento • Manutenção • Segurança Eletrônica

Criar identidade visual profissional e tecnológica.

A interface deve transmitir uma empresa de tecnologia profissional, semelhante à qualidade visual de sistemas SaaS empresariais.

Não utilizar aparência de template genérico.

2. ARQUITETURA

Utilizar uma arquitetura organizada e escalável.

Preparar o sistema para futura evolução fora do Lovable, inclusive para desenvolvimento posterior no Antigravity.

Separar claramente:

Frontend;

Banco de dados;

Autenticação;

Regras de negócio;

API;

Módulo de monitoramento futuro.

Utilizar banco relacional adequado, preferencialmente Supabase/PostgreSQL quando disponível.

Não criar dados fictícios permanentes como substituição do banco de dados.

Os dados cadastrados pelo usuário devem permanecer após recarregar a página e após novo login.

3. AUTENTICAÇÃO

Criar autenticação segura.

Perfis:

ADMINISTRADOR

Acesso total.

Pode:

cadastrar usuários;

editar usuários;

cadastrar clientes;

cadastrar contratos;

cadastrar equipamentos;

abrir e editar chamados;

atribuir técnicos;

criar checklists;

criar orçamentos;

visualizar relatórios;

configurar categorias;

configurar prioridades;

configurar SLA;

acessar monitoramento;

visualizar informações financeiras.

TÉCNICO

Pode:

visualizar chamados atribuídos;

atualizar chamados;

registrar diagnóstico;

registrar solução;

realizar check-in/check-out de visitas;

preencher checklists;

adicionar fotos;

registrar materiais;

visualizar ativos;

visualizar informações técnicas necessárias.

Não pode alterar configurações administrativas ou informações financeiras sem permissão.

ATENDENTE

Pode:

cadastrar clientes;

abrir chamados;

acompanhar chamados;

agendar visitas;

acompanhar contratos.

CLIENTE

Criar futuramente portal do cliente.

O cliente poderá:

abrir chamados;

acompanhar seus chamados;

visualizar status;

solicitar atendimento;

acompanhar visitas;

consultar informações permitidas.

4. DASHBOARD

Criar dashboard principal profissional.

Exibir cards:

Chamados abertos;

Chamados críticos;

Chamados em atendimento;

Chamados aguardando cliente;

Chamados resolvidos;

Visitas de hoje;

Visitas da semana;

Contratos ativos;

Contratos próximos do vencimento;

Equipamentos online;

Equipamentos offline;

Alertas de monitoramento;

Manutenções preventivas próximas.

Criar gráficos:

Chamados por período;

Chamados por categoria;

Chamados por prioridade;

Chamados por técnico;

Tempo médio de atendimento;

Contratos ativos;

Serviços realizados.

Criar filtros por:

período;

cliente;

técnico;

status;

prioridade.

5. CLIENTES

Criar módulo completo de clientes.

Campos:

ID;

Tipo: Pessoa Física/Pessoa Jurídica;

Razão social/nome;

Nome fantasia;

CPF/CNPJ;

Inscrição estadual;

Telefone;

WhatsApp;

E-mail;

Endereço;

Número;

Complemento;

Bairro;

Cidade;

Estado;

CEP;

Observações;

Status.

Permitir múltiplos locais/unidades para o mesmo cliente.

Exemplo:

CLIENTE: Escola XYZ

UNIDADE 01 — Sede
UNIDADE 02 — Anexo

Cada unidade poderá possuir:

contatos;

equipamentos;

contratos;

chamados;

visitas;

histórico.

6. CONTATOS

Permitir vários contatos por cliente.

Campos:

Nome;

Cargo/função;

Telefone;

WhatsApp;

E-mail;

Principal: sim/não;

Observações.

7. ATIVOS / EQUIPAMENTOS

Criar módulo de inventário técnico.

Categorias:

Desktop;

Notebook;

Servidor;

Impressora;

Roteador;

Switch;

Access Point;

Rack;

Nobreak;

DVR;

NVR;

Câmera;

Controle de acesso;

Fechadura;

Motor de portão;

Central;

Sensor;

Outro.

Campos:

Código do ativo;

Patrimônio;

Cliente;

Unidade;

Setor;

Categoria;

Fabricante;

Modelo;

Número de série;

Endereço IP;

MAC Address;

Sistema operacional;

Data de aquisição;

Garantia;

Status;

Localização;

Observações.

Status:

Ativo;

Em manutenção;

Inativo;

Baixado;

Perdido.

Cada equipamento deve possuir uma página própria com:

informações;

histórico;

chamados;

manutenções;

visitas;

documentos;

fotos;

alertas;

histórico de alterações.

8. HELP DESK / CHAMADOS

Criar módulo completo de chamados.

Cada chamado deverá possuir:

Número automático;

Cliente;

Unidade;

Solicitante;

Categoria;

Subcategoria;

Equipamento relacionado;

Técnico responsável;

Prioridade;

Status;

Data/hora de abertura;

Prazo/SLA;

Data/hora de atendimento;

Data/hora de resolução;

Descrição;

Diagnóstico;

Solução;

Observações;

Anexos;

Fotos;

Histórico.

Status:

Novo

Em triagem

Agendado

Em atendimento

Aguardando cliente

Aguardando peça

Aguardando orçamento

Resolvido

Encerrado

Cancelado

Prioridades:

Baixa;

Normal;

Alta;

Crítica.

Criar número de chamado automático, por exemplo:

CH-2026-000001

9. SLA

Criar estrutura de SLA.

Permitir configurar tempo de primeira resposta e prazo de atendimento por prioridade.

Exemplo:

Baixa:
Primeira resposta: 8 horas

Normal:
Primeira resposta: 4 horas

Alta:
Primeira resposta: 2 horas

Crítica:
Primeira resposta: 1 hora

Esses valores devem ser configuráveis pelo administrador.

Exibir visualmente:

SLA dentro do prazo;

SLA próximo do vencimento;

SLA vencido.

Não considerar automaticamente o tempo como "horas úteis" sem criar configuração para isso.

Criar futuramente suporte para:

horário comercial;

feriados;

finais de semana.

10. CATEGORIAS DE CHAMADOS

Criar categorias:

INFORMÁTICA

Computador;

Notebook;

Windows;

Software;

Impressora;

Periféricos.

REDE

Internet;

Wi-Fi;

Switch;

Roteador;

Cabeamento;

Ponto de rede;

Infraestrutura.

CFTV

Câmera sem imagem;

DVR;

NVR;

Gravação;

Acesso remoto;

Cabeamento;

Alimentação.

CONTROLE DE ACESSO

Fechadura;

Controladora;

Leitor;

Botoeira;

Cadastro de usuário.

PORTÃO AUTOMÁTICO

Motor;

Controle remoto;

Sensor;

Placa;

Alimentação;

Acionamento.

Permitir ao administrador criar novas categorias e subcategorias.

11. VISITAS TÉCNICAS

Criar módulo de visitas.

Campos:

Número da visita;

Cliente;

Unidade;

Chamado relacionado;

Técnico;

Data;

Hora prevista;

Hora de chegada;

Hora de saída;

Status;

Motivo;

Observações.

Status:

Agendada;

Em deslocamento;

No local;

Finalizada;

Cancelada.

Criar botões:

INICIAR VISITA

Registrar automaticamente data/hora.

FINALIZAR VISITA

Registrar automaticamente data/hora.

Calcular duração da visita.

12. CHECK-IN E CHECK-OUT

Durante uma visita:

Registrar:

horário de chegada;

horário de saída;

técnico;

localização do atendimento quando tecnicamente disponível;

serviço executado;

observações;

fotos;

assinatura/aceite do cliente.

Não exigir localização obrigatoriamente.

13. CHECKLISTS

Criar sistema de checklists configuráveis.

O administrador poderá criar modelos.

Exemplos:

CHECKLIST — COMPUTADOR

Equipamento liga corretamente;

Sistema operacional inicia;

Armazenamento verificado;

Memória verificada;

Temperatura verificada;

Atualizações verificadas;

Antivírus verificado;

Conectividade verificada;

Limpeza realizada;

Teste final realizado.

CHECKLIST — REDE

Roteador verificado;

Switch verificado;

Internet testada;

Wi-Fi testado;

Cabos verificados;

Pontos de rede testados;

Identificação dos cabos;

Equipamentos organizados.

CHECKLIST — CFTV

Câmeras verificadas;

Imagem verificada;

Gravação verificada;

DVR/NVR verificado;

HD verificado;

Acesso remoto verificado;

Cabeamento verificado;

Fontes verificadas.

CHECKLIST — PORTÃO

Motor;

Placa;

Controle remoto;

Sensor;

Fim de curso;

Acionamento;

Alimentação;

Funcionamento geral.

Permitir criar novos modelos.

14. MANUTENÇÃO PREVENTIVA

Criar módulo de manutenção preventiva.

Permitir cadastrar:

Cliente;

Equipamento;

Tipo de manutenção;

Periodicidade;

Última manutenção;

Próxima manutenção;

Técnico responsável;

Checklist associado.

Periodicidades:

Mensal;

Bimestral;

Trimestral;

Semestral;

Anual;

Personalizada.

Criar alertas de manutenção próxima.

15. CONTRATOS

Criar módulo de contratos recorrentes.

Campos:

Número do contrato;

Cliente;

Unidade;

Data inicial;

Data final;

Valor mensal;

Dia de vencimento;

Status;

Descrição;

Serviços inclusos;

Equipamentos contemplados;

Quantidade de visitas previstas;

SLA;

Observações.

Status:

Ativo;

Em renovação;

Suspenso;

Encerrado;

Cancelado.

Permitir vincular:

clientes;

equipamentos;

chamados;

visitas;

serviços;

SLA.

16. EXEMPLO DE CONTRATO

Permitir cadastrar um contrato como:

CLIENTE:
Escola XYZ

PLANO:
Manutenção Tecnológica

VALOR:
R$ 1.500,00/mês

EQUIPAMENTOS:

4 desktops;

1 notebook;

rede;

infraestrutura;

CFTV;

portão automático.

SERVIÇOS:

manutenção de computadores;

manutenção de rede;

manutenção de CFTV;

manutenção de portão;

suporte remoto;

visitas técnicas.

SERVIÇOS ADICIONAIS:

novas câmeras;

ampliação de CFTV;

controle de acesso;

novos pontos de rede;

novas instalações;

peças;

materiais.

Esses serviços adicionais NÃO devem ser considerados automaticamente incluídos no contrato.

17. ORÇAMENTOS

Criar módulo de orçamento.

Campos:

Número;

Cliente;

Unidade;

Chamado;

Data;

Validade;

Status;

Itens;

Quantidade;

Descrição;

Valor unitário;

Desconto;

Total;

Observações.

Status:

Rascunho;

Enviado;

Em análise;

Aprovado;

Reprovado;

Expirado;

Cancelado.

Permitir transformar orçamento aprovado em serviço/chamado.

18. SERVIÇOS ADICIONAIS

Criar catálogo de serviços.

Exemplos:

Instalação de câmera;

Instalação de DVR/NVR;

Instalação de controle de acesso;

Instalação de fechadura;

Instalação de motor;

Instalação de ponto de rede;

Passagem de cabo;

Configuração de rede;

Manutenção de computador;

Formatação;

Instalação de software;

Instalação de impressora.

Permitir cadastro de novos serviços.

19. MATERIAIS

Criar cadastro de materiais utilizados em atendimentos.

Campos:

Código;

Descrição;

Categoria;

Unidade;

Custo;

Preço de venda;

Estoque;

Estoque mínimo.

Exemplos:

Cabo de rede;

Conector RJ45;

Fonte;

Conector BNC;

Balun;

HD;

SSD;

Memória;

Parafusos;

Canaleta.

O sistema deve permitir registrar material utilizado em um chamado ou visita.

20. RELATÓRIO TÉCNICO

Ao finalizar um atendimento, permitir gerar relatório técnico contendo:

Logo NEKFORT;

Dados do cliente;

Número do chamado;

Técnico;

Data;

Horário de chegada;

Horário de saída;

Equipamento;

Problema relatado;

Diagnóstico;

Serviço executado;

Materiais utilizados;

Pendências;

Recomendações;

Fotos;

Aceite do cliente.

Preparar o sistema para geração de PDF.

21. MONITORAMENTO — ESTRUTURA FUTURA

Criar o módulo MONITORAMENTO mesmo que a comunicação automática com os computadores seja implementada posteriormente.

Não simular dados reais como se fossem provenientes de computadores.

Criar a estrutura preparada para receber dados de um futuro agente NEKFORT.

Cada dispositivo monitorável deverá possuir:

ID;

Cliente;

Equipamento;

Nome do dispositivo;

Hostname;

IP;

Sistema operacional;

Última comunicação;

Status;

CPU;

RAM;

Disco;

Temperatura quando disponível;

Versão do agente.

Status:

Online;

Offline;

Alerta;

Desconhecido.

Preparar arquitetura para receber futuramente:

Agente NEKFORT → API → Banco de dados → Dashboard

O agente será desenvolvido posteriormente no Antigravity.

22. ALERTAS DE MONITORAMENTO

Preparar estrutura para alertas:

Computador offline;

CPU elevada;

Memória elevada;

Disco cheio;

Temperatura elevada;

Falha de serviço;

Agente sem comunicação.

Os limites deverão ser configuráveis.

23. INVENTÁRIO DE SOFTWARE

Preparar módulo futuro para registrar:

Sistema operacional;

Versão;

Aplicativos;

Licenças;

Antivírus;

Data da última atualização.

24. RELACIONAMENTO ENTRE DADOS

Criar relacionamentos reais:

CLIENTE
↓
UNIDADE
↓
CONTRATO
↓
ATIVOS
↓
CHAMADOS
↓
VISITAS
↓
CHECKLISTS
↓
RELATÓRIOS

E:

CLIENTE
↓
ORÇAMENTOS
↓
SERVIÇOS ADICIONAIS
↓
CHAMADOS/EXECUÇÃO

25. HISTÓRICO

Todo registro importante deverá possuir histórico.

Registrar:

usuário;

data;

hora;

ação;

alteração realizada.

Exemplo:

"João alterou o status do chamado CH-2026-000123 de 'Em atendimento' para 'Resolvido'."

26. PESQUISA GLOBAL

Criar pesquisa global permitindo encontrar rapidamente:

clientes;

chamados;

equipamentos;

contratos;

visitas;

orçamentos.

27. FILTROS

Todas as telas de gestão devem possuir:

pesquisa;

filtros;

ordenação;

paginação;

seleção de período;

exportação quando aplicável.

28. NOTIFICAÇÕES

Criar sistema interno de notificações.

Exemplos:

Novo chamado;

Chamado crítico;

SLA próximo do vencimento;

SLA vencido;

Visita agendada;

Manutenção preventiva próxima;

Contrato próximo do vencimento;

Equipamento offline;

Orçamento aprovado.

Preparar estrutura para futuramente integrar:

WhatsApp;

e-mail;

outros canais.

Não implementar integração externa sem configuração adequada.

29. MENU PRINCIPAL

Criar menu lateral:

Dashboard

Atendimento

Chamados

Visitas

Agenda

Clientes

Clientes

Contatos

Unidades

Ativos

Equipamentos

Inventário

Monitoramento

Manutenção

Preventivas

Checklists

Contratos

Contratos

Serviços

Comercial

Orçamentos

Materiais

Relatórios

Configurações

30. CONFIGURAÇÕES

Criar área administrativa:

Usuários;

Perfis;

Permissões;

Categorias;

Subcategorias;

Prioridades;

SLA;

Status;

Checklists;

Serviços;

Materiais;

Configurações da empresa.

31. RESPONSIVIDADE

O sistema deve funcionar corretamente em:

Desktop;

Notebook;

Tablet;

Celular.

Priorizar experiência de uso profissional em desktop, mas manter interface responsiva.

32. EXPERIÊNCIA DO USUÁRIO

A interface deve ser:

moderna;

rápida;

organizada;

profissional;

intuitiva.

Utilizar:

cards;

tabelas;

badges de status;

indicadores;

filtros;

modais;

menus claros;

breadcrumbs;

feedback visual.

Evitar excesso de elementos decorativos.

O foco é produtividade.

33. SEGURANÇA

Implementar:

autenticação;

autorização por perfil;

proteção de rotas;

validação dos dados;

regras de acesso ao banco;

isolamento dos dados dos clientes;

logs de alterações.

Um usuário não deve conseguir acessar informações que seu perfil não possui autorização para visualizar.

34. MULTI-TENANT / PREPARAÇÃO FUTURA

Estruturar o banco pensando em crescimento.

A NEKFORT poderá possuir muitos clientes.

Os dados deverão ser relacionados corretamente ao cliente.

Evitar arquitetura que dependa de informações fixas ou hardcoded.

35. DADOS DEMONSTRATIVOS

Criar alguns dados iniciais apenas para demonstração da interface, deixando claramente identificados como dados de demonstração.

Criar exemplo:

Cliente:
"ESCOLA DEMONSTRAÇÃO"

Equipamentos:

PC-SECRETARIA-01

PC-SECRETARIA-02

PC-DIREÇÃO-01

PC-DIREÇÃO-02

NOTEBOOK-01

CFTV:

DVR-01

CAM-001 até CAM-008

Portão:

PORTAO-01

Contrato:
"Manutenção Tecnológica"

Valor:
R$ 1.500,00/mês

Esses dados deverão poder ser editados ou excluídos pelo administrador.

36. IMPORTANTE — NÃO CRIAR FUNCIONALIDADES FALSAS

Não apresentar como funcionando algo que ainda não foi implementado.

Especialmente:

Monitoramento automático;

WhatsApp;

envio automático de e-mail;

geolocalização;

agente de monitoramento.

Quando uma integração ainda não estiver implementada, criar a estrutura necessária e indicar visualmente que está preparada para futura integração.

37. PREPARAÇÃO PARA ANTIGRAVITY

O código deverá ser organizado para futura continuidade no Antigravity.

Evitar:

código desnecessariamente complexo;

dependências desnecessárias;

dados hardcoded;

componentes duplicados;

lógica espalhada;

estruturas difíceis de migrar.

Criar componentes reutilizáveis.

Criar serviços separados para comunicação com banco/API.

Documentar no código as partes importantes da arquitetura.

38. RESULTADO ESPERADO

Ao finalizar, entregar uma aplicação funcional do:

NEKFORT SERVICE DESK

Com:

Login;

Dashboard;

Clientes;

Unidades;

Contatos;

Equipamentos;

Chamados;

SLA;

Visitas;

Checklists;

Manutenção preventiva;

Contratos;

Orçamentos;

Serviços;

Materiais;

Relatórios;

Usuários;

Permissões;

Estrutura inicial de monitoramento.

O sistema deve parecer e funcionar como um produto SaaS profissional, e não como um simples projeto experimental.

Priorizar primeiro a estrutura funcional e o banco de dados correto.

Depois aprimorar a interface visual.

Não remover funcionalidades existentes ao implementar novas funcionalidades.

Sempre preservar os dados já cadastrados.

FIM DO PROMPT

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/78201395-a29d-41c0-a915-26ab83e56cf7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
