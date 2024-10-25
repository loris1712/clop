// utils/tokenUtils.js
export function getNicknameFromToken(token) {
  const validTokens = {
      "test-token": { nickname: "User123", type: "vip" },
      "regular-token": { nickname: "User456", type: "regular" },
  };
  
  return validTokens[token] || null;
}
