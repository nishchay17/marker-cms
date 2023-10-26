CREATE TABLE `repos` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `repos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `repos__userId__idx` ON `repos` (`userId`);