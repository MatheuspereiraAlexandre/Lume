export const activeRooms = [
  { id: 1, name: "Sala de Desenvolvimento", participants: 8, time: "45 min", emoji: "💻", color: "#4a5568" },
  { id: 2, name: "Design Sprint", participants: 5, time: "1h 20min", emoji: "🎨", color: "#805ad5" },
  { id: 3, name: "Matematica 3DS", participants: 15, time: "30 min", emoji: "💙", color: "#2d3748" },
  { id: 4, name: "Portugues 3DS", participants: 6, time: "2h 10min", emoji: "💡", color: "#d69e2e" },
];

export function getRoomById(id: number) {
  return activeRooms.find((r) => r.id === id) ?? null;
}
