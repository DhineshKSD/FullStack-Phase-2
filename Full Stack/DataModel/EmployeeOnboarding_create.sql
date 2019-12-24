-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-12-24 05:22:35.43

-- tables
-- Table: Address
CREATE TABLE Address (
    Address_id int  NOT NULL,
    PersonalInfo_id int  NOT NULL,
    AddressCode varchar(10)  NOT NULL,
    Address nvarchar(max)  NOT NULL,
    City nvarchar(max)  NOT NULL,
    State nvarchar(max)  NOT NULL,
    Country nvarchar(max)  NOT NULL,
    CONSTRAINT Address_pk PRIMARY KEY  (Address_id)
);

-- Table: Document
CREATE TABLE Document (
    Document_id int  NOT NULL,
    Employee_id int  NOT NULL,
    DocumentCode varchar(10)  NOT NULL,
    DocumentPath nvarchar(max)  NULL,
    DocumentDescription nvarchar(max)  NOT NULL,
    DocumentType nvarchar(max)  NULL,
    Data varbinary(max)  NULL,
    CONSTRAINT Document_pk PRIMARY KEY  (Document_id)
);

-- Table: Education
CREATE TABLE Education (
    Education_id int  NOT NULL,
    Employee_id int  NOT NULL,
    Course nvarchar(max)  NOT NULL,
    Institute nvarchar(max)  NOT NULL,
    GradePoint float(5)  NOT NULL,
    "From" date  NOT NULL,
    "To" date  NOT NULL,
    YearOfPassing bigint  NOT NULL,
    CONSTRAINT Education_pk PRIMARY KEY  (Education_id)
);

-- Table: Employee
CREATE TABLE Employee (
    Employee_id int  NOT NULL,
    FirstName varchar(30)  NOT NULL,
    LastName varchar(30)  NOT NULL,
    PersonalEmail nvarchar(max)  NOT NULL,
    Contact bigint  NOT NULL,
    JobTitle nvarchar(max)  NOT NULL,
    Department nvarchar(max)  NOT NULL,
    Compensation bigint  NOT NULL,
    DOJ date  NOT NULL,
    UserName nvarchar(max)  NOT NULL,
    Password nvarchar(max)  NOT NULL,
    ReportingTo nvarchar(max)  NOT NULL,
    isAdmin bit  NOT NULL,
    CONSTRAINT Employee_pk PRIMARY KEY  (Employee_id)
);

-- Table: PersonalInfo
CREATE TABLE PersonalInfo (
    PersonalInfo_id int  NOT NULL,
    Employee_id int  NOT NULL,
    Gender varchar(10)  NOT NULL,
    DateOfBirth date  NOT NULL,
    PlaceOfBirth nvarchar(max)  NOT NULL,
    MaritalStatus varchar(10)  NOT NULL,
    BloodGroup varchar(10)  NOT NULL,
    CONSTRAINT PersonalInfo_pk PRIMARY KEY  (PersonalInfo_id)
);

-- Table: PreviousEmployment
CREATE TABLE PreviousEmployment (
    PreviousEmployment_id int  NOT NULL,
    Employee_id int  NOT NULL,
    EmployerName nvarchar(max)  NULL,
    StartDate date  NULL,
    EndDate date  NULL,
    Designation nvarchar(max)  NULL,
    Salary bigint  NULL,
    CONSTRAINT PreviousEmployment_pk PRIMARY KEY  (PreviousEmployment_id)
);

-- Table: Proof
CREATE TABLE Proof (
    Proof_id int  NOT NULL,
    Employee_id int  NOT NULL,
    ProofCode varchar(10)  NOT NULL,
    ProofName nvarchar(max)  NOT NULL,
    ProofId nvarchar(max)  NOT NULL,
    CONSTRAINT Proof_pk PRIMARY KEY  (Proof_id)
);

-- foreign keys
-- Reference: Address_PersonalInfo (table: Address)
ALTER TABLE Address ADD CONSTRAINT Address_PersonalInfo
    FOREIGN KEY (PersonalInfo_id)
    REFERENCES PersonalInfo (PersonalInfo_id);

-- Reference: BackgroundCheck_NewRecruit (table: Document)
ALTER TABLE Document ADD CONSTRAINT BackgroundCheck_NewRecruit
    FOREIGN KEY (Employee_id)
    REFERENCES Employee (Employee_id);

-- Reference: Education_NewRecruit (table: Education)
ALTER TABLE Education ADD CONSTRAINT Education_NewRecruit
    FOREIGN KEY (Employee_id)
    REFERENCES Employee (Employee_id);

-- Reference: PersonalInfo_NewRecruit (table: PersonalInfo)
ALTER TABLE PersonalInfo ADD CONSTRAINT PersonalInfo_NewRecruit
    FOREIGN KEY (Employee_id)
    REFERENCES Employee (Employee_id);

-- Reference: PreviousEmployment_NewRecruit (table: PreviousEmployment)
ALTER TABLE PreviousEmployment ADD CONSTRAINT PreviousEmployment_NewRecruit
    FOREIGN KEY (Employee_id)
    REFERENCES Employee (Employee_id);

-- Reference: Proof_Employee (table: Proof)
ALTER TABLE Proof ADD CONSTRAINT Proof_Employee
    FOREIGN KEY (Employee_id)
    REFERENCES Employee (Employee_id);

-- End of file.

