import {LinkTriggerWebhookRequest} from "#shared/utils/schemas";

export function useWebhookStorage(){
  return useStorage<SavedWebhook>("webhook");
}

export async function saveWebhook(data: SavedWebhook){
  const storage = useWebhookStorage();
  return await storage.setItem(data._id, data);
}

export async function getWebhook(webhookId: string):Promise<SavedWebhook|null>{
  const storage = useWebhookStorage();
  return await storage.getItem(webhookId);
}

export type SavedWebhookWithTriggers = SavedWebhook & {
  triggers: (ListedTrigger|null)[];
}

export async function listWebhooks(): Promise<SavedWebhookWithTriggers[]>{
  const storage = useWebhookStorage();
  const keys = await storage.getKeys();
  const result: SavedWebhookWithTriggers[] = [];
  for(let key of keys){
    const webhook = (await storage.getItem(key))!
    result.push({...webhook, triggers: await getLinkedTriggers(key)});
  }
  return result;
}




export function useTriggerStorage(){
  return useStorage<SavedTrigger>("trigger");
}

export async function saveTrigger(data: SavedTrigger){
  const storage = useTriggerStorage();
  return await storage.setItem(data._id, data);
}

export type ListedTriggerWithWebhooks = ListedTrigger & {
  webhooks:(SavedWebhook|null)[];
}

export async function listTriggers(): Promise<ListedTriggerWithWebhooks[]>{
  const storage = useTriggerStorage();
  const keys = await storage.getKeys();
  const result: ListedTriggerWithWebhooks[] = [];
  for(let key of keys){
    const {hashedSecret, ...trigger} = (await storage.getItem(key))!
    const webhooks = await getLinkedWebhooks(trigger._id);
    result.push({...trigger, webhooks });
  }
  return result;
}

export async function getTrigger(triggerId: string):Promise<ListedTrigger|null>{
  const storage = useTriggerStorage();
  return await storage.getItem(triggerId);
}

export function useLinkStorage(){
  return useStorage<Record<string,string[]>>("link");
}

export async function addLinkTriggerWebhook(link: LinkTriggerWebhookRequest){
  const storage = useLinkStorage();

  const triggerKey = `trigger${link.triggerId}`;
  const webhookKey = `webhook${link.webhookId}`;

  let triggerLinks = await storage.getItem(triggerKey) ?? [];
  let webhookLinks = await storage.getItem(webhookKey) ?? [];

  triggerLinks.push(link.webhookId);
  webhookLinks.push(link.triggerId);

  await Promise.all([
      storage.setItem(triggerKey, triggerLinks),
      storage.setItem(webhookKey, webhookLinks)
  ])

}

export async function getLinkedWebhooks(triggerId: string){
  const storage = useLinkStorage();
  return await Promise.all((await storage.getItem(`trigger${triggerId}`) ?? []).map((el)=>getWebhook(el)));
}

export async function getLinkedTriggers(webhookId: string){
  const storage = useLinkStorage();
  return (await Promise.all((await storage.getItem(`webhook${webhookId}`) ?? []).map((el)=>getTrigger(el)))).map((el)=>el && {_id:el._id, name:el.name} );
}
