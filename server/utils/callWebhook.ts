import {createSignature} from "~~/server/utils/validationSignature";

export type WebhookType = "ping"|"message";

export type WebhookPayload = {
  _type: WebhookType;
  payload: any;
  meta?: Record<string, unknown>;
}

export async function callWebhook<T extends WebhookRequest>(webhook: T, payload: WebhookPayload) {
  const datetime = Date.now();
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
