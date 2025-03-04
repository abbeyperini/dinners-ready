
export function useWebhookStorage(){
  return useStorage<SavedWebhook>("webhook");
}

export async function saveWebhook(data: SavedWebhook){
  const storage = useWebhookStorage();
  return await storage.setItem(data._id, data);
}

export async function listWebhooks(): Promise<SavedWebhook[]>{
  const storage = useWebhookStorage();
  const keys = await storage.getKeys();
  const result: SavedWebhook[] = [];
  for(let key of keys){
    result.push((await storage.getItem(key))!);
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

export async function listTriggers(): Promise<SavedTrigger[]>{
  const storage = useTriggerStorage();
  const keys = await storage.getKeys();
  const result: SavedTrigger[] = [];
  for(let key of keys){
    result.push((await storage.getItem(key))!);
  }
  return result;
}
