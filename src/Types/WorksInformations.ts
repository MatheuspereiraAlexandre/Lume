export interface Work {
  id: number
  roomId: number
  title: string
  description: string
  importance: "baixa prioridade" | "moderada" | "alta prioridade" | "urgente" | "bonus"
  status: "planejamento" | "ativa" | "encerrada"
  dueDate: string
  createdAt: string
  user: string
  files?: {
    name: string
    size: number
    type: string
  }[]
}

export const works: Work[] = [
  {
    id: 1,
    roomId: 1,
    title: "Apresentar TCC",
    description: "Definir tarefas para a primeira entrega.",
    importance: "urgente",
    status: "ativa",
    dueDate: "2025-11-28",
    createdAt: "2025-09-25",
    user: "João",
  },
  {
    id: 2,
    roomId: 2,
    title: "Protótipo no Figma",
    description: "Enviar wireframes.",
    importance: "moderada",
    status: "planejamento",
    dueDate: "2025-11-30",
    createdAt: "2025-10-01",
    user: "Ana",
  }
]
