// utils/tokenUtils.js
export function getNicknameFromToken(token) {
  const validTokens = {
      "test-token": { nickname: "User123", type: "vip" },
      "regular-token": { nickname: "User456", type: "regular" },
      // Aggiungi qui altri token validi
  };
  
  return validTokens[token] || null; // Restituisce null se il token non è valido
}
