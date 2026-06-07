const toHex = (buffer: ArrayBuffer) =>
  [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

export const sha256HexFromArrayBuffer = async (buffer: ArrayBuffer) =>
  toHex(await crypto.subtle.digest("SHA-256", buffer));

export const sha256HexFromString = async (value: string) => {
  const encoded = new TextEncoder().encode(value);
  return sha256HexFromArrayBuffer(encoded.buffer);
};
