ALTER TABLE `api_tokens` MODIFY COLUMN `scopes` json;--> statement-breakpoint
ALTER TABLE `notification_preferences` MODIFY COLUMN `preferences` json;--> statement-breakpoint
ALTER TABLE `roles` MODIFY COLUMN `permissions` json;--> statement-breakpoint
ALTER TABLE `webhooks` MODIFY COLUMN `events` json;