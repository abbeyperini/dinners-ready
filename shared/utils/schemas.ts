import type {TypeOf} from "zod"

export const baseIDSchema = _z.object({
  _id: _z.string().uuid()
});

export const baseWebhookSchema = _z.object({
  name: _z.string().min(1).max(255),
  callback: _z.string().url().max(255),
  secret: _z.string().max(255),
})

export const savedWebhookSchema = _z.intersection(baseIDSchema, baseWebhookSchema);

export type WebhookRequest = TypeOf<typeof baseWebhookSchema>;
export type SavedWebhook = TypeOf<typeof savedWebhookSchema>;

export const baseTriggerSchema = _z.object({
  name: _z.string().min(1).max(255),

});

export const savedTriggerSchema = _z.intersection(baseIDSchema, baseTriggerSchema)
    .and(_z.object({
      hashedSecret: _z.string().max(128),
    }));

export const createdTriggerSchema = _z.intersection(baseIDSchema, baseTriggerSchema)
    .and(_z.object({
      secret: _z.string().max(128),
    }));

export type TriggerRequest = TypeOf<typeof baseTriggerSchema>;
export type SavedTrigger = TypeOf<typeof savedTriggerSchema>;
export type CreatedTrigger = TypeOf<typeof createdTriggerSchema>;


