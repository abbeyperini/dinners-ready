import {randomUUID} from "node:crypto";
import {saveTrigger} from "~~/server/utils/dataStorage";
import {CreatedTrigger} from "#shared/utils/schemas";
import {createSignature} from "#imports";


export default defineEventHandler(async (event )=>{
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const validation = baseTriggerSchema.safeParse(body);
  if(!validation.success){
    setResponseStatus(event, 403);
    return validation.error.flatten();
  }

  const secret = randomUUID();
  const resultTrigger:CreatedTrigger = {
    _id: randomUUID(),
    name:body.name,
    secret,
  }

  const savedTrigger: SavedTrigger = {
    _id: resultTrigger._id,
    name: resultTrigger.name,
    hashedSecret: await createSignature(config.serverSecret, secret),
  }

  await saveTrigger(savedTrigger);

  return resultTrigger;
})
