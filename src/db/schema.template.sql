-- config
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


SET default_tablespace = '';
SET default_table_access_method = heap;

-- Name: todos; Type: TABLE; Schema: public; Owner: ${DB_USER}
CREATE TABLE public.todos (
    id integer NOT NULL,
    user_id integer,
    title text NOT NULL,
    completed boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deadline timestamp
);


ALTER TABLE public.todos OWNER TO ${DB_USER};

-- idx for deadline queries
CREATE INDEX deadline_idx ON public.todos(deadline);

-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: ${DB_USER}
CREATE SEQUENCE public.todos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todos_id_seq OWNER TO ${DB_USER};

-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ${DB_USER}
ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;

-- Name: users; Type: TABLE; Schema: public; Owner: ${DB_USER}
CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO ${DB_USER};

-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ${DB_USER}
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO ${DB_USER};

-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ${DB_USER}
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

-- Name: todos id; Type: DEFAULT; Schema: public; Owner: ${DB_USER}
ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);

-- Name: users id; Type: DEFAULT; Schema: public; Owner: ${DB_USER}
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: ${DB_USER}
ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);

-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ${DB_USER}
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: ${DB_USER}
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);

-- Name: todos todos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ${DB_USER}
ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

-- psql ${DB_USER} < src/db/schema.sql
-- BASH FOR UPDATES
-- dropdb todo_db
-- createdb todo_db
-- psql todo_db < src/db/schema.sql