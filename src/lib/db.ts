import { useSyncExternalStore } from "react";

export type Row = Record<string, string | number> & { id: string };
export type DB = Record<string, Row[]>;

const KEY = "nekfort-service-desk-v1";

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function seedData(): DB {
  return {
    clientes: [
      {
        id: "cli-1",
        nome: "Condomínio Vila Real",
        documento: "12.345.678/0001-90",
        contato: "Marcos Andrade",
        telefone: "(11) 98877-1200",
        email: "adm@vilareal.com.br",
        cidade: "São Paulo",
        segmento: "Condomínio",
        status: "Ativo",
      },
      {
        id: "cli-2",
        nome: "Supermercado Bom Preço",
        documento: "98.765.432/0001-11",
        contato: "Tatiane Lima",
        telefone: "(11) 97766-4321",
        email: "ti@bompreco.com.br",
        cidade: "Guarulhos",
        segmento: "Varejo",
        status: "Ativo",
      },
      {
        id: "cli-3",
        nome: "Clínica SaúdeMais",
        documento: "45.222.111/0001-05",
        contato: "Dr. Renato Souza",
        telefone: "(11) 95544-8899",
        email: "contato@saudemais.com.br",
        cidade: "Osasco",
        segmento: "Saúde",
        status: "Em negociação",
      },
    ],
    chamados: [
      {
        id: "cha-1",
        numero: "CH-1042",
        titulo: "Câmera 04 sem imagem no portão principal",
        clienteId: "cli-1",
        categoria: "CFTV",
        prioridade: "Alta",
        status: "Em atendimento",
        tecnico: "Diego Martins",
        abertura: "2026-09-16",
        sla: "2026-09-19",
        descricao: "Câmera dome perdeu sinal após queda de energia.",
      },
      {
        id: "cha-2",
        numero: "CH-1043",
        titulo: "Rede lenta nos caixas 3 e 4",
        clienteId: "cli-2",
        categoria: "Redes",
        prioridade: "Crítica",
        status: "Aberto",
        tecnico: "Ana Paula Reis",
        abertura: "2026-09-17",
        sla: "2026-09-18",
        descricao: "Intermitência no switch do rack principal.",
      },
      {
        id: "cha-3",
        numero: "CH-1044",
        titulo: "Portão social não abre pelo controle",
        clienteId: "cli-1",
        categoria: "Portões",
        prioridade: "Média",
        status: "Aguardando cliente",
        tecnico: "Diego Martins",
        abertura: "2026-09-15",
        sla: "2026-09-20",
        descricao: "Placa receptora possivelmente queimada.",
      },
      {
        id: "cha-4",
        numero: "CH-1045",
        titulo: "Cadastro de biometria de novos colaboradores",
        clienteId: "cli-3",
        categoria: "Controle de acesso",
        prioridade: "Baixa",
        status: "Resolvido",
        tecnico: "Ana Paula Reis",
        abertura: "2026-09-10",
        sla: "2026-09-14",
        descricao: "Inclusão de 8 usuários na catraca da recepção.",
      },
    ],
    contratos: [
      {
        id: "ctr-1",
        codigo: "CT-2026-018",
        clienteId: "cli-1",
        tipo: "Manutenção preventiva",
        valor: 2400,
        periodicidade: "Mensal",
        inicio: "2026-01-10",
        vencimento: "2027-01-10",
        status: "Vigente",
      },
      {
        id: "ctr-2",
        codigo: "CT-2026-031",
        clienteId: "cli-2",
        tipo: "Suporte + CFTV",
        valor: 3890,
        periodicidade: "Mensal",
        inicio: "2026-03-01",
        vencimento: "2026-12-01",
        status: "Vigente",
      },
    ],
    equipamentos: [
      {
        id: "eqp-1",
        patrimonio: "NK-CAM-014",
        nome: "Câmera Dome 4MP",
        clienteId: "cli-1",
        tipo: "CFTV",
        local: "Portão principal",
        garantia: "2027-02-01",
        status: "Em manutenção",
      },
      {
        id: "eqp-2",
        patrimonio: "NK-SW-002",
        nome: "Switch Gerenciável 24P",
        clienteId: "cli-2",
        tipo: "Rede",
        local: "Rack loja 1",
        garantia: "2028-05-20",
        status: "Operacional",
      },
      {
        id: "eqp-3",
        patrimonio: "NK-CAT-007",
        nome: "Catraca Biométrica",
        clienteId: "cli-3",
        tipo: "Controle de acesso",
        local: "Recepção",
        garantia: "2026-11-30",
        status: "Operacional",
      },
    ],
    visitas: [
      {
        id: "vis-1",
        data: "2026-09-19",
        clienteId: "cli-1",
        tecnico: "Diego Martins",
        tipo: "Corretiva",
        periodo: "Manhã",
        status: "Agendada",
        observacao: "Levar fonte 12V e cabo coaxial.",
      },
      {
        id: "vis-2",
        data: "2026-09-18",
        clienteId: "cli-2",
        tecnico: "Ana Paula Reis",
        tipo: "Preventiva",
        periodo: "Tarde",
        status: "Confirmada",
        observacao: "Checagem trimestral do rack.",
      },
    ],
    checklists: [
      {
        id: "chk-1",
        nome: "Preventiva CFTV - Padrão",
        categoria: "CFTV",
        itens: 12,
        responsavel: "Diego Martins",
        status: "Ativo",
      },
      {
        id: "chk-2",
        nome: "Vistoria de Rack e Rede",
        categoria: "Redes",
        itens: 18,
        responsavel: "Ana Paula Reis",
        status: "Ativo",
      },
    ],
    orcamentos: [
      {
        id: "orc-1",
        numero: "ORC-2026-077",
        clienteId: "cli-3",
        descricao: "Instalação de 6 câmeras IP + NVR",
        valor: 9850,
        validade: "2026-10-05",
        status: "Enviado",
      },
      {
        id: "orc-2",
        numero: "ORC-2026-078",
        clienteId: "cli-1",
        descricao: "Troca de placa receptora do portão",
        valor: 780,
        validade: "2026-09-28",
        status: "Aprovado",
      },
    ],
    servicos: [
      {
        id: "srv-1",
        nome: "Instalação de câmera IP",
        categoria: "CFTV",
        unidade: "Ponto",
        valor: 280,
        status: "Ativo",
      },
      {
        id: "srv-2",
        nome: "Certificação de ponto de rede",
        categoria: "Redes",
        unidade: "Ponto",
        valor: 95,
        status: "Ativo",
      },
      {
        id: "srv-3",
        nome: "Visita técnica avulsa",
        categoria: "Suporte",
        unidade: "Visita",
        valor: 220,
        status: "Ativo",
      },
    ],
    materiais: [
      {
        id: "mat-1",
        codigo: "MT-001",
        nome: "Cabo coaxial bipolar (metro)",
        unidade: "m",
        estoque: 420,
        minimo: 100,
        custo: 3.2,
      },
      {
        id: "mat-2",
        codigo: "MT-002",
        nome: "Fonte 12V 5A",
        unidade: "un",
        estoque: 8,
        minimo: 10,
        custo: 89.9,
      },
      {
        id: "mat-3",
        codigo: "MT-003",
        nome: "Conector RJ45 Cat6",
        unidade: "un",
        estoque: 650,
        minimo: 200,
        custo: 1.4,
      },
    ],
    usuarios: [
      {
        id: "usr-1",
        nome: "Jr Souza",
        email: "jr@nekfort.com.br",
        perfil: "Administrador",
        telefone: "(11) 99999-0001",
        status: "Ativo",
      },
      {
        id: "usr-2",
        nome: "Diego Martins",
        email: "diego@nekfort.com.br",
        perfil: "Técnico",
        telefone: "(11) 99999-0002",
        status: "Ativo",
      },
      {
        id: "usr-3",
        nome: "Ana Paula Reis",
        email: "ana@nekfort.com.br",
        perfil: "Técnico",
        telefone: "(11) 99999-0003",
        status: "Ativo",
      },
      {
        id: "usr-4",
        nome: "Carla Nunes",
        email: "carla@nekfort.com.br",
        perfil: "Atendimento",
        telefone: "(11) 99999-0004",
        status: "Ativo",
      },
    ],
    permissoes: [
      {
        id: "per-1",
        perfil: "Administrador",
        modulos: "Todos os módulos",
        nivel: "Total",
        observacao: "Acesso irrestrito, inclusive financeiro.",
      },
      {
        id: "per-2",
        perfil: "Técnico",
        modulos: "Chamados, Visitas, Checklists, Equipamentos",
        nivel: "Edição",
        observacao: "Sem acesso a contratos e orçamentos.",
      },
      {
        id: "per-3",
        perfil: "Atendimento",
        modulos: "Chamados, Clientes, Orçamentos",
        nivel: "Edição limitada",
        observacao: "Pode abrir e encaminhar chamados.",
      },
    ],
    monitoramento: [
      {
        id: "mon-1",
        ativo: "NVR Vila Real",
        clienteId: "cli-1",
        tipo: "CFTV",
        estado: "Offline",
        ultimaLeitura: "2026-09-18 22:10",
        observacao: "Sem resposta de ping há 40 minutos.",
      },
      {
        id: "mon-2",
        ativo: "Link principal Bom Preço",
        clienteId: "cli-2",
        tipo: "Rede",
        estado: "Online",
        ultimaLeitura: "2026-09-19 03:00",
        observacao: "Latência média 18ms.",
      },
      {
        id: "mon-3",
        ativo: "Catraca Recepção",
        clienteId: "cli-3",
        tipo: "Controle de acesso",
        estado: "Online",
        ultimaLeitura: "2026-09-19 02:55",
        observacao: "Operando normalmente.",
      },
    ],
  };
}

