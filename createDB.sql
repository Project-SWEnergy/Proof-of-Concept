-- Adminer 4.8.1 PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) dump

DROP TABLE IF EXISTS "allergene";
CREATE TABLE "public"."allergene" (
    "id_ingrediente" integer NOT NULL,
    "allergene" allergene_enum NOT NULL,
    "foto" json,
    CONSTRAINT "allergene_id_ingrediente_allergene_pk" PRIMARY KEY ("id_ingrediente", "allergene")
) WITH (oids = false);


DROP TABLE IF EXISTS "allergia";
CREATE TABLE "public"."allergia" (
    "id_utente" integer NOT NULL,
    "allergene" allergene_enum NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "citta";
DROP SEQUENCE IF EXISTS citta_id_seq;
CREATE SEQUENCE citta_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."citta" (
    "id" integer DEFAULT nextval('citta_id_seq') NOT NULL,
    "nome" character varying(100) NOT NULL,
    CONSTRAINT "citta_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "citta" ("id", "nome") VALUES
(1,	'Padova');

DROP TABLE IF EXISTS "composizione";
CREATE TABLE "public"."composizione" (
    "id_piatto" integer NOT NULL,
    "id_ingrediente" integer NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "cucina";
CREATE TABLE "public"."cucina" (
    "id_tag" integer NOT NULL,
    "id_ristorante" integer NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "ingrediente";
DROP SEQUENCE IF EXISTS ingrediente_id_seq;
CREATE SEQUENCE ingrediente_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."ingrediente" (
    "id" integer DEFAULT nextval('ingrediente_id_seq') NOT NULL,
    "nome" character varying(100) NOT NULL,
    "descrizione" character varying(255),
    "foto" json,
    CONSTRAINT "ingrediente_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "orario";
CREATE TABLE "public"."orario" (
    "id_ristorante" integer NOT NULL,
    "giorno" giorno_enum NOT NULL,
    "apertura" time without time zone NOT NULL,
    "chiusura" time without time zone NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "ordinazione";
CREATE TABLE "public"."ordinazione" (
    "id_prenotazione" integer NOT NULL,
    "id_utente" integer NOT NULL,
    "id_piatto" integer NOT NULL,
    "quantita" integer NOT NULL,
    CONSTRAINT "ordinazione_id_utente_id_prenotazione_id_piatto_pk" PRIMARY KEY ("id_utente", "id_prenotazione", "id_piatto")
) WITH (oids = false);

INSERT INTO "ordinazione" ("id_prenotazione", "id_utente", "id_piatto", "quantita") VALUES
(4,	1,	6,	1),
(4,	1,	9,	1),
(4,	1,	7,	8),
(5,	1,	6,	1),
(5,	1,	9,	1),
(5,	1,	7,	8);

DROP TABLE IF EXISTS "piatto";
DROP SEQUENCE IF EXISTS piatto_id_seq;
CREATE SEQUENCE piatto_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."piatto" (
    "id" integer DEFAULT nextval('piatto_id_seq') NOT NULL,
    "nome" character varying(100) NOT NULL,
    "descrizione" character varying(511),
    "prezzo" real NOT NULL,
    "foto" json,
    "id_ristorante" integer NOT NULL,
    CONSTRAINT "piatto_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "piatto" ("id", "nome", "descrizione", "prezzo", "foto", "id_ristorante") VALUES
(6,	'Pizza',	'Pizza with tomato and cheese',	5,	'{}',	2),
(7,	'Hamburger',	'Hamburger with cheese and bacon',	4,	'{"url": "https://www.my-personaltrainer.it/2020/09/07/hamburger_900x760.jpeg"}',	2),
(8,	'Salad',	'Salad with tomato and cheese',	3,	'{"url": "https://www.eatingwell.com/thmb/rmLlvSjdnJCCy_7iqqj3x7XS72c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chopped-power-salad-with-chicken-0ad93f1931524a679c0f8854d74e6e57.jpg"}',	2),
(9,	'Pasta',	'Pasta with tomato and cheese',	2,	'{"url": "https://media-assets.lacucinaitaliana.it/photos/6426da66217d19c609f6f4f8/16:9/w_2560%2Cc_limit/GettyImages-522387318.jpg"}',	2),
(10,	'Kebab',	'kebab',	6,	'{"url": "https://recipesblob.paneangeli.it/assets/43df75bae33b4c71a9e66072f96b6f0f/1272x764/kebabjpg.jpg"}',	2);

DROP TABLE IF EXISTS "prenotazione";
DROP SEQUENCE IF EXISTS prenotazione_id_seq;
CREATE SEQUENCE prenotazione_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."prenotazione" (
    "id" integer DEFAULT nextval('prenotazione_id_seq') NOT NULL,
    "id_ristorante" integer NOT NULL,
    "data_e_ora" timestamp NOT NULL,
    "numero_persone" integer NOT NULL,
    "stato" stato_ordine_enum NOT NULL,
    "bimbi" integer DEFAULT '0' NOT NULL,
    "disabili" boolean DEFAULT false NOT NULL,
    CONSTRAINT "prenotazione_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "prenotazione" ("id", "id_ristorante", "data_e_ora", "numero_persone", "stato", "bimbi", "disabili") VALUES
(1,	2,	'2024-01-11 10:43:42.999',	0,	'Da confermare',	0,	'f'),
(2,	2,	'2024-01-11 10:44:58.777',	4,	'Da confermare',	0,	'f'),
(3,	2,	'2024-01-11 10:57:58.953',	0,	'Da confermare',	0,	'f'),
(4,	2,	'2024-01-11 11:37:03.283',	0,	'Da confermare',	0,	'f'),
(5,	2,	'2024-01-11 11:37:54.567',	0,	'Da confermare',	0,	'f');

DROP TABLE IF EXISTS "prenotazione_utente";
CREATE TABLE "public"."prenotazione_utente" (
    "id_utente" integer NOT NULL,
    "id_prenotazione" integer NOT NULL
) WITH (oids = false);

INSERT INTO "prenotazione_utente" ("id_utente", "id_prenotazione") VALUES
(1,	1),
(1,	2),
(1,	3),
(1,	4),
(1,	5);

DROP TABLE IF EXISTS "ristorante";
CREATE TABLE "public"."ristorante" (
    "id" integer NOT NULL,
    "nome" character varying(100) NOT NULL,
    "citta" integer NOT NULL,
    "indirizzo" character varying(255) NOT NULL,
    "foto" json,
    "telefono" character varying(10),
    "website" character varying(255),
    "sedie_per_bambini" boolean,
    "adatto_ai_disabili" boolean,
    "descrizione" character varying(511),
    CONSTRAINT "ristorante_indirizzo_unique" UNIQUE ("indirizzo"),
    CONSTRAINT "ristorante_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "ristorante" ("id", "nome", "citta", "indirizzo", "foto", "telefono", "website", "sedie_per_bambini", "adatto_ai_disabili", "descrizione") VALUES
(2,	'Ristorante Uno',	1,	'Via Example 1',	'{"url": "https://img.freepik.com/premium-photo/example-restaurants-interior_872147-839.jpg"}',	'1234567890',	'http://ristoranteuno.com',	't',	'f',	'Un ristorante accogliente con cucina italiana.');

DROP TABLE IF EXISTS "tag";
DROP SEQUENCE IF EXISTS tag_id_seq;
CREATE SEQUENCE tag_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tag" (
    "id" integer DEFAULT nextval('tag_id_seq') NOT NULL,
    "nome" character varying(50) NOT NULL,
    "descrizione" character varying(255),
    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "utente";
DROP SEQUENCE IF EXISTS utente_id_seq;
CREATE SEQUENCE utente_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."utente" (
    "id" integer DEFAULT nextval('utente_id_seq') NOT NULL,
    "email" character varying(255) NOT NULL,
    "username" character varying(100) NOT NULL,
    "password" character varying(255) NOT NULL,
    CONSTRAINT "utente_email_unique" UNIQUE ("email"),
    CONSTRAINT "utente_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "utente" ("id", "email", "username", "password") VALUES
(1,	'cliente',	'cliente',	'cliente'),
(2,	'ristoratore',	'ristoratore',	'ristoratore');

ALTER TABLE ONLY "public"."allergene" ADD CONSTRAINT "allergene_id_ingrediente_ingrediente_id_fk" FOREIGN KEY (id_ingrediente) REFERENCES ingrediente(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."allergia" ADD CONSTRAINT "allergia_id_utente_utente_id_fk" FOREIGN KEY (id_utente) REFERENCES utente(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."composizione" ADD CONSTRAINT "composizione_id_ingrediente_ingrediente_id_fk" FOREIGN KEY (id_ingrediente) REFERENCES ingrediente(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."composizione" ADD CONSTRAINT "composizione_id_piatto_piatto_id_fk" FOREIGN KEY (id_piatto) REFERENCES piatto(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."cucina" ADD CONSTRAINT "cucina_id_ristorante_ristorante_id_fk" FOREIGN KEY (id_ristorante) REFERENCES ristorante(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."cucina" ADD CONSTRAINT "cucina_id_tag_tag_id_fk" FOREIGN KEY (id_tag) REFERENCES tag(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."orario" ADD CONSTRAINT "orario_id_ristorante_ristorante_id_fk" FOREIGN KEY (id_ristorante) REFERENCES ristorante(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."ordinazione" ADD CONSTRAINT "ordinazione_id_piatto_piatto_id_fk" FOREIGN KEY (id_piatto) REFERENCES piatto(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."ordinazione" ADD CONSTRAINT "ordinazione_id_prenotazione_prenotazione_id_fk" FOREIGN KEY (id_prenotazione) REFERENCES prenotazione(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."ordinazione" ADD CONSTRAINT "ordinazione_id_utente_utente_id_fk" FOREIGN KEY (id_utente) REFERENCES utente(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."piatto" ADD CONSTRAINT "piatto_id_ristorante_ristorante_id_fk" FOREIGN KEY (id_ristorante) REFERENCES ristorante(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."prenotazione" ADD CONSTRAINT "prenotazione_id_ristorante_ristorante_id_fk" FOREIGN KEY (id_ristorante) REFERENCES ristorante(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."prenotazione_utente" ADD CONSTRAINT "prenotazione_utente_id_prenotazione_prenotazione_id_fk" FOREIGN KEY (id_prenotazione) REFERENCES prenotazione(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."prenotazione_utente" ADD CONSTRAINT "prenotazione_utente_id_utente_utente_id_fk" FOREIGN KEY (id_utente) REFERENCES utente(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."ristorante" ADD CONSTRAINT "ristorante_citta_citta_id_fk" FOREIGN KEY (citta) REFERENCES citta(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."ristorante" ADD CONSTRAINT "ristorante_id_utente_id_fk" FOREIGN KEY (id) REFERENCES utente(id) NOT DEFERRABLE;

-- 2024-01-11 17:56:08.098291+00
