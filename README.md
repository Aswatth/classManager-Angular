# ClassManager-Angular
An Angular application for class-manangement with spring boot

# Features
- Add/ Remove student information
- Assign/ Delete sessions for each student
- Track fees for each student
- Track tests for each student 

## Home page
Toolbar has the following information:
- Title
- Total number of students
- Total fees
- Icon to export as excel data
- Icon to import excel data
Followed by table showing list of students along with their respective session details and a trash icon to delete the student data. 
<img src="/Images/homepage.png" width=500 height=250>

## Adding new student
Adding a new student consists of 3 steps:
- Personal info of student
- Session details
- Review and submit

After click on <b> Add Student <b> button, a popup appears for adding personal information of the student
<img src="/Images/addStudent-PersonalInfo.png" width=500 height=250>
The next button will be enabled only when all mandatory information is entered is valid:
<img src="/Images/personalInfo-Filled.png" width=500 height=250>
