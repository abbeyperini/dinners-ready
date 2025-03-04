import {randomUUID} from "node:crypto";
import {addLinkTriggerWebhook, saveTrigger} from "~~/server/utils/dataStorage";
import {CreatedTrigger, LinkTriggerWebhookRequest, linkTriggerWebhookSchema} from "#shared/utils/schemas";
import {createSignature} from "#imports";
import {callWebhook} from "~~/server/utils/callWebhook";


export default defineEventHandler(async (event )=>{
  const body = await readBody<LinkTriggerWebhookRequest>(event);

  const validation = linkTriggerWebhookSchema.safeParse(body);
  if(!validation.success){
    setResponseStatus(event, 403);
    return validation.error.flatten();
  }

  await addLinkTriggerWebhook(body);
  return body;

})
