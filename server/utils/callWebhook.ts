import {createSignature} from "~~/server/utils/validationSignature";

export async function callWebhook<T extends WebhookRequest>(webhook: T, payload: any) {
  const datetime = process.env.NODE_ENV ==="development" ? "test" : Date.now();
  const signedHeader = `sha256=${await createSignature(webhook.secret, datetime+JSON.stringify(payload))}`;
  return $fetch(webhook.callback,{
    method:"POST",
    headers:[
      ["x-dinners-ready-nonce", `${datetime}`],
      ["x-dinners-ready-signature", signedHeader],
    ],
    body: payload,
  })
}
