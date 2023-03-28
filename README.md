# ClassManager-Angular
An Angular application for class-manangement with spring boot.

# Features
- Add/ Remove student information
- Assign/ Delete sessions for each student
- Track fees for each student
- Track tests for each student 

## Home page
Title-bar has the following information:
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

After clicking on <i> Add Student </i> button, a popup appears for adding personal information of the student.

<img src="/Images/Add student/addStudent-PersonalInfo.png" width=500 height=250>

The next button will be enabled only when all mandatory information is entered is valid.
<img src="/Images/Add student/personalInfo-Filled.png" width=500 height=250>

After clicking on <i> Next </i> button, the popup navigates to the session details page where a session can be:
- Created
- Deleted
- Updated (if a subject already exists the existing session data is updated else a new session is created)
<img src="/Images/Add student/sessionInfo.png" width=500 height=250>

The button with check icon is enabled only when all the details has been updated with valid data.
The next button will be enabled only when atleast one session has been created for the student.

<img src="/Images/Add student/sessionInfo-filled.png" width=500 height=250>

After clicking on <i> Next </i> from session details it moves on to review and submit page where user can validate entered information.
If changes are required user can navigate back to the respective page and make valid changes.

<img src="/Images/Add student/review-submit.png" width=500 height=250>

After clicking on submit:

<img src="/Images/Add student/after-submit.png" width=500 height=250>
The submitted information will be successfully saved in the backend with a pop-up confirmation and will be displayed in the student-table and the title-bar will display updated student count and total fees.

## Editing added student:
Clicking on the particular student record will navigate to the student details page where all information related to the selected student will be displayed:

<img src="/Images/Edit student/student-detail.png" width=500 height=250>

### Editing personal information 
By clicking on edit icon in <i>Perfonal infor</i> card/tile personal information can be edited and saved.
The popup is pre-populated with existing information which will be replaced with the new changes.
<i>Save</i> button will be enabled only when all values are valid.

<img src="/Images/Edit student/editing-personalInfo.png" width=500 height=250>

After saving changes:

<img src="/Images/Edit student/update-personalInfo.png" width=500 height=250>

### Editing sesion infomation
By clicking on edit icon in <i>Sessions</i> card/tile session details can be edited and saved.
The popup contains existing session information.
Clicking on existing session data will populate the respective data into the fields which can then be used to update existing data or create new session data.
<i>Save</i> button will be enabled only when all values are valid.
<img src="/Images/Edit student/edit-session.png" width=500 height=250>
<img src="/Images/Edit student/edit-session-2.png" width=500 height=250>

After saving changes:

<img src="/Images/Edit student/update-session.png" width=500 height=250>

### Adding tests
Tests can be added for for each session's subject for a student.
By clicking plus icon on the '+' icon in  <i>Test details</i> card/tile a popup appears for entering test information.
<i> Add test </i> button will be enabled only when all values are valid.
<img src="/Images/Edit student/add-test.png" width=500 height=250>
<img src="/Images/Edit student/add-test-2.png" width=500 height=250>

After successfully adding test:

<img src="/Images/Edit student/added-test.png" width=500 height=250>

Navigating back to homepage will display the student record with updated personal and session information:

<img src="/Images/Edit student/updated-homepage.png" width=500 height=250>
