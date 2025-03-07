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


-- Graduation Year: 2022
INSERT INTO public.student (ktu_id, student_name, department, rit_email, phone_number, program, semester, date_of_birth, year_of_graduation, gender, cgpa, no_of_backlogs, supply_history, skills, resume_url, password)
VALUES
('KTE22CS001', 'Aiden Brown', 'CSE', '22cs54321@rit.ac.in', '9876543230', 'B Tech', 8, '2000-04-10', 2022, 'male', 8.1, 1, false, 'Machine Learning, Python', 'https://resumes.com/aiden22', 'password'),
('KTE22ME001', 'Zoe Smith', 'ME', '22me43210@rit.ac.in', '9876543231', 'B Tech', 8, '2000-06-15', 2022, 'female', 7.6, 2, true, 'CAD, 3D Printing', 'https://resumes.com/zoe22', 'password'),
('KTE22CE001', 'Lily Adams', 'CE', '22ce32109@rit.ac.in', '9876543232', 'B Tech', 8, '2000-07-20', 2022, 'female', 8.3, 0, false, 'Civil Design, BIM', 'https://resumes.com/lily22', 'password'),
('KTE22ECE001', 'Daniel Garcia', 'ECE', '22ece21098@rit.ac.in', '9876543233', 'B Tech', 8, '2000-02-10', 2022, 'male', 8.2, 0, false, 'VLSI, FPGA Design', 'https://resumes.com/daniel22', 'password'),
('KTE22EEE001', 'Ella Wilson', 'EEE', '22eee10987@rit.ac.in', '9876543234', 'B Tech', 8, '2000-09-12', 2022, 'female', 7.9, 1, false, 'Smart Grids, Renewable Energy', 'https://resumes.com/ella22', 'password'),
('KTE22RAI001', 'Chris Martinez', 'Robotics', '22rai09876@rit.ac.in', '9876543235', 'B Tech', 8, '2000-08-17', 2022, 'male', 8.5, 0, false, 'Robot Control, AI', 'https://resumes.com/chris22', 'password'),
('KTE22MCA001', 'Olivia Thompson', 'MCA', '22mca98765@rit.ac.in', '9876543236', 'MCA', 6, '1999-12-01', 2022, 'female', 9.2, 0, false, 'Software Engineering, Cloud Computing', 'https://resumes.com/olivia22', 'password'),
('KTE22MCA002', 'Lucas Hernandez', 'MCA', '22mca87654@rit.ac.in', '9876543237', 'MCA', 6, '1999-05-30', 2022, 'male', 8.7, 0, false, 'Java, SQL, Backend Development', 'https://resumes.com/lucas22', 'password'),
('KTE22CS002', 'Sophia Lopez', 'CSE', '22cs76543@rit.ac.in', '9876543238', 'B Tech', 8, '2000-03-05', 2022, 'female', 8.4, 0, false, 'Cybersecurity, Networking', 'https://resumes.com/sophia22', 'password'),
('KTE22ECE002', 'Benjamin Walker', 'ECE', '22ece65432@rit.ac.in', '9876543239', 'B Tech', 8, '2000-11-10', 2022, 'male', 8.0, 1, false, 'Embedded Systems, IoT', 'https://resumes.com/benjamin22', 'password');

-- Graduation Year: 2021
INSERT INTO public.student (ktu_id, student_name, department, rit_email, phone_number, program, semester, date_of_birth, year_of_graduation, gender, cgpa, no_of_backlogs, supply_history, skills, resume_url, password)
VALUES
('KTE21CS001', 'Ethan Carter', 'CSE', '21cs54321@rit.ac.in', '9876543240', 'B Tech', 8, '1999-01-14', 2021, 'male', 8.7, 0, false, 'AI, Python, Cloud Computing', 'https://resumes.com/ethan21', 'password'),
('KTE21ME001', 'Madison King', 'ME', '21me43210@rit.ac.in', '9876543241', 'B Tech', 8, '1999-08-15', 2021, 'female', 7.5, 2, true, 'CAD, 3D Printing', 'https://resumes.com/madison21', 'password');

-- (Repeat similar structure for 2020, ensuring unique values)

