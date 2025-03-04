import {randomUUID} from "node:crypto";
import {saveTrigger} from "~~/server/utils/dataStorage";
import {CreatedTrigger} from "#shared/utils/schemas";
import {createSignature} from "#imports";
import {callWebhook} from "~~/server/utils/callWebhook";

async function CALL_ALL_THE_WEBHOOKS(trigger: SavedTrigger, body: any){
  const webhooks = await getLinkedWebhooks(trigger._id);
  for(let hook of webhooks){
    if(hook){
      await callWebhook(hook, body);
    }
  }
}

export default defineEventHandler(async (event )=>{
  const config = useRuntimeConfig(event);
  const body = await readBody(event );
  const triggerId = getRouterParam(event, 'trigger_id');
  if(!triggerId){
    throw createError({
      statusCode: 403,
      statusMessage: "Trigger ID not supplied"
    });
  }
  const trigger = await getTrigger(triggerId);
  if(!trigger){
    throw createError({
      statusCode: 404,
      statusMessage: "Trigger not found"
    });
  }
  if(!event.headers.has("x-dinners-ready")){
    throw createError({
      statusCode: 401,
      statusMessage: "Not Authorized"
    });
  }
  const authHeader = event.headers.get("x-dinners-ready")!;
  if(await createSignature(config.serverSecret, authHeader) !== trigger.hashedSecret){
    throw createError({
      statusCode: 401,
      statusMessage: "Not Authorized"
    });
  }

  event.waitUntil(CALL_ALL_THE_WEBHOOKS(trigger, body))

  return {
    status: 200,
    message: "OK",
  }
})
