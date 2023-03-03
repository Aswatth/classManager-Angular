package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionModel;
import com.example.classManagerBackend.Repos.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService implements ISessionService
{
    @Autowired
    SessionRepo sessionRepo;

    @Override
    public void AddSessions(List<SessionModel> sessionModelList, int studentId)
    {
        for(int i=0; i< sessionModelList.stream().count(); ++i)
        {
            sessionModelList.get(i).setStudentId(studentId);
            sessionRepo.save(sessionModelList.get(i));
        }
    }

    @Override
    public void DeleteSession(SessionModel sessionModel)
    {
        sessionRepo.delete(sessionModel);
    }

    public void DeleteSessionBySubject(String subject, int studentId){
        sessionRepo.delete(sessionRepo.findBySubjectAndStudentId(subject, studentId));
    }

    @Override
    public double TotalFees()
    {
        return sessionRepo.totalFees();
    }
}
