export const Schema = `
CREATE TABLE Departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    head_of_department VARCHAR(100),
    building VARCHAR(100)
);

-- Students
CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    admission_date DATE NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- Courses
CREATE TABLE Courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    department_id INT,
    semester INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- Instructors
CREATE TABLE Instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- Classrooms
CREATE TABLE Classrooms (
    classroom_id INT AUTO_INCREMENT PRIMARY KEY,
    building VARCHAR(100),
    room_number VARCHAR(10),
    capacity INT NOT NULL
);

-- Subjects
CREATE TABLE Subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- Enrollments
CREATE TABLE Enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATE NOT NULL,
    status ENUM('Active', 'Completed', 'Dropped') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- Exams
CREATE TABLE Exams (
    exam_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id INT,
    exam_date DATE NOT NULL,
    duration TIME NOT NULL,
    classroom_id INT,
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
    FOREIGN KEY (classroom_id) REFERENCES Classrooms(classroom_id)
);

-- Exam Results
CREATE TABLE ExamResults (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    exam_id INT,
    marks DECIMAL(5, 2),
    grade VARCHAR(2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (exam_id) REFERENCES Exams(exam_id)
);

-- Attendance
CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject_id INT,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);

-- Fees
CREATE TABLE Fees (
    fee_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('Paid', 'Unpaid') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- LibraryBooks
CREATE TABLE LibraryBooks (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published_year YEAR NOT NULL,
    subject_id INT,
    availability BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
);

-- BookBorrowing
CREATE TABLE BookBorrowing (
    borrowing_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    book_id INT,
    borrow_date DATE NOT NULL,
    return_date DATE,
    status ENUM('Returned', 'Pending') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (book_id) REFERENCES LibraryBooks(book_id)
);

-- Hostel Details
CREATE TABLE HostelDetails (
    hostel_id INT AUTO_INCREMENT PRIMARY KEY,
    hostel_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    warden VARCHAR(100),
    capacity INT NOT NULL
);

-- Hostel Allotments
CREATE TABLE HostelAllotments (
    allotment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    hostel_id INT,
    room_number VARCHAR(10),
    allotment_date DATE NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (hostel_id) REFERENCES HostelDetails(hostel_id)
);

`;
