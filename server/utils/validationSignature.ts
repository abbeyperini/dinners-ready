import _C from "node:crypto"
export async function createSignature(secret:string, payload: string):Promise<string>{
  const hmac = _C.createHmac("sha256", secret);
  hmac.update(payload);
  return hmac.digest("hex");
}

// Lovingly Stolen from https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
export async function verifySignature(secret: string, header:string, payload: string) {
  const encoder = new TextEncoder();

  const parts = header.split("=");
  const sigHex = parts[1];

  const algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

  const keyBytes = encoder.encode(secret);
  const extractable = false;
  const key = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      algorithm,
      extractable,
      [ "sign", "verify" ],
  );

  const sigBytes = hexToBytes(sigHex);
  const dataBytes = encoder.encode(payload);

  return await crypto.subtle.verify(
      algorithm.name,
      key,
      sigBytes,
      dataBytes,
  );
}

// Lovingly Stolen from https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
export function hexToBytes(hex:string) {
  const len = hex.length / 2;
  const bytes = new Uint8Array(len);

  let index = 0;
  for (let i = 0; i < hex.length; i += 2) {
    const c = hex.slice(i, i + 2);
    bytes[index] = parseInt(c, 16);
    index += 1;
  }
  return bytes;
}
