CREATE TABLE company(
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL UNIQUE,
    contact_person_name VARCHAR(255),
    phone_number VARCHAR(15),
    official_mail VARCHAR(255) UNIQUE NOT NULL,
    address TEXT,
    website_link VARCHAR(255)
);
CREATE TABLE placement_drive (
    drive_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    job_role VARCHAR(255) NOT NULL,
    num_of_rounds INT CHECK (num_of_rounds > 0),
    package DECIMAL(10,2) CHECK (package >= 0),
    drive_mode VARCHAR(20) CHECK (drive_mode IN ('On Campus', 'Off Campus')),
    drive_type VARCHAR(10) CHECK (drive_type IN ('Dream', 'Open', 'Core', 'IT')),
    start_date DATE NOT NULL,
    no_of_backlogs_permitted INT CHECK (no_of_backlogs_permitted >= 0),
    supply_history_allowed BOOLEAN NOT NULL,
    min_cgpa_required DECIMAL(3,2) CHECK (min_cgpa_required BETWEEN 0 AND 10),
    focused_branches TEXT[] NOT NULL,
	description TEXT,
    UNIQUE (company_id, job_role, start_date),
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE
);


CREATE TABLE placement_round (
    drive_id INT NOT NULL,
    round_number INT NOT NULL,
    round_name VARCHAR(50) NOT NULL CHECK (round_name IN ('Aptitude', 'Technical', 'HR', 'Group Discussion', 'Coding Test',
        'System Design', 'Case Study', 'Puzzle Round', 'Managerial Round',
        'Domain-Specific Round')),
    round_date DATE NOT NULL,
    duration INTERVAL NOT NULL,
    location VARCHAR(255),
    mode VARCHAR(10) CHECK (mode IN ('Online', 'Offline')),
    PRIMARY KEY (drive_id, round_number),
    FOREIGN KEY (drive_id) REFERENCES placement_drive(drive_id) ON DELETE CASCADE
);

CREATE TABLE drive_result (
    drive_id INT NOT NULL,
    ktu_id VARCHAR(10) NOT NULL CHECK (
        ktu_id ~ '^(KTE|LKTE|IDK)\d{2}(CS|ME|CE|EC|EE|RAI|MCA)\d{3}$'
    ),
    result VARCHAR(20) NOT NULL CHECK (result IN ('Selected', 'Not Selected')),
    PRIMARY KEY (drive_id, ktu_id),
    FOREIGN KEY (drive_id) REFERENCES placement_drive(drive_id) ON DELETE CASCADE,
    FOREIGN KEY (ktu_id) REFERENCES student(ktu_id) ON DELETE CASCADE
);

CREATE TABLE round_result (
    drive_id INT NOT NULL,
    round_number INT NOT NULL,
    ktu_id VARCHAR(10) NOT NULL CHECK (
        ktu_id ~ '^(KTE|LKTE|IDK)\d{2}(CS|ME|CE|EC|EE|RAI|MCA)\d{3}$'
    ),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Cleared', 'Not Cleared')),
    PRIMARY KEY (drive_id, round_number, ktu_id),
    FOREIGN KEY (drive_id, round_number) REFERENCES placement_round(drive_id, round_number) ON DELETE CASCADE,
    FOREIGN KEY (ktu_id) REFERENCES student(ktu_id) ON DELETE CASCADE
);

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
    sgpa numeric(4,2)[],
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