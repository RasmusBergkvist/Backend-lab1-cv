--
-- PostgreSQL database dump
--

\restrict WjqXb5YBu13DcSPTjYcUnHpCrEQ8XYSl2Reny943eFvPIt7FsWYmTl5jL2Vd0mb

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg12+1)
-- Dumped by pg_dump version 18.2

-- Started on 2026-04-16 11:46:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16438)
-- Name: courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    coursecode character varying(10),
    coursename character varying(50),
    syllabus text,
    progression character varying(15),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 219 (class 1259 OID 16437)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 219
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- TOC entry 3229 (class 2604 OID 16441)
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- TOC entry 3383 (class 0 OID 16438)
-- Dependencies: 220
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.courses (id, coursecode, coursename, syllabus, progression, created_at) FROM stdin;
1	DT057G	Webbutveckling I	https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/	A	2026-04-16 08:48:52.914081
2	DT084G	Introduktion till programmering i JavaScript	https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/	A	2026-04-16 08:50:01.280249
3	DT200G	Grafisk teknik för webb	https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/	A	2026-04-16 08:51:38.200434
4	DT068G	Webbanvändbarhet	https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/	B	2026-04-16 08:53:10.242257
5	DT003G	Databaser	https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/	A	2026-04-16 08:54:21.251251
6	DT211G	Frontend-baserad webbutveckling	https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT211G/	B	2026-04-16 08:55:28.698501
7	DT207G	Backend-baserad webbutveckling	https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/	B	2026-04-16 08:56:10.625072
8	DT208G	Programmering i TypeScript	https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/	B	2026-04-16 08:57:01.537269
\.


--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 219
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.courses_id_seq', 8, true);


--
-- TOC entry 3232 (class 2606 OID 16449)
-- Name: courses courses_coursecode_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_coursecode_key UNIQUE (coursecode);


--
-- TOC entry 3234 (class 2606 OID 16447)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 2053 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO dt207g_lab_cv_user;


--
-- TOC entry 2055 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO dt207g_lab_cv_user;


--
-- TOC entry 2054 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO dt207g_lab_cv_user;


--
-- TOC entry 2052 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO dt207g_lab_cv_user;


-- Completed on 2026-04-16 11:47:09

--
-- PostgreSQL database dump complete
--

\unrestrict WjqXb5YBu13DcSPTjYcUnHpCrEQ8XYSl2Reny943eFvPIt7FsWYmTl5jL2Vd0mb

