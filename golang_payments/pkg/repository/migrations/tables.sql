CREATE SEQUENCE IF NOT EXISTS public.users_card_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.users_card_id_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.users_card
(
    id bigint NOT NULL DEFAULT nextval('users_card_id_seq'::regclass),
    user_id bigint NOT NULL,
    card_synonym character varying(30) COLLATE pg_catalog."default" NOT NULL,
    card_mask character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT users_card_pkey PRIMARY KEY (id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users_card
    OWNER to postgres;