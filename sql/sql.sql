DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` integer(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS `passwordresets`;
CREATE TABLE `passwordresets` (
    `id` integer(11) NOT NULL AUTO_INCREMENT,
    `code` varchar(255) NOT NULL,
    `userid` integer(11) NOT NULL,
    `expires` datetime NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id)
);

