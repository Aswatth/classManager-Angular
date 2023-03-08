package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionModel;
import com.example.classManagerBackend.Models.StudentModel;
//import com.example.classManagerBackend.Repos.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService
{
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    SessionService sessionService;

    public List<StudentModel> AddStudent(StudentModel studentModel)
    {
        String insertQuery = """
        INSERT INTO Student(StudentName, SchoolName, ClassName, BoardName, Location, StudentPhNum, ParentPhNum1, ParentPhNum2)
        VALUES(?,?,?,?,?,?,?,?)
        """;
        jdbcTemplate.update(insertQuery, studentModel.getStudentName(), studentModel.getSchoolName(),studentModel.getClassName(), studentModel.getBoardName(), studentModel.getLocation(), studentModel.getStudentPhNum(), studentModel.getParentPhNum1(), studentModel.getParentPhNum2());

        int insertedStudentId = jdbcTemplate.queryForObject("SELECT IDENT_CURRENT('student')", Integer.class);

        sessionService.AddSessions(studentModel.getsessionList(), insertedStudentId);

        return GetAllStudents();
    }

    public List<StudentModel> GetAllStudents(){
        List<StudentModel> studentList = jdbcTemplate.query("SELECT * FROM Student", (rs, rowNum)-> new StudentModel(
                rs.getInt("Id"),
                rs.getString("StudentName"),
                rs.getString("SchoolName"),
                rs.getString("ClassName"),
                rs.getString("BoardName"),
                rs.getString("Location"),
                rs.getString("StudentPhNum"),
                rs.getString("ParentPhNum1"),
                rs.getString("ParentPhNum2")
        ));

        studentList.stream().forEach(e -> {
            e.setsessionList(sessionService.GetSessions(e.getId()));
        });

        return studentList;
    }

    public List<StudentModel> DeleteStudent(int id)
    {
        String query = """
                DELETE FROM Student WHERE Id = ?
                """;
        jdbcTemplate.update(query, new Object[]{id});
        return GetAllStudents();
    }

    public void UpdateStudent(int studentId, StudentModel newStudentModel){
        String query = """
                UPDATE Student 
                SET 
                    StudentName = ?,
                     SchoolName = ?,
                     ClassName = ?,
                     BoardName = ?,
                     Location = ?,
                     StudentPhNum = ?,
                     ParentPhNum1 = ?,
                     ParentPhNum2 = ?
                    WHERE Id = ?
                """;
        jdbcTemplate.update(query,
                newStudentModel.getStudentName(),
                newStudentModel.getSchoolName(),
                newStudentModel.getClassName(),
                newStudentModel.getBoardName(),
                newStudentModel.getLocation(),
                newStudentModel.getStudentPhNum(),
                newStudentModel.getParentPhNum1(),
                newStudentModel.getParentPhNum2(),
                studentId
        );

        sessionService.UpdateSession(newStudentModel.getsessionList(), studentId);
    }
}