-- Graduation Year: 2025 (Future Graduating Students)
INSERT INTO public.student (ktu_id, student_name, department, rit_email, phone_number, program, semester, date_of_birth, year_of_graduation, gender, cgpa, no_of_backlogs, supply_history, skills, resume_url, password)
VALUES
('KTE25CS001', 'Ryan Stewart', 'CSE', '25cs54321@rit.ac.in', '9876543250', 'B Tech', 6, '2003-02-10', 2025, 'male', 8.9, 0, false, 'AI, Web Development', 'https://resumes.com/ryan25', 'password'),
('KTE25ME001', 'Emma Brooks', 'ME', '25me43210@rit.ac.in', '9876543251', 'B Tech', 6, '2003-09-12', 2025, 'female', 7.6, 1, false, 'Mechanical Design, Automation', 'https://resumes.com/emma25', 'password'),
('KTE25CE001', 'Liam Bennett', 'CE', '25ce32109@rit.ac.in', '9876543252', 'B Tech', 6, '2003-07-22', 2025, 'male', 8.0, 0, false, 'Structural Engineering', 'https://resumes.com/liam25', 'password'),
('KTE25ECE001', 'Mia Collins', 'ECE', '25ece21098@rit.ac.in', '9876543253', 'B Tech', 6, '2003-03-18', 2025, 'female', 8.5, 0, false, 'Embedded Systems, FPGA', 'https://resumes.com/mia25', 'password'),
('KTE25EEE001', 'Nathan Kelly', 'EEE', '25eee10987@rit.ac.in', '9876543254', 'B Tech', 6, '2003-05-24', 2025, 'male', 7.8, 1, false, 'Smart Grids, IoT', 'https://resumes.com/nathan25', 'password'),
('KTE25RAI001', 'Ava Reed', 'Robotics', '25rai09876@rit.ac.in', '9876543255', 'B Tech', 6, '2003-08-17', 2025, 'female', 8.7, 0, false, 'AI Robotics, ROS', 'https://resumes.com/ava25', 'password');

-- Graduation Year: 2022
INSERT INTO public.student (ktu_id, student_name, department, rit_email, phone_number, program, semester, date_of_birth, year_of_graduation, gender, cgpa, no_of_backlogs, supply_history, skills, resume_url, password)
VALUES
('KTE22CS001', 'Aiden Brown', 'CSE', '22cs54321@rit.ac.in', '9876543230', 'B Tech', 8, '2000-04-10', 2022, 'male', 8.1, 1, false, 'Machine Learning, Python', 'https://resumes.com/aiden22', 'password'),
('KTE22ME001', 'Zoe Smith', 'ME', '22me43210@rit.ac.in', '9876543231', 'B Tech', 8, '2000-06-15', 2022, 'female', 7.6, 2, true, 'CAD, 3D Printing', 'https://resumes.com/zoe22', 'password'),
('KTE22CE001', 'Lily Adams', 'CE', '22ce32109@rit.ac.in', '9876543232', 'B Tech', 8, '2000-07-20', 2022, 'female', 8.3, 0, false, 'Civil Design, BIM', 'https://resumes.com/lily22', 'password'),
('KTE22EC001', 'Daniel Garcia', 'ECE', '22ec21098@rit.ac.in', '9876543233', 'B Tech', 8, '2000-02-10', 2022, 'male', 8.2, 0, false, 'VLSI, FPGA Design', 'https://resumes.com/daniel22', 'password'),
('KTE22EE001', 'Ella Wilson', 'EEE', '22ee10987@rit.ac.in', '9876543234', 'B Tech', 8, '2000-09-12', 2022, 'female', 7.9, 1, false, 'Smart Grids, Renewable Energy', 'https://resumes.com/ella22', 'password'),
('KTE22RAI001', 'Chris Martinez', 'Robotics', '22ra09876@rit.ac.in', '9876543235', 'B Tech', 8, '2000-08-17', 2022, 'male', 8.5, 0, false, 'Robot Control, AI', 'https://resumes.com/chris22', 'password'),
('KTE22MCA001', 'Olivia Thompson', 'MCA', '22br98765@rit.ac.in', '9876543236', 'MCA', 6, '1999-12-01', 2022, 'female', 9.2, 0, false, 'Software Engineering, Cloud Computing', 'https://resumes.com/olivia22', 'password'),
('KTE22MCA002', 'Lucas Hernandez', 'MCA', '22br87654@rit.ac.in', '9876543237', 'MCA', 6, '1999-05-30', 2022, 'male', 8.7, 0, false, 'Java, SQL, Backend Development', 'https://resumes.com/lucas22', 'password'),
('KTE22CS002', 'Sophia Lopez', 'CSE', '22cs76543@rit.ac.in', '9876543238', 'B Tech', 8, '2000-03-05', 2022, 'female', 8.4, 0, false, 'Cybersecurity, Networking', 'https://resumes.com/sophia22', 'password'),
('KTE22EC002', 'Benjamin Walker', 'ECE', '22ec65432@rit.ac.in', '9876543239', 'B Tech', 8, '2000-11-10', 2022, 'male', 8.0, 1, false, 'Embedded Systems, IoT', 'https://resumes.com/benjamin22', 'password');

