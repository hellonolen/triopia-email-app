CREATE TABLE `emailTemplates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`subject` varchar(500),
	`body` text NOT NULL,
	`category` varchar(100),
	`isDefault` int NOT NULL DEFAULT 0,
	`usageCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `emailTemplates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `snoozedEmails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailId` int NOT NULL,
	`snoozeUntil` timestamp NOT NULL,
	`reminderSent` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `snoozedEmails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailNotifications` int NOT NULL DEFAULT 1,
	`desktopNotifications` int NOT NULL DEFAULT 1,
	`soundEnabled` int NOT NULL DEFAULT 1,
	`notifyOnImportant` int NOT NULL DEFAULT 1,
	`notifyOnMentions` int NOT NULL DEFAULT 1,
	`theme` enum('light','dark','auto') DEFAULT 'light',
	`emailsPerPage` int NOT NULL DEFAULT 50,
	`showPreview` int NOT NULL DEFAULT 1,
	`compactView` int NOT NULL DEFAULT 0,
	`readReceipts` int NOT NULL DEFAULT 0,
	`allowTracking` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userPreferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `userPreferences_userId_unique` UNIQUE(`userId`)
);
