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
    round_name VARCHAR(50) NOT NULL CHECK (round_name IN ('Aptitude', 'Interview','Technical', 'HR', 'Group Discussion', 'Coding Test',
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

ALTER TABLE placement_drive 
DROP COLUMN package,
ADD COLUMN training_package DECIMAL(10,2) CHECK (training_package >= 0),
ADD COLUMN permanent_package DECIMAL(10,2) CHECK (permanent_package >= 0),
ADD COLUMN last_date_to_submit DATE NOT NULL,
ADD COLUMN registration_link TEXT NOT NULL,
ADD COLUMN work_location VARCHAR(255) NOT NULL;

ALTER TABLE placement_drive 
ADD COLUMN duration INTERVAL;

INSERT INTO company (
    company_name, contact_person_name, phone_number, official_mail, address, website_link
) VALUES
    ('Google', 'Sundar Pichai', '6502530000', 'careers@google.com', '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA', 'https://careers.google.com'),
    
    ('Microsoft', 'Satya Nadella', '4258828080', 'jobs@microsoft.com', 'One Microsoft Way, Redmond, WA 98052, USA', 'https://careers.microsoft.com'),
    
    ('Amazon', 'Andy Jassy', '206266000', 'hiring@amazon.com', '410 Terry Ave N, Seattle, WA 98109, USA', 'https://www.amazon.jobs'),
    
    ('Tesla', 'Elon Musk', '3104201234', 'careers@tesla.com', '3500 Deer Creek Road, Palo Alto, CA 94304, USA', 'https://www.tesla.com/careers'),
    
    ('Infosys', 'Salil Parekh', '8028520261', 'jobs@infosys.com', 'Electronics City, Bangalore, Karnataka, India', 'https://www.infosys.com/careers');


INSERT INTO placement_drive (
    company_id, job_role, num_of_rounds, training_package, permanent_package, 
    drive_mode, drive_type, start_date, last_date_to_submit, 
    no_of_backlogs_permitted, supply_history_allowed, min_cgpa_required, 
    focused_branches, registration_link, work_location, description
) VALUES
    (6, 'Software Engineer', 4, 6.50, 12.50, 'On Campus', 'Dream', 
     '2025-06-15', '2025-06-10', 1, FALSE, 8.0, ARRAY['CSE', 'IT'], 
     'https://example.com/register1', 'Bangalore', 'Hiring for software engineering roles.'),
     
    (8, 'Data Analyst', 3, 5.00, 9.80, 'Off Campus', 'Open', 
     '2025-07-10', '2025-07-05', 2, TRUE, 7.5, ARRAY['CSE', 'ECE', 'EEE'], 
     'https://example.com/register2', 'Hyderabad', 'Looking for skilled data analysts with SQL and Python knowledge.'),
     
    (9, 'Embedded Systems Engineer', 5, 7.00, 14.25, 'On Campus', 'Core', 
     '2025-05-20', '2025-05-15', 0, FALSE, 8.5, ARRAY['ECE', 'EEE'], 
     'https://example.com/register3', 'Chennai', 'Hiring for embedded development in automotive domain.'),
     
    (10, 'Full Stack Developer', 4, 6.00, 10.00, 'On Campus', 'IT', 
     '2025-08-05', '2025-08-01', 3, TRUE, 7.0, ARRAY['CSE', 'IT', 'MCA'], 
     'https://example.com/register4', 'Pune', 'Hiring developers for web applications.'),
     
    (11, 'Cybersecurity Analyst', 3, 6.80, 11.20, 'Off Campus', 'Dream', 
     '2025-06-25', '2025-06-20', 1, FALSE, 8.2, ARRAY['CSE', 'IT'], 
     'https://example.com/register5', 'Delhi', 'Seeking cybersecurity analysts with ethical hacking skills.');


INSERT INTO drive_result (drive_id, ktu_id, result)  
VALUES  
    (15, 'KTE24CS025', 'Not Selected'),  -- The student is placed in drive_id 1
    (16, 'KTE24CS025', 'Not Selected'),  
    (17, 'KTE24CS025', 'Not Selected'),  
    (18, 'KTE24CS025', 'Not Selected'),  
    (19, 'KTE24CS025', 'Selected');  


CREATE TABLE drive_registered (
    drive_id INT NOT NULL,
    ktu_id VARCHAR(10) NOT NULL CHECK (
        ktu_id ~ '^(KTE|LKTE|IDK)\d{2}(CS|ME|CE|EC|EE|RAI|MCA)\d{3}$'
    ),
    PRIMARY KEY (drive_id, ktu_id),
    FOREIGN KEY (drive_id) REFERENCES placement_drive(drive_id) ON DELETE CASCADE,
    FOREIGN KEY (ktu_id) REFERENCES student(ktu_id) ON DELETE CASCADE
);