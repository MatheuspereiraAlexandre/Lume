export const ChatOptions = [
  {
    label: "Chats",
    items: [
      { label: "Chat 1" },
      { label: "Chat 2" },
      { label: "Chat 3" },
      { label: "Chat 4" },
    ],
  },
  {
    label: "Configurações",
    items: [{ label: "Adicionar sala", icon: "fa-solid fa-plus" }],
  },
];

export const chat = [
  {
    roomId: 1,
    label: "Chat Geral",
    messages: [
      { user: "Matheus", text: "Olá pessoal!" },
      { user: "Ana", text: "Oi Matheus! Tudo bem?" },
    ],
  },
  {
    roomId: 1,
    label: "Chat Técnico",
    messages: [
      { user: "Carlos", text: "Servidor atualizado." },
      { user: "Matheus", text: "Valeu pelo aviso!" },
    ],
  },
  {
    roomId: 2,
    label: "Chat Design",
    messages: [
      { user: "Beatriz", text: "Nova logo pronta!" },
      { user: "Matheus", text: "Ficou incrível 🔥" },
    ],
  },
  {
    roomId: 2,
    label: "Chat UI/UX",
    messages: [
      { user: "Lucas", text: "Revisem o protótipo." },
      { user: "Matheus", text: "Já estou olhando 👀" },
    ],
  },
];
