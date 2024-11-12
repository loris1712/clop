// utils/tokenUtils.js
export function getNicknameFromToken(token) {
  const validTokens = {
      "alexandrinamolinaro": { nickname: "Alexandrina Molinaro", type: "regular" },
      "tommaso.santinii": { nickname: "Tommaso Santini", type: "regular" },
      "loris.caputo": { nickname: "Loris Caputo", type: "vip" },
      "andreanittoli": { nickname: "Andrea Nittoli", type: "vip" },
      "_andreaspeziale_": { nickname: "Andrea Speziale", type: "regular" },
      "Giuliaapolizzi": { nickname: "Giulia Polizzi", type: "regular" },
      "giada.martinaa": { nickname: "Giada Martina Pici", type: "regular" },
      "francescomarra23": { nickname: "Francesco Marra", type: "regular" },
      "paolaarmillotta": { nickname: "Paola Armillotta", type: "regular" },
      "giuliaabrambilla": { nickname: "Giulia Brambilla", type: "regular" },
      "cele.baldassarre": { nickname: "Maria Celeste Baldassarre", type: "regular" },
      "Machi_123": { nickname: "Maria chiara ghisolfi", type: "regular" },
      "Ludobalestrucci": { nickname: "Ludovica Balestrucci", type: "regular" },
      "lugi_dm": { nickname: "Luigi De Martino", type: "regular" },
      "_la_more": { nickname: "Chiara Morelli", type: "regular" },
      "_daiida_": { nickname: "Daida Scafa", type: "regular" },
      "alessandrocarosetti_": { nickname: "Alessandro Carosetti", type: "regular" },
      "user123": { nickname: "Cleope User", type: "vip" },
      "lucasabatoo": { nickname: "Luca Sabato", type: "regular" },
      "eternidad_key": { nickname: "Khouloud", type: "vip" },
      "nurpinna": { nickname: "Nur Pinna", type: "regular" },
      "checcacocozza": { nickname: "Francesca Cocozza", type: "Girlfriend" },
      "c.vinc_": { nickname: "Vincenzo Cerruto", type: "regular" },
      "lillygiorgione": { nickname: "Maria Vittoria Giorgione", type: "regular" },
      "paolapuglisi": { nickname: "Paola Puglisi", type: "regular" },
      "aleezambi": { nickname: "Alessandra Zambianco", type: "regular" },
      "elena_masselli": { nickname: "Elena Masselli", type: "regular" },
  };
  
  return validTokens[token] || null;
}
