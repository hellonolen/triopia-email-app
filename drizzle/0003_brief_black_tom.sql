CREATE TABLE `activity_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`action` varchar(100) NOT NULL,
	`resource` varchar(100),
	`resource_id` varchar(255),
	`metadata` json,
	`ip_address` varchar(45),
	`user_agent` varchar(500),
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `activity_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `api_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`name` varchar(100) NOT NULL,
	`token` varchar(255) NOT NULL,
	`scopes` json DEFAULT ('[]'),
	`last_used_at` datetime,
	`expires_at` datetime,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `api_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `api_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `feature_flags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`enabled` boolean DEFAULT false,
	`rollout_percentage` int DEFAULT 0,
	`conditions` json,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `feature_flags_id` PRIMARY KEY(`id`),
	CONSTRAINT `feature_flags_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255),
	`type` varchar(50) NOT NULL,
	`message` text NOT NULL,
	`rating` int,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `feedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`subscription_id` int,
	`amount` int NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`status` varchar(50) NOT NULL,
	`paid_at` datetime,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_preferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`email_enabled` boolean DEFAULT true,
	`push_enabled` boolean DEFAULT true,
	`in_app_enabled` boolean DEFAULT true,
	`preferences` json DEFAULT ('{}'),
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `notification_preferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `notification_preferences_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`is_read` boolean DEFAULT false,
	`action_url` varchar(500),
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` text,
	`permissions` json DEFAULT ('[]'),
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`plan_id` varchar(100) NOT NULL,
	`status` varchar(50) NOT NULL,
	`current_period_start` datetime,
	`current_period_end` datetime,
	`cancel_at_period_end` boolean DEFAULT false,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`status` varchar(50) DEFAULT 'open',
	`priority` varchar(50) DEFAULT 'medium',
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_consents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`consent_type` varchar(100) NOT NULL,
	`granted` boolean NOT NULL,
	`version` varchar(50),
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `user_consents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`role_id` int NOT NULL,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `webhooks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`url` varchar(500) NOT NULL,
	`events` json DEFAULT ('[]'),
	`secret` varchar(255) NOT NULL,
	`enabled` boolean DEFAULT true,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `webhooks_id` PRIMARY KEY(`id`)
);
