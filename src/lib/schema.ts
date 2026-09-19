export type FieldType = "text" | "textarea" | "number" | "date" | "select" | "ref";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  refTable?: string;
  refLabel?: string;
  hideInTable?: boolean;
  badge?: boolean;
  money?: boolean;
};

export type Entity = {
  table: string;
  title: string;
  singular: string;
  description: string;
  searchFields: string[];
  fields: Field[];
};

const clienteRef: Field = {
  name: "clienteId",
  label: "Cliente",
  type: "ref",
  refTable: "clientes",
  refLabel: "nome",
};

export const entities: Record<string, Entity> = {
  chamados: {
    table: "chamados",
    title: "Chamados",
    singular: "Chamado",
    description: "Abertura, triagem e acompanhamento de chamados de suporte.",
    searchFields: ["numero", "titulo", "tecnico"],
    fields: [
      { name: "numero", label: "Número", type: "text" },
      { name: "titulo", label: "Título", type: "text" },
      clienteRef,
      {
        name: "categoria",
        label: "Categoria",
        type: "select",
        options: [
          "CFTV",
          "Redes",
          "Controle de acesso",
          "Portões",
          "Suporte",
          "Infraestrutura",
          "Manutenção preventiva",
        ],
      },
      {
        name: "prioridade",
        label: "Prioridade",
        type: "select",
        options: ["Baixa", "Média", "Alta", "Crítica"],
        badge: true,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Aberto", "Em atendimento", "Aguardando cliente", "Resolvido", "Cancelado"],
        badge: true,
      },
      { name: "tecnico", label: "Técnico", type: "text" },
      { name: "abertura", label: "Abertura", type: "date" },
      { name: "sla", label: "Prazo SLA", type: "date" },
      { name: "descricao", label: "Descrição", type: "textarea", hideInTable: true },
    ],
  },
  clientes: {
    table: "clientes",
    title: "Clientes",
    singular: "Cliente",
    description: "Cadastro completo de clientes atendidos pela NEKFORT.",
    searchFields: ["nome", "documento", "contato", "cidade"],
    fields: [
      { name: "nome", label: "Nome / Razão social", type: "text" },
      { name: "documento", label: "CNPJ / CPF", type: "text" },
      { name: "contato", label: "Contato", type: "text" },
      { name: "telefone", label: "Telefone", type: "text" },
      { name: "email", label: "E-mail", type: "text" },
      { name: "cidade", label: "Cidade", type: "text" },
      {
        name: "segmento",
        label: "Segmento",
        type: "select",
        options: ["Condomínio", "Varejo", "Saúde", "Indústria", "Educação", "Corporativo", "Outro"],
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Ativo", "Em negociação", "Inativo"],
        badge: true,
      },
    ],
  },
  contratos: {
    table: "contratos",
    title: "Contratos",
    singular: "Contrato",
    description: "Contratos recorrentes, valores e vigências.",
    searchFields: ["codigo", "tipo"],
    fields: [
      { name: "codigo", label: "Código", type: "text" },
      clienteRef,
      { name: "tipo", label: "Tipo", type: "text" },
      { name: "valor", label: "Valor mensal", type: "number", money: true },
      {
        name: "periodicidade",
        label: "Periodicidade",
        type: "select",
        options: ["Mensal", "Trimestral", "Semestral", "Anual"],
      },
      { name: "inicio", label: "Início", type: "date" },
      { name: "vencimento", label: "Vencimento", type: "date" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Vigente", "Em renovação", "Suspenso", "Encerrado"],
        badge: true,
      },
    ],
  },
  equipamentos: {
    table: "equipamentos",
    title: "Equipamentos e ativos",
    singular: "Equipamento",
    description: "Inventário de ativos instalados por cliente.",
    searchFields: ["patrimonio", "nome", "local"],
    fields: [
      { name: "patrimonio", label: "Patrimônio", type: "text" },
      { name: "nome", label: "Equipamento", type: "text" },
      clienteRef,
      {
        name: "tipo",
        label: "Tipo",
        type: "select",
        options: ["CFTV", "Rede", "Controle de acesso", "Portão", "Servidor", "Outro"],
      },
      { name: "local", label: "Local", type: "text" },
      { name: "garantia", label: "Garantia até", type: "date" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Operacional", "Em manutenção", "Inativo", "Substituído"],
        badge: true,
      },
    ],
  },
  visitas: {
    table: "visitas",
    title: "Visitas técnicas",
    singular: "Visita",
    description: "Agenda de visitas preventivas e corretivas.",
    searchFields: ["tecnico", "tipo"],
    fields: [
      { name: "data", label: "Data", type: "date" },
      clienteRef,
      { name: "tecnico", label: "Técnico", type: "text" },
      {
        name: "tipo",
        label: "Tipo",
        type: "select",
        options: ["Preventiva", "Corretiva", "Instalação", "Vistoria"],
      },
      { name: "periodo", label: "Período", type: "select", options: ["Manhã", "Tarde", "Noite"] },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Agendada", "Confirmada", "Em execução", "Concluída", "Cancelada"],
        badge: true,
      },
      { name: "observacao", label: "Observações", type: "textarea", hideInTable: true },
    ],
  },
  checklists: {
    table: "checklists",
    title: "Checklists",
    singular: "Checklist",
    description: "Modelos de checklist usados em campo.",
    searchFields: ["nome", "categoria", "responsavel"],
    fields: [
      { name: "nome", label: "Nome", type: "text" },
      {
        name: "categoria",
        label: "Categoria",
        type: "select",
        options: ["CFTV", "Redes", "Controle de acesso", "Portões", "Elétrica", "Geral"],
      },
      { name: "itens", label: "Qtd. de itens", type: "number" },
      { name: "responsavel", label: "Responsável", type: "text" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Ativo", "Rascunho", "Arquivado"],
        badge: true,
      },
    ],
  },
  orcamentos: {
    table: "orcamentos",
    title: "Orçamentos",
    singular: "Orçamento",
    description: "Propostas comerciais enviadas aos clientes.",
    searchFields: ["numero", "descricao"],
    fields: [
      { name: "numero", label: "Número", type: "text" },
      clienteRef,
      { name: "descricao", label: "Descrição", type: "text" },
      { name: "valor", label: "Valor", type: "number", money: true },
      { name: "validade", label: "Validade", type: "date" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Rascunho", "Enviado", "Aprovado", "Recusado"],
        badge: true,
      },
    ],
  },
  servicos: {
    table: "servicos",
    title: "Serviços",
    singular: "Serviço",
    description: "Catálogo de serviços e valores praticados.",
    searchFields: ["nome", "categoria"],
    fields: [
      { name: "nome", label: "Serviço", type: "text" },
      {
        name: "categoria",
        label: "Categoria",
        type: "select",
        options: ["CFTV", "Redes", "Controle de acesso", "Portões", "Suporte", "Infraestrutura"],
      },
      { name: "unidade", label: "Unidade", type: "text" },
      { name: "valor", label: "Valor", type: "number", money: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Ativo", "Inativo"],
        badge: true,
      },
    ],
  },
  materiais: {
    table: "materiais",
    title: "Materiais",
    singular: "Material",
    description: "Estoque de materiais e insumos técnicos.",
    searchFields: ["codigo", "nome"],
    fields: [
      { name: "codigo", label: "Código", type: "text" },
      { name: "nome", label: "Material", type: "text" },
      { name: "unidade", label: "Unidade", type: "text" },
      { name: "estoque", label: "Estoque", type: "number" },
      { name: "minimo", label: "Estoque mínimo", type: "number" },
      { name: "custo", label: "Custo unitário", type: "number", money: true },
    ],
  },
  usuarios: {
    table: "usuarios",
    title: "Usuários",
    singular: "Usuário",
    description: "Equipe interna com acesso ao service desk.",
    searchFields: ["nome", "email", "perfil"],
    fields: [
      { name: "nome", label: "Nome", type: "text" },
      { name: "email", label: "E-mail", type: "text" },
      {
        name: "perfil",
        label: "Perfil",
        type: "select",
        options: ["Administrador", "Gestor", "Técnico", "Atendimento", "Financeiro"],
        badge: true,
      },
      { name: "telefone", label: "Telefone", type: "text" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Ativo", "Inativo"],
        badge: true,
      },
    ],
  },
  permissoes: {
    table: "permissoes",
    title: "Permissões",
    singular: "Permissão",
    description: "Regras de acesso por perfil de usuário.",
    searchFields: ["perfil", "modulos"],
    fields: [
      { name: "perfil", label: "Perfil", type: "text" },
      { name: "modulos", label: "Módulos liberados", type: "text" },
      {
        name: "nivel",
        label: "Nível",
        type: "select",
        options: ["Total", "Edição", "Edição limitada", "Somente leitura"],
        badge: true,
      },
      { name: "observacao", label: "Observação", type: "textarea", hideInTable: true },
    ],
  },
  monitoramento: {
    table: "monitoramento",
    title: "Monitoramento",
    singular: "Ativo monitorado",
    description: "Estrutura inicial de monitoramento de ativos críticos.",
    searchFields: ["ativo", "tipo"],
    fields: [
      { name: "ativo", label: "Ativo", type: "text" },
      clienteRef,
      {
        name: "tipo",
        label: "Tipo",
        type: "select",
        options: ["CFTV", "Rede", "Controle de acesso", "Servidor", "Energia"],
      },
      {
        name: "estado",
        label: "Estado",
        type: "select",
        options: ["Online", "Instável", "Offline"],
        badge: true,
      },
      { name: "ultimaLeitura", label: "Última leitura", type: "text" },
      { name: "observacao", label: "Observação", type: "textarea", hideInTable: true },
    ],
  },
};

export function formatMoney(value: number | string) {
  const n = typeof value === "number" ? value : Number(value || 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
