import {randomUUID} from "node:crypto";
import {saveTrigger} from "~~/server/utils/dataStorage";
import {CreatedTrigger} from "#shared/utils/schemas";
import {createSignature} from "#imports";
import {callWebhook} from "~~/server/utils/callWebhook";


export default defineEventHandler(async (event )=>{
  const config = useRuntimeConfig(event);
  const body = await readBody<WebhookRequest>(event);
  const validation = baseWebhookSchema.safeParse(body);
  if(!validation.success){
    setResponseStatus(event, 403);
    return validation.error.flatten();
  }

  await callWebhook(body, {
    _type: "ping",
    payload: {
      message: "Ping!"
    }
  });

  const _id = randomUUID();
  await saveWebhook({
    _id,
    ...body,
  });

  return {
    _id, ...body,
  }
});
