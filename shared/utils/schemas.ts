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
  _id: _z.string().uuid(),
  name: _z.string().min(1).max(255),
  hashedSecret: _z.string().max(128),
});

export const savedTriggerSchema = _z.intersection(baseIDSchema, baseTriggerSchema);

export type TriggerRequest = TypeOf<typeof baseTriggerSchema>;
export type SavedTrigger = TypeOf<typeof savedTriggerSchema>;


