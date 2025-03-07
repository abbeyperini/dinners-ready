import type {TypeOf} from "zod"

export const baseIDSchema = _z.object({
  _id: _z.string().uuid()
});

export const baseWebhookSchema = _z.object({
  name: _z.string().min(1).max(255),
  callback: _z.string().url().max(1024),
  secret: _z.string().max(255),
})

export const savedWebhookSchema = _z.intersection(baseIDSchema, baseWebhookSchema);

export type WebhookRequest = TypeOf<typeof baseWebhookSchema>;
export type SavedWebhook = TypeOf<typeof savedWebhookSchema>;

export const baseTriggerSchema = _z.object({
  name: _z.string().min(1).max(255),
});

export const listedTriggerSchema = _z.intersection(baseIDSchema, baseTriggerSchema)

export const savedTriggerSchema = listedTriggerSchema
    .and(_z.object({
      hashedSecret: _z.string().max(128),
    }));

export const createdTriggerSchema = listedTriggerSchema
    .and(_z.object({
      secret: _z.string().max(128),
    }));



export type TriggerRequest = TypeOf<typeof baseTriggerSchema>;
export type ListedTrigger = TypeOf<typeof listedTriggerSchema>;
export type SavedTrigger = TypeOf<typeof savedTriggerSchema>;
export type CreatedTrigger = TypeOf<typeof createdTriggerSchema>;


export const linkTriggerWebhookSchema = _z.object({
  triggerId: _z.string().uuid(),
  webhookId: _z.string().uuid(),
});

export type LinkTriggerWebhookRequest = TypeOf<typeof linkTriggerWebhookSchema>;