-- Graduation Year: 2021
INSERT INTO public.student (ktu_id, student_name, department, rit_email, phone_number, program, semester, date_of_birth, year_of_graduation, gender, cgpa, no_of_backlogs, supply_history, skills, resume_url, password)
VALUES
('KTE21CS001', 'Ethan Carter', 'CSE', '21cs54321@rit.ac.in', '9876543240', 'B Tech', 8, '1999-01-14', 2021, 'male', 8.7, 0, false, 'AI, Python, Cloud Computing', 'https://resumes.com/ethan21', 'password'),
('KTE21ME001', 'Madison King', 'ME', '21me43210@rit.ac.in', '9876543241', 'B Tech', 8, '1999-08-15', 2021, 'female', 7.5, 2, true, 'CAD, 3D Printing', 'https://resumes.com/madison21', 'password');

-- (Repeat similar structure for 2020, ensuring unique values)

-- Graduation Year: 2025 (Future Graduating Students)
INSERT INTO public.student (ktu_id, student_name, department, rit_email, phone_number, program, semester, date_of_birth, year_of_graduation, gender, cgpa, no_of_backlogs, supply_history, skills, resume_url, password)
VALUES
('KTE25CS001', 'Ryan Stewart', 'CSE', '25cs54321@rit.ac.in', '9876543250', 'B Tech', 6, '2003-02-10', 2025, 'male', 8.9, 0, false, 'AI, Web Development', 'https://resumes.com/ryan25', 'password'),
('KTE25ME001', 'Emma Brooks', 'ME', '25me43210@rit.ac.in', '9876543251', 'B Tech', 6, '2003-09-12', 2025, 'female', 7.6, 1, false, 'Mechanical Design, Automation', 'https://resumes.com/emma25', 'password'),
('KTE25CE001', 'Liam Bennett', 'CE', '25ce32109@rit.ac.in', '9876543252', 'B Tech', 6, '2003-07-22', 2025, 'male', 8.0, 0, false, 'Structural Engineering', 'https://resumes.com/liam25', 'password'),
('KTE25EC001', 'Mia Collins', 'ECE', '25ec21098@rit.ac.in', '9876543253', 'B Tech', 6, '2003-03-18', 2025, 'female', 8.5, 0, false, 'Embedded Systems, FPGA', 'https://resumes.com/mia25', 'password'),
('KTE25EE001', 'Nathan Kelly', 'EEE', '25ee10987@rit.ac.in', '9876543254', 'B Tech', 6, '2003-05-24', 2025, 'male', 7.8, 1, false, 'Smart Grids, IoT', 'https://resumes.com/nathan25', 'password'),
('KTE25RAI001', 'Ava Reed', 'Robotics', '25ra09876@rit.ac.in', '9876543255', 'B Tech', 6, '2003-08-17', 2025, 'female', 8.7, 0, false, 'AI Robotics, ROS', 'https://resumes.com/ava25', 'password');

INSERT INTO public.company (company_name, contact_person_name, phone_number, official_mail, address, website_link)
VALUES
('Tata Consultancy Services', 'Rajesh Kumar', '9876543201', 'contact@tcs.com', 'TCS House, Mumbai, Maharashtra, India', 'https://www.tcs.com'),

('Infosys', 'Neha Sharma', '9876543202', 'careers@infosys.com', 'Electronics City, Bangalore, Karnataka, India', 'https://www.infosys.com'),

('Larsen & Toubro', 'Amit Patil', '9876543203', 'hr@lnt.com', 'L&T House, Ballard Estate, Mumbai, India', 'https://www.larsentoubro.com'),

('Mahindra & Mahindra', 'Suresh Iyer', '9876543204', 'info@mahindra.com', 'Mahindra Towers, Worli, Mumbai, India', 'https://www.mahindra.com'),

('Havells India', 'Rakesh Gupta', '9876543205', 'support@havells.com', 'QRG Towers, Noida, Uttar Pradesh, India', 'https://www.havells.com'),

('Bosch India', 'Ananya Menon', '9876543206', 'contact@bosch.in', 'Bosch Limited, Adugodi, Bangalore, India', 'https://www.bosch.in'),

('Siemens India', 'Rahul Mehta', '9876543207', 'careers@siemens.in', 'Siemens Ltd, Mumbai, Maharashtra, India', 'https://www.siemens.com/in/en.html'),

('Tech Mahindra', 'Vikram Singh', '9876543208', 'jobs@techmahindra.com', 'Sharda Center, Pune, Maharashtra, India', 'https://www.techmahindra.com'),

('Ashok Leyland', 'Manoj Reddy', '9876543209', 'info@ashokleyland.com', 'Chennai, Tamil Nadu, India', 'https://www.ashokleyland.com'),

('ABB India', 'Pooja Nair', '9876543210', 'support@abb.com', 'ABB India Limited, Bangalore, Karnataka, India', 'https://new.abb.com/india');


-- Placement Drive Insert Queries for Companies from 2020-2025

INSERT INTO public.placement_drive (
    company_id, job_role, num_of_rounds, drive_mode, drive_type, start_date,
    no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, focused_branches,
    description, training_package, permanent_package, last_date_to_submit,
    registration_link, work_location, duration
) VALUES

-- TCS Drives
(14, 'Software Engineer', 4, 'On Campus', 'IT', '2020-08-15', 2, TRUE, 7.0, ARRAY['CSE', 'ECE', 'MCA'],
    'TCS is looking for highly skilled software engineers to work on cutting-edge projects in cloud computing, AI, and data analytics. Candidates will undergo a rigorous selection process, including aptitude tests, coding assessments, and technical interviews.',
    400000, 800000, '2020-08-10', 'https://tcs.com/register', 'Bangalore', '6 months'),
(14, 'Software Engineer', 4, 'Off Campus', 'IT', '2021-08-20', 2, TRUE, 7.0, ARRAY['CSE', 'ECE', 'MCA'],
    'TCS Off Campus hiring for fresh graduates interested in full-stack development, DevOps, and cybersecurity roles. Excellent problem-solving skills required.',
    400000, 850000, '2021-08-15', 'https://tcs.com/offcampus', 'Remote', '6 months'),

-- Infosys Drives
(15, 'System Engineer', 3, 'On Campus', 'IT', '2020-07-10', 1, TRUE, 6.5, ARRAY['CSE', 'ECE', 'MCA'],
    'Infosys hiring fresh graduates for system engineering roles focusing on enterprise solutions, machine learning models, and blockchain development. Candidates must excel in data structures, OOP, and software development life cycle.',
    350000, 750000, '2020-07-05', 'https://infosys.com/register', 'Hyderabad', '6 months'),
(15, 'Data Analyst', 3, 'Off Campus', 'IT', '2022-07-20', 1, TRUE, 6.5, ARRAY['CSE', 'ECE', 'MCA'],
    'Infosys Off Campus hiring for data analyst roles specializing in big data, analytics, and AI-driven solutions. Candidates should have expertise in Python, SQL, and Tableau.',
    370000, 800000, '2022-07-15', 'https://infosys.com/offcampus', 'Remote', '6 months'),

-- Mahindra & Mahindra Drives (Core Engineering)
(17, 'Automobile Engineer', 3, 'On Campus', 'Core', '2020-06-10', 2, TRUE, 7.5, ARRAY['ME', 'EEE'],
    'Mahindra & Mahindra is seeking automobile engineers for design, testing, and manufacturing roles in electric vehicles and smart mobility solutions.',
    450000, 950000, '2020-06-05', 'https://mahindra.com/careers', 'Pune', '6 months'),
(17, 'Mechanical Design Engineer', 3, 'Off Campus', 'Core', '2021-06-15', 2, TRUE, 7.5, ARRAY['ME', 'CE'],
    'Mahindra & Mahindra Off Campus recruitment for mechanical design engineers to work on state-of-the-art vehicle modeling, aerodynamics, and CAD/CAM-based projects.',
    460000, 980000, '2021-06-10', 'https://mahindra.com/offcampus', 'Remote', '6 months'),

-- Placement Drives for 2025 with Multiple Roles per Company
(14, 'Software Engineer', 4, 'On Campus', 'IT', '2025-09-10', 2, TRUE, 7.0, ARRAY['CSE', 'ECE', 'MCA'],
    'TCS hiring software engineers for cloud computing, AI, and microservices architecture roles. Requires knowledge of Python, Java, and DevOps practices.',
    550000, 1100000, '2025-08-31', 'https://tcs.com/register', 'Delhi', '6 months'),
(14, 'Cybersecurity Analyst', 3, 'Off Campus', 'IT', '2025-09-15', 2, TRUE, 7.0, ARRAY['CSE', 'ECE', 'MCA'],
    'TCS Off Campus hiring for cybersecurity analysts focusing on ethical hacking, risk assessment, and security compliance across banking and finance sectors.',
    600000, 1200000, '2025-09-10', 'https://tcs.com/offcampus', 'Remote', '6 months'),

(15, 'AI/ML Engineer', 4, 'On Campus', 'IT', '2025-08-10', 2, TRUE, 7.5, ARRAY['CSE', 'ECE', 'MCA'],
    'Infosys is looking for AI/ML Engineers to develop next-generation AI models for healthcare, finance, and supply chain automation.',
    650000, 1250000, '2025-07-31', 'https://infosys.com/register', 'Bangalore', '6 months'),
(15, 'Business Analyst', 3, 'Off Campus', 'IT', '2025-09-01', 2, TRUE, 7.0, ARRAY['CSE', 'ECE', 'MCA'],
    'Infosys hiring business analysts to analyze industry trends, develop dashboards, and optimize business processes using data-driven insights.',
    500000, 1100000, '2025-08-25', 'https://infosys.com/offcampus', 'Remote', '6 months');

-- Repeat for all companies listed with different roles and descriptions.
-- Inserting placement drives for all listed companies (2020-2025)
-- Including multiple job roles for 2025, mix of On-Campus and Off-Campus

-- Tata Consultancy Services (TCS)
INSERT INTO placement_drive (company_id, job_role, num_of_rounds, drive_mode, drive_type, start_date, no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, focused_branches, description, training_package, permanent_package, last_date_to_submit, registration_link, work_location, duration)
VALUES 
(14, 'Software Engineer', 3, 'On Campus', 'IT', '2025-07-15', 2, true, 6.0, '{CSE, ECE, EEE, MCA}', 'TCS is hiring talented software engineers with strong programming skills in Java, Python, and Cloud technologies.', 600000.00, 1200000.00, '2025-06-30', 'https://tcs-careers.com/apply', 'Bangalore', '6 months'),
(14, 'Data Scientist', 3, 'Off Campus', 'Dream', '2025-08-10', 1, false, 7.5, '{CSE, ECE}', 'TCS is looking for AI/ML specialists for data science roles, working on cutting-edge AI-driven solutions.', 800000.00, 1500000.00, '2025-07-25', 'https://tcs-careers.com/apply-ds', 'Hyderabad', '12 months');

-- Infosys
INSERT INTO placement_drive (company_id, job_role, num_of_rounds, drive_mode, drive_type, start_date, no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, focused_branches, description, training_package, permanent_package, last_date_to_submit, registration_link, work_location, duration)
VALUES 
(15, 'System Engineer', 2, 'On Campus', 'IT', '2024-06-20', 3, true, 5.5, '{CSE, ECE, EEE}', 'Infosys is hiring System Engineers to work on software development and testing.', 500000.00, 1100000.00, '2024-06-10', 'https://infosys-careers.com/apply', 'Pune', '6 months');

-- Larsen & Toubro
INSERT INTO placement_drive (company_id, job_role, num_of_rounds, drive_mode, drive_type, start_date, no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, focused_branches, description, training_package, permanent_package, last_date_to_submit, registration_link, work_location, duration)
VALUES 
(16, 'Civil Engineer', 3, 'On Campus', 'Core', '2023-09-25', 2, true, 6.0, '{CE}', 'L&T is hiring Civil Engineers for large-scale infrastructure projects across India.', 700000.00, 1300000.00, '2023-09-10', 'https://lnt-careers.com/apply', 'Mumbai', '12 months');

-- Mahindra & Mahindra
INSERT INTO placement_drive (company_id, job_role, num_of_rounds, drive_mode, drive_type, start_date, no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, focused_branches, description, training_package, permanent_package, last_date_to_submit, registration_link, work_location, duration)
VALUES 
(17, 'Mechanical Design Engineer', 3, 'Off Campus', 'Core', '2022-11-10', 2, false, 6.5, '{ME}', 'Mahindra is seeking Mechanical Engineers for automotive R&D projects.', 750000.00, 1400000.00, '2022-10-25', 'https://mahindra-careers.com/apply', 'Chennai', '18 months');

