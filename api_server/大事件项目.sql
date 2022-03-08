CREATE TABLE `ev_users` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE COMMENT "id",
	`username` VARCHAR (255) NOT NULL UNIQUE COMMENT "用户名",
	`password` VARCHAR (255) NOT NULL COMMENT "密码",
	`nickname` VARCHAR (255) NULL COMMENT "昵称",
	`email` VARCHAR (255) NULL COMMENT "邮箱",
	`user_pic` text NULL COMMENT "用户头像",
	PRIMARY KEY (`id`)
);