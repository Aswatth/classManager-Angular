package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionModel;
/*import com.example.classManagerBackend.Repos.SessionRepo;*/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SessionService
{
    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<SessionModel> GetSessions(int studentId)
    {
        String query = """
                SELECT * FROM Session WHERE StudentId = ?
                """;
        return jdbcTemplate.query(query, new Object[]{studentId},(rs, rowNum) -> new SessionModel(
                rs.getString("Subject"),
                rs.getInt("StudentId"),
                rs.getString("Days"),
                rs.getString("StartTime"),
                rs.getString("EndTime"),
                rs.getFloat("Fees")
        ));
    }

    public Optional<SessionModel> GetSession(String subject, int studentId)
    {
        String query = """
                SELECT * FROM Session WHERE Subject = ? AND StudentId = ? 
                """;
        return jdbcTemplate.query(query, new Object[]{subject, studentId}, (rs, rowNum) -> new SessionModel(
                rs.getString("Subject"),
                rs.getInt("StudentId"),
                rs.getString("Days"),
                rs.getString("StartTime"),
                rs.getString("EndTime"),
                rs.getFloat("Fees")
        )).stream().findFirst();
    }

    public void UpdateSession(List<SessionModel> sessionModelList, int studentId)
    {
        List<SessionModel> sessionToAdd = sessionModelList.stream().collect(Collectors.toList());

        List<String> existingSessionSubject = GetSessions(studentId).stream().map(m->m.getSubject()).collect(Collectors.toList());

        System.out.println(sessionModelList.stream().toList());

        //Check if a record exists for Subject-StudentId combination
        sessionModelList.stream().forEach(e -> {

            //Update if record already exists
            if(existingSessionSubject.contains(e.getSubject()))
            {
                String query = """
                        UPDATE Session
                        SET StartTime = ?,
                        EndTime = ?,
                        Days = ?,
                        Fees = ?
                        WHERE Subject = ? AND StudentId = ?
                        """;
                jdbcTemplate.update(query, e.getStartTime(), e.getEndTime(), String.join(",", e.getDays()), e.getFees(), e.getSubject(), studentId);
                sessionToAdd.remove(e);
                existingSessionSubject.remove(e.getSubject());
            }
        });

        //Add pending sessions
        if(sessionToAdd.size() > 0)
            AddSessions(sessionToAdd, studentId);

        //Delete old sessions
        if(existingSessionSubject.size() > 0)
        {
            existingSessionSubject.stream().forEach(e->{
                Optional<SessionModel> sessionModel = GetSession(e, studentId);
                if(sessionModel.isPresent())
                {
                    DeleteSession(sessionModel.get(), studentId);
                }
            });
        }
    }

    public void AddSessions(List<SessionModel> sessionModelList, int studentId)
    {
        String insertQuery = """
                INSERT INTO Session(Subject, StudentId, Days, StartTime, EndTime, Fees)
                VALUES(?,?,?,?,?,?)
                """;

        jdbcTemplate.batchUpdate(insertQuery, new BatchPreparedStatementSetter()
        {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException
            {
                SessionModel sessionModel = sessionModelList.get(i);
                ps.setString(1, sessionModel.getSubject());
                ps.setInt(2, studentId);
                ps.setString(3, String.join(",", sessionModel.getDays()));
                ps.setString(4, sessionModel.getStartTime());
                ps.setString(5, sessionModel.getEndTime());
                ps.setFloat(6, sessionModel.getFees());
            }

            @Override
            public int getBatchSize()
            {
                return sessionModelList.size();
            }
        });
    }

    public void DeleteSession(SessionModel sessionModel)
    {
        DeleteSession(sessionModel, sessionModel.getStudentId());
    }

    public void DeleteSession(SessionModel sessionModel, int studentId)
    {
        String query = """
                DELETE FROM Session WHERE Subject = ? AND StudentId = ?
                """;
        jdbcTemplate.update(query, sessionModel.getSubject(), studentId);
    }
}