const SERVER_SNAPSHOT: DB = seedData();

let state: DB = seedData();
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
}

export function hydrateFromStorage() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DB;
      state = { ...state, ...parsed };
      emit();
      return;
    }
  } catch {
    /* corrupted payload — keep seed */
  }
  persist();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useTable(name: string): Row[] {
  return useSyncExternalStore(
    subscribe,
    () => state[name] ?? [],
    () => SERVER_SNAPSHOT[name] ?? [],
  );
}

export function useDatabase(): DB {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => SERVER_SNAPSHOT,
  );
}

export function getTable(name: string): Row[] {
  return state[name] ?? [];
}

export function insertRow(name: string, values: Record<string, string | number>) {
  const row = { ...values, id: uid() } as Row;
  state = { ...state, [name]: [row, ...(state[name] ?? [])] };
  persist();
  emit();
  return row;
}

export function updateRow(name: string, id: string, values: Record<string, string | number>) {
  state = {
    ...state,
    [name]: (state[name] ?? []).map((r) => (r.id === id ? ({ ...r, ...values, id } as Row) : r)),
  };
  persist();
  emit();
}

export function deleteRow(name: string, id: string) {
  state = { ...state, [name]: (state[name] ?? []).filter((r) => r.id !== id) };
  persist();
  emit();
}

export function resetDatabase() {
  state = seedData();
  persist();
  emit();
}
