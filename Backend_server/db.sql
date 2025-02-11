/*create table for registerd students*/

CREATE TABLE student_registration (
    ktuId VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    year_of_study INT CHECK (year_of_study BETWEEN 1 AND 4),
    course VARCHAR(50) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    cgpa DECIMAL(3,2) CHECK (cgpa BETWEEN 0 AND 10),
    program VARCHAR(50) NOT NULL,
    ritMail VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    dob DATE NOT NULL
);

/*Insert some Random Values*/

INSERT INTO student_registration 
(ktuId, name, gender, year_of_study, course, branch, cgpa, program, ritMail, phone_number, password, dob)
VALUES
('23BR15644', 'Rahul Sharma', 'Male', 3, 'B.Tech', 'Computer Science', 8.5, 'Engineering', 'rahul@rit.edu', '9876543210', 'hashed_password_1', '2002-06-15'),
('22BR12333', 'Anjali Nair', 'Female', 2, 'B.Tech', 'Electronics', 7.8, 'Engineering', 'anjali@rit.edu', '9876543211', 'hashed_password_2', '2003-08-22'),
('21BR14567', 'Vikram Raj', 'Male', 4, 'B.Tech', 'Mechanical', 8.0, 'Engineering', 'vikram@rit.edu', '9876543212', 'hashed_password_3', '2001-12-10'),
('23BR16789', 'Priya Menon', 'Female', 1, 'B.Tech', 'Civil', 7.2, 'Engineering', 'priya@rit.edu', '9876543213', 'hashed_password_4', '2004-05-18'),
('22BR13456', 'Aakash Kumar', 'Male', 2, 'B.Tech', 'Electrical', 8.1, 'Engineering', 'aakash@rit.edu', '9876543214', 'hashed_password_5', '2003-07-30');