-- Bosch India
INSERT INTO placement_drive (company_id, job_role, num_of_rounds, drive_mode, drive_type, start_date, no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, focused_branches, description, training_package, permanent_package, last_date_to_submit, registration_link, work_location, duration)
VALUES 
(19, 'Embedded Systems Engineer', 3, 'On Campus', 'Core', '2025-07-10', 1, true, 7.0, '{ECE, EEE}', 'Bosch is hiring Embedded Systems Engineers to develop firmware for automotive systems.', 900000.00, 1600000.00, '2025-06-20', 'https://bosch-careers.com/apply', 'Bangalore', '6 months');

-- Siemens India
INSERT INTO placement_drive (company_id, job_role, num_of_rounds, drive_mode, drive_type, start_date, no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, focused_branches, description, training_package, permanent_package, last_date_to_submit, registration_link, work_location, duration)
VALUES 
(20, 'Electrical Engineer', 3, 'On Campus', 'Core', '2024-10-05', 2, true, 6.0, '{EEE, ME}', 'Siemens is hiring Electrical Engineers for automation and control system design.', 800000.00, 1400000.00, '2024-09-20', 'https://siemens-careers.com/apply', 'Gurgaon', '12 months');

-- Tech Mahindra
INSERT INTO placement_drive (company_id, job_role, num_of_rounds, drive_mode, drive_type, start_date, no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, focused_branches, description, training_package, permanent_package, last_date_to_submit, registration_link, work_location, duration)
VALUES 
(21, 'Cloud Engineer', 3, 'Off Campus', 'IT', '2025-06-15', 2, false, 6.5, '{CSE, MCA}', 'Tech Mahindra is hiring Cloud Engineers with experience in AWS and Azure for cloud-based solutions.', 700000.00, 1300000.00, '2025-06-01', 'https://techm-careers.com/apply', 'Hyderabad', '6 months');

-- First, create the function that enforces the condition
CREATE OR REPLACE FUNCTION check_round_date_validity()
RETURNS TRIGGER AS $$
DECLARE
    drive_start_date DATE;
    drive_duration INTERVAL;
BEGIN
    -- Retrieve drive_start_date and drive_duration from placement_drive
    SELECT start_date, duration INTO drive_start_date, drive_duration
    FROM placement_drive
    WHERE drive_id = NEW.drive_id;

    -- Ensure round_date is within valid range
    IF NEW.round_date <= drive_start_date OR NEW.round_date >= (drive_start_date + drive_duration) THEN
        RAISE EXCEPTION 'Round date must be greater than the drive start date and less than drive_start_date + drive duration';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Now, create the trigger to enforce this rule
CREATE TRIGGER enforce_round_date_constraint
BEFORE INSERT OR UPDATE ON placement_round
FOR EACH ROW
EXECUTE FUNCTION check_round_date_validity();

-- System Engineer (Drive ID: 34) - 4 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(34, 1, '2025-08-12', '1 hour', 'Online', 'Online', 'Aptitude'),
(34, 2, '2025-08-15', '2 hours', 'Online', 'Online', 'Case Study'),
(34, 3, '2025-08-20', '1.5 hours', 'Bangalore', 'Offline', 'Technical'),
(34, 4, '2025-08-25', '1 hour', 'Bangalore', 'Offline', 'HR');

-- System Engineer (Drive ID: 35) - 3 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(35, 1, '2024-06-25', '1 hour', 'Online', 'Online', 'Aptitude'),
(35, 2, '2024-07-01', '1.5 hours', 'Pune', 'Offline', 'Technical'),
(35, 3, '2024-07-05', '1 hour', 'Pune', 'Offline', 'HR');

-- Civil Engineer (Drive ID: 36) - 3 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(36, 1, '2023-10-01', '1 hour', 'Online', 'Online', 'Aptitude'),
(36, 2, '2023-10-07', '2 hours', 'Chennai', 'Offline', 'Domain-Specific Round'),
(36, 3, '2023-10-15', '1 hour', 'Chennai', 'Offline', 'HR');

-- Mechanical Design Engineer (Drive ID: 37) - 3 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(37, 1, '2022-11-20', '1 hour', 'Online', 'Online', 'Aptitude'),
(37, 2, '2022-11-25', '2 hours', 'Pune', 'Offline', 'Technical'),
(37, 3, '2022-12-01', '1 hour', 'Pune', 'Offline', 'HR');

-- Embedded Systems Engineer (Drive ID: 38) - 5 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(38, 1, '2025-07-20', '1 hour', 'Online', 'Online', 'Aptitude'),
(38, 2, '2025-07-22', '2 hours', 'Online', 'Online', 'Coding Test'),
(38, 3, '2025-07-25', '1.5 hours', 'Hyderabad', 'Offline', 'Technical'),
(38, 4, '2025-07-28', '1.5 hours', 'Hyderabad', 'Offline', 'System Design'),
(38, 5, '2025-08-01', '1 hour', 'Hyderabad', 'Offline', 'HR');

-- Electrical Engineer (Drive ID: 39) - 4 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(39, 1, '2024-10-10', '1 hour', 'Online', 'Online', 'Aptitude'),
(39, 2, '2024-10-15', '2 hours', 'Online', 'Online', 'Domain-Specific Round'),
(39, 3, '2024-10-20', '1.5 hours', 'Chennai', 'Offline', 'Technical'),
(39, 4, '2024-10-25', '1 hour', 'Chennai', 'Offline', 'HR');

-- Cloud Engineer (Drive ID: 40) - 4 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(40, 1, '2025-06-20', '1 hour', 'Online', 'Online', 'Aptitude'),
(40, 2, '2025-06-23', '2 hours', 'Online', 'Online', 'Coding Test'),
(40, 3, '2025-06-27', '1.5 hours', 'Bangalore', 'Offline', 'Technical'),
(40, 4, '2025-06-30', '1 hour', 'Bangalore', 'Offline', 'HR');

-- Wipro (Software Engineer) - 4 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(22, 1, '2025-03-20', '1 hour', 'Online', 'Online', 'Aptitude'),
(22, 2, '2025-03-25', '2 hours', 'Online', 'Online', 'Coding Test'),
(22, 3, '2025-03-30', '1.5 hours', 'Chennai', 'Offline', 'Technical'),
(22, 4, '2025-04-05', '1 hour', 'Chennai', 'Offline', 'HR');

-- Infosys (System Engineer) - 3 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(25, 1, '2020-07-15', '1 hour', 'Online', 'Online', 'Aptitude'),
(25, 2, '2020-07-18', '1.5 hours', 'Online', 'Online', 'Technical'),
(25, 3, '2020-07-22', '1 hour', 'Pune', 'Offline', 'HR');

-- Infosys (Data Analyst) - 3 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(26, 1, '2022-07-25', '1 hour', 'Online', 'Online', 'Aptitude'),
(26, 2, '2022-07-28', '2 hours', 'Online', 'Online', 'Case Study'),
(26, 3, '2022-08-02', '1 hour', 'Bangalore', 'Offline', 'HR');

-- Mahindra & Mahindra (Automobile Engineer) - 3 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(27, 1, '2020-06-15', '1 hour', 'Online', 'Online', 'Aptitude'),
(27, 2, '2020-06-18', '2 hours', 'Chennai', 'Offline', 'Domain-Specific Round'),
(27, 3, '2020-06-22', '1 hour', 'Chennai', 'Offline', 'HR');

-- Bosch India (Cybersecurity Analyst) - 3 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(30, 1, '2025-09-20', '1 hour', 'Online', 'Online', 'Aptitude'),
(30, 2, '2025-09-23', '2 hours', 'Online', 'Online', 'Case Study'),
(30, 3, '2025-09-27', '1 hour', 'Bangalore', 'Offline', 'HR');

-- Infosys (AI/ML Engineer) - 4 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(31, 1, '2025-08-15', '1 hour', 'Online', 'Online', 'Aptitude'),
(31, 2, '2025-08-18', '2 hours', 'Online', 'Online', 'Coding Test'),
(31, 3, '2025-08-22', '1.5 hours', 'Hyderabad', 'Offline', 'Technical'),
(31, 4, '2025-08-26', '1 hour', 'Hyderabad', 'Offline', 'HR');

-- Infosys (Business Analyst) - 3 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(32, 1, '2025-09-05', '1 hour', 'Online', 'Online', 'Aptitude'),
(32, 2, '2025-09-08', '2 hours', 'Online', 'Online', 'Case Study'),
(32, 3, '2025-09-12', '1 hour', 'Pune', 'Offline', 'HR');

-- Tata Consultancy Services (Software Engineer) - 4 Rounds
INSERT INTO placement_round (drive_id, round_number, round_date, duration, location, mode, round_name)
VALUES 
(33, 1, '2025-07-20', '1 hour', 'Online', 'Online', 'Aptitude'),
(33, 2, '2025-07-23', '2 hours', 'Online', 'Online', 'Coding Test'),
(33, 3, '2025-07-27', '1.5 hours', 'Bangalore', 'Offline', 'Technical'),
(33, 4, '2025-07-31', '1 hour', 'Bangalore', 'Offline', 'HR');

ALTER TABLE student ADD COLUMN created_at TIMESTAMP DEFAULT NOW();

UPDATE student
SET created_at = MAKE_DATE(year_of_graduation - 1, 6, 1);

ALTER TABLE student ADD COLUMN expires_at TIMESTAMP GENERATED ALWAYS AS (created_at + INTERVAL '1 year') STORED;

CREATE OR REPLACE FUNCTION prevent_created_at_update()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.created_at IS DISTINCT FROM NEW.created_at THEN
        RAISE EXCEPTION 'created_at cannot be modified';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_prevent_created_at_update
BEFORE UPDATE ON student
FOR EACH ROW
EXECUTE FUNCTION prevent_created_at_update();


CREATE OR REPLACE FUNCTION update_drive_result()
RETURNS TRIGGER AS $$
DECLARE
    total_rounds INT;
    existing_result TEXT;
BEGIN
    -- Check if the student failed any round
    IF NEW.status = 'Not Cleared' THEN
        INSERT INTO drive_result (drive_id, ktu_id, result)
        VALUES (NEW.drive_id, NEW.ktu_id, 'Not Selected')
        ON CONFLICT (drive_id, ktu_id) 
        DO UPDATE SET result = 'Not Selected';
        RETURN NEW;
    END IF;

    -- Fetch the total number of rounds for this drive
    SELECT num_of_rounds INTO total_rounds
    FROM placement_drive
    WHERE drive_id = NEW.drive_id;

    -- If the student cleared the last round, mark them as Selected
    IF NEW.round_number = total_rounds AND NEW.status = 'Cleared' THEN
        -- Check if the student is already marked as Not Selected
        SELECT result INTO existing_result 
        FROM drive_result 
        WHERE drive_id = NEW.drive_id AND ktu_id = NEW.ktu_id;

        -- Update or Insert only if they are not marked as "Not Selected"
        IF existing_result IS DISTINCT FROM 'Not Selected' THEN
            INSERT INTO drive_result (drive_id, ktu_id, result)
            VALUES (NEW.drive_id, NEW.ktu_id, 'Selected')
            ON CONFLICT (drive_id, ktu_id) 
            DO UPDATE SET result = 'Selected';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to round_result
CREATE TRIGGER trg_update_drive_result
AFTER INSERT OR UPDATE ON round_result
FOR EACH ROW
EXECUTE FUNCTION update_drive_result();

DO $$ 
DECLARE 
    rec RECORD;
    round_no INT;
    student_status TEXT;
BEGIN 
    -- Loop through each registered student
    FOR rec IN select ktu_id,dr.drive_id,num_of_rounds
	from drive_registered dr join placement_drive pd on dr.drive_id=pd.drive_id
	where pd.start_date+duration<=NOW() LOOP
        round_no := 1;  -- Start from round 1

        -- Insert results for each round up to num_of_rounds
        WHILE round_no <= rec.num_of_rounds LOOP
            -- Randomly assign 'Cleared' or 'Not Cleared' (Modify as needed)
            student_status := CASE WHEN RANDOM() > 0.4 THEN 'Cleared' ELSE 'Not Cleared' END;
            
            -- Insert into round_result table
            INSERT INTO round_result (drive_id, round_number, ktu_id, status)
            VALUES (rec.drive_id, round_no, rec.ktu_id, student_status);

            -- If student is "Not Cleared", stop inserting further rounds
            IF student_status = 'Not Cleared' THEN
                EXIT;  -- Stop inserting rounds for this student
            END IF;

            -- Move to the next round
            round_no := round_no + 1;
        END LOOP;
    END LOOP;
END $$;

DROP TRIGGER IF EXISTS trg_update_drive_result ON round_result;
