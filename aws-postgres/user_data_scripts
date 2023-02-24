DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
	user_id SERIAL PRIMARY KEY UNIQUE NOT NULL,
	username VARCHAR (50) UNIQUE NOT NULL,
	password VARCHAR (255) NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	phone VARCHAR (255),
	devices JSON
);

INSERT INTO accounts (user_id, username, password, email, phone, devices)
	VALUES (
		123,
		'testadelaidemonitor22',
		'4c675d6c850671365be1516a31c8a895dab3be4e9c925e731a5f1c555fa0e487',
		'testadelaidemonitor22@gmail.com',
		'0401617079',
		'{"devices": ["demo_1", "demo_2", "demo_3", "demo_4", "demo_5", "demo-01"]}'
	);

SELECT * FROM accounts;