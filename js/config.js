/**
 * Configuração central do evento.
 * Edite estes valores sem mexer no HTML.
 */
window.EVENT = {
  name: "Tá Tá Tum Tá",
  fullName: "Capoeira na Conectividade dos Tambores 2026",
  subtitle: "Evento de Graduação e Integração Cultural",
  theme: "Na conectividade dos tambores",
  dateISO: "2026-09-12T09:00:00-03:00",
  venue: "FITO",
  address: "Rua Camélia, nº 26, Jardim das Flores — Osasco/SP",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Cam%C3%A9lia+26+Osasco",
  whatsapp: "5511948909694",
  whatsappMessage:
    "Olá! Quero informações sobre o Capoeira na Conectividade dos Tambores 2026 (12/09 no FITO, Osasco).",
  organizers:
    "Associação de Capoeira Cordão de Ouro e Movimento Orgânico Cultural — coordenação Mestre Patado",
  coordinator: "Mestre Patado",

  /** Investimento único (material oficial) */
  investment: {
    price: 300,
    priceLabel: "R$ 300,00",
    includes: [
      "Camiseta oficial do evento",
      "Participação nas apresentações",
      "Cerimônia de graduação",
      "Participação nas atividades e vivências do evento",
      "Presença de convidados especiais",
    ],
    /** Checkout Nubank (parcelamento) */
    paymentUrl: "https://checkout.nubank.com.br/KvmOgJXXdbmlsyr",
    /** Chave Pix (e-mail) */
    pixKey: "mestrekuatacdo@gmail.com",
    pixLabel: "mestrekuatacdo@gmail.com",
  },
};
