DROP TABLE IF EXISTS `passwordresets`;
DROP TABLE IF EXISTS `friends`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` integer(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `users`
(`username`, `password`, `email`)
VALUES
('zbrezi', 'a1d9a9e99e70ece06f6ef5782627cac869db9754ac6dfab01ff47900def77f581b562e6f82be47887ff9c0d58e2f0a622d396a472f07caea2ddaf83c77bff689', 'zachr@saltechsystems.com');

CREATE TABLE `passwordresets` (
    `id` integer(11) NOT NULL AUTO_INCREMENT,
    `code` varchar(255) NOT NULL,
    `userid` integer(11) NOT NULL,
    `expires` datetime NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userid`) REFERENCES `users`(`id`)
);

CREATE TABLE `friends` (
    `id` integer(11) NOT NULL AUTO_INCREMENT,
    `fromuserid` integer(11) NOT NULL,
    `touserid` integer(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`fromuserid`) REFERENCES `users`(`id`),
    FOREIGN KEY (`touserid`) REFERENCES `users`(`id`)
);