/**
 * Configuração central do evento.
 * Edite estes valores sem mexer no HTML.
 *
 * paymentUrl: cole o link de Pix / checkout (Kiwify, Mercado Pago, etc.).
 * Se vazio, o botão principal abre o WhatsApp com a mensagem da porta.
 */
window.EVENT = {
  name: "Tá Tá Tum Tá",
  subtitle: "Batizado e Graduação 2026",
  theme: "Na conectividade dos tambores",
  /** Data/hora do evento (ISO com fuso de Brasília). Ajuste o horário quando for oficial. */
  dateISO: "2026-09-12T09:00:00-03:00",
  venue: "FITO",
  address: "Rua Camélia, 26 — Osasco/SP",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Cam%C3%A9lia+26+Osasco",
  whatsapp: "5511948909694",
  /** Mensagem padrão (FAB / fallback) */
  whatsappMessage:
    "Olá! Quero saber mais sobre o Tá Tá Tum Tá (Batizado e Graduação 2026) — 12/09 no FITO, Osasco.",
  organizers: "CDO Osasco / Mestre Kuata e alunos",

  /** Duas portas de participação */
  paths: {
    aluno: {
      id: "aluno",
      badge: "Aluno CDO",
      title: "Sou aluno",
      price: 300,
      priceLabel: "R$ 300",
      subtitle: "Batizado e graduação",
      description:
        "Para alunos da CDO Osasco que vão participar do batizado e da graduação. Sua contribuição ajuda a organizar o dia e a receber convidados e mestres.",
      includes: [
        "Participação no batizado e graduações",
        "Presença na roda e programação do dia",
        "Apoio à realização e aos convidados",
      ],
      ctaLabel: "Quero ser aluno — R$ 300",
      /** Cole aqui o link de pagamento do aluno (Pix/checkout) */
      paymentUrl: "",
      whatsappMessage:
        "Olá! Sou aluno(a) e quero confirmar a inscrição no Tá Tá Tum Tá (R$ 300) — 12/09 no FITO, Osasco.",
    },
    camiseta: {
      id: "camiseta",
      badge: "Camiseta + oficina",
      title: "Camiseta e oficina",
      price: 90,
      priceLabel: "R$ 90",
      subtitle: "Shop e participação",
      description:
        "Para quem quer garantir a camiseta do evento e participar da oficina. Valor diferenciado para fortalecer a roda e a arrecadação do batizado.",
      includes: [
        "Camiseta oficial do Tá Tá Tum Tá",
        "Participação na oficina",
        "Presença no clima do batizado",
      ],
      note: "Informe o tamanho (P, M, G ou GG) no WhatsApp ou no checkout.",
      ctaLabel: "Quero camiseta — R$ 90",
      /** Cole aqui o link de pagamento da camiseta (Pix/checkout) */
      paymentUrl: "",
      whatsappMessage:
        "Olá! Quero a camiseta + oficina do Tá Tá Tum Tá (R$ 90). Tamanho: ___ — 12/09 no FITO, Osasco.",
    },
  },
};
