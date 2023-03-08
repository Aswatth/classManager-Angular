-- Student Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='student' and xtype='U')
CREATE TABLE Student (
				Id INT NOT NULL IDENTITY(1,1),
				StudentName VARCHAR (25),
				SchoolName VARCHAR (25),
				ClassName VARCHAR (10),
				BoardName VARCHAR (10),
				Location VARCHAR (25),
				StudentPhNum VARCHAR (25),
				ParentPhNum1 VARCHAR (25),
				ParentPhNum2 VARCHAR (25),
				PRIMARY KEY (Id)
				)

--Session Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='session' and xtype='U')
CREATE TABLE Session (
				Subject VARCHAR(25) NOT NULL,
				StudentId INT,
				Days VARCHAR(100),
				StartTime VARCHAR(25),
				EndTime VARCHAR(25),
				Fees FLOAT,
				PRIMARY KEY (Subject, StudentId),
				FOREIGN KEY (StudentId) REFERENCES Student(Id)
				ON DELETE CASCADE
				)


