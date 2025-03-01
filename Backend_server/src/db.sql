-- Table: public.company

-- DROP TABLE IF EXISTS public.company;

CREATE TABLE IF NOT EXISTS public.company
(
    company_id integer NOT NULL DEFAULT nextval('company_company_id_seq'::regclass),
    company_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    contact_person_name character varying(255) COLLATE pg_catalog."default",
    phone_number character varying(15) COLLATE pg_catalog."default",
    official_mail character varying(255) COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default",
    website_link character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT company_pkey PRIMARY KEY (company_id),
    CONSTRAINT company_company_name_key UNIQUE (company_name),
    CONSTRAINT company_official_mail_key UNIQUE (official_mail),
    CONSTRAINT company_mobile_number_check CHECK (phone_number::text ~ '^[0-9]+$'::text)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.company
    OWNER to postgres;

-- Table: public.student

-- DROP TABLE IF EXISTS public.student;

CREATE TABLE IF NOT EXISTS public.student
(
    ktu_id character varying(11) COLLATE pg_catalog."default" NOT NULL,
    student_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    department character varying(100) COLLATE pg_catalog."default",
    rit_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(15) COLLATE pg_catalog."default" NOT NULL,
    program character varying(10) COLLATE pg_catalog."default",
    semester integer,
    date_of_birth date,
    year_of_graduation integer,
    gender character varying(10) COLLATE pg_catalog."default",
    cgpa numeric(4,2),
    no_of_backlogs integer,
    supply_history boolean,
    skills text COLLATE pg_catalog."default",
    resume_url text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    CONSTRAINT student_reg_pkey PRIMARY KEY (ktu_id),
    CONSTRAINT student_reg_email_key UNIQUE (rit_email),
    CONSTRAINT student_reg_phone_number_key UNIQUE (phone_number),
    CONSTRAINT password_length_check CHECK (length(password) >= 8),
    CONSTRAINT student_mobile_number_check CHECK (phone_number::text ~ '^[0-9]+$'::text),
    CONSTRAINT student_reg_cgpa_check CHECK (cgpa >= 0.00 AND cgpa <= 10.00),
    CONSTRAINT student_reg_email_check CHECK (rit_email::text ~ '^\d{2}[a-zA-Z]{2}\d{5}@rit\.ac\.in$'::text),
    CONSTRAINT student_reg_gender_check CHECK (gender::text = ANY (ARRAY['male'::character varying, 'female'::character varying, 'others'::character varying]::text[])),
    CONSTRAINT student_reg_ktu_id_check CHECK (ktu_id::text ~ '^(KTE|LKTE|IDK)\d{2}(CS|ME|CE|EC|EE|RAI|MCA)\d{3}$'::text),
    CONSTRAINT student_reg_no_of_backlogs_check CHECK (no_of_backlogs >= 0),
    CONSTRAINT student_reg_program_check CHECK (program::text = ANY (ARRAY['B Tech'::character varying, 'M Tech'::character varying, 'MCA'::character varying, 'B Arch'::character varying, 'PHD'::character varying]::text[])),
    CONSTRAINT student_reg_semester_check CHECK (semester >= 1 AND semester <= 10),
    CONSTRAINT student_reg_year_of_graduation_check CHECK (year_of_graduation::numeric >= EXTRACT(year FROM CURRENT_DATE))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.student
    OWNER to postgres;

-- Table: public.placement_drive

-- DROP TABLE IF EXISTS public.placement_drive;

CREATE TABLE IF NOT EXISTS public.placement_drive
(
    drive_id integer NOT NULL DEFAULT nextval('placement_drive_drive_id_seq'::regclass),
    company_id integer NOT NULL,
    job_role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    num_of_rounds integer,
    drive_mode character varying(20) COLLATE pg_catalog."default",
    drive_type character varying(10) COLLATE pg_catalog."default",
    start_date date NOT NULL,
    no_of_backlogs_permitted integer,
    supply_history_allowed boolean NOT NULL,
    min_cgpa_required numeric(3,2),
    focused_branches text[] COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    training_package numeric(10,2),
    permanent_package numeric(10,2),
    last_date_to_submit date NOT NULL,
    registration_link text COLLATE pg_catalog."default" NOT NULL,
    work_location character varying(255) COLLATE pg_catalog."default" NOT NULL,
    duration interval,
    CONSTRAINT placement_drive_pkey PRIMARY KEY (drive_id),
    CONSTRAINT placement_drive_company_id_job_role_start_date_key UNIQUE (company_id, job_role, start_date),
    CONSTRAINT placement_drive_company_id_fkey FOREIGN KEY (company_id)
        REFERENCES public.company (company_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT placement_drive_drive_mode_check CHECK (drive_mode::text = ANY (ARRAY['On Campus'::character varying, 'Off Campus'::character varying]::text[])),
    CONSTRAINT placement_drive_drive_type_check CHECK (drive_type::text = ANY (ARRAY['Dream'::character varying, 'Open'::character varying, 'Core'::character varying, 'IT'::character varying]::text[])),
    CONSTRAINT placement_drive_min_cgpa_required_check CHECK (min_cgpa_required >= 0::numeric AND min_cgpa_required <= 10::numeric),
    CONSTRAINT placement_drive_no_of_backlogs_permitted_check CHECK (no_of_backlogs_permitted >= 0),
    CONSTRAINT placement_drive_num_of_rounds_check CHECK (num_of_rounds > 0),
    CONSTRAINT placement_drive_permanent_package_check CHECK (permanent_package >= 0::numeric),
    CONSTRAINT placement_drive_training_package_check CHECK (training_package >= 0::numeric)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.placement_drive
    OWNER to postgres;

-- Table: public.placement_round

-- DROP TABLE IF EXISTS public.placement_round;

CREATE TABLE IF NOT EXISTS public.placement_round
(
    drive_id integer NOT NULL,
    round_number integer NOT NULL,
    round_date date NOT NULL,
    duration interval NOT NULL,
    location character varying(255) COLLATE pg_catalog."default",
    mode character varying(10) COLLATE pg_catalog."default",
    round_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT placement_round_pkey PRIMARY KEY (drive_id, round_number),
    CONSTRAINT placement_round_drive_id_fkey FOREIGN KEY (drive_id)
        REFERENCES public.placement_drive (drive_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT placement_round_mode_check CHECK (mode::text = ANY (ARRAY['Online'::character varying, 'Offline'::character varying]::text[])),
    CONSTRAINT placement_round_new_round_name_check CHECK (round_name::text = ANY (ARRAY['Aptitude'::character varying, 'Interview'::character varying, 'Technical'::character varying, 'HR'::character varying, 'Group Discussion'::character varying, 'Coding Test'::character varying, 'System Design'::character varying, 'Case Study'::character varying, 'Puzzle Round'::character varying, 'Managerial Round'::character varying, 'Domain-Specific Round'::character varying, 'Others'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.placement_round
    OWNER to postgres;

-- Table: public.drive_registered

-- DROP TABLE IF EXISTS public.drive_registered;

CREATE TABLE IF NOT EXISTS public.drive_registered
(
    drive_id integer NOT NULL,
    ktu_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT drive_registered_pkey PRIMARY KEY (drive_id, ktu_id),
    CONSTRAINT drive_registered_drive_id_fkey FOREIGN KEY (drive_id)
        REFERENCES public.placement_drive (drive_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT drive_registered_ktu_id_fkey FOREIGN KEY (ktu_id)
        REFERENCES public.student (ktu_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT drive_registered_ktu_id_check CHECK (ktu_id::text ~ '^(KTE|LKTE|IDK)\d{2}(CS|ME|CE|EC|EE|RAI|MCA)\d{3}$'::text)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.drive_registered
    OWNER to postgres;

-- Table: public.drive_result

-- DROP TABLE IF EXISTS public.drive_result;

CREATE TABLE IF NOT EXISTS public.drive_result
(
    drive_id integer NOT NULL,
    ktu_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    result character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT drive_result_pkey PRIMARY KEY (drive_id, ktu_id),
    CONSTRAINT drive_result_drive_id_fkey FOREIGN KEY (drive_id)
        REFERENCES public.placement_drive (drive_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT drive_result_drive_registered_fk FOREIGN KEY (drive_id, ktu_id)
        REFERENCES public.drive_registered (drive_id, ktu_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT drive_result_ktu_id_fkey FOREIGN KEY (ktu_id)
        REFERENCES public.student (ktu_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT drive_result_ktu_id_check CHECK (ktu_id::text ~ '^(KTE|LKTE|IDK)\d{2}(CS|ME|CE|EC|EE|RAI|MCA)\d{3}$'::text),
    CONSTRAINT drive_result_result_check CHECK (result::text = ANY (ARRAY['Selected'::character varying, 'Not Selected'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.drive_result
    OWNER to postgres;

-- Table: public.round_result

-- DROP TABLE IF EXISTS public.round_result;

CREATE TABLE IF NOT EXISTS public.round_result
(
    drive_id integer NOT NULL,
    round_number integer NOT NULL,
    ktu_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT round_result_pkey PRIMARY KEY (drive_id, round_number, ktu_id),
    CONSTRAINT round_result_drive_id_round_number_fkey FOREIGN KEY (drive_id, round_number)
        REFERENCES public.placement_round (drive_id, round_number) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT round_result_drive_registered_fk FOREIGN KEY (drive_id, ktu_id)
        REFERENCES public.drive_registered (drive_id, ktu_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT round_result_ktu_id_fkey FOREIGN KEY (ktu_id)
        REFERENCES public.student (ktu_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT round_result_ktu_id_check CHECK (ktu_id::text ~ '^(KTE|LKTE|IDK)\d{2}(CS|ME|CE|EC|EE|RAI|MCA)\d{3}$'::text),
    CONSTRAINT round_result_status_check CHECK (status::text = ANY (ARRAY['Cleared'::character varying, 'Not Cleared'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.round_result
    OWNER to postgres;



    CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('placement officer', 'internship coordinator', 'placement coordinator')) NOT NULL
);


INSERT INTO admins (name, email, password, phone, role)
VALUES 
('John Doe', 'johndoe@college.edu', 'securepassword', '1234567890', 'placement officer'),
('Jane Smith', 'janesmith@college.edu', 'securepassword2', '0987654321', 'internship coordinator'),
('Mark Lee', 'marklee@college.edu', 'securepassword3', '1122334455', 'placement coordinator');


