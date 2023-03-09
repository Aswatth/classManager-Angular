package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionModel;
import com.example.classManagerBackend.Repos.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SessionService implements ISessionService
{
    @Autowired
    SessionRepo sessionRepo;

    @Override
    public void AddSessions(List<SessionModel> sessionModelList, int studentId)
    {
        sessionModelList.stream().forEach(e -> {
            e.setStudentId(studentId);

            if(!sessionRepo.findBySubjectAndStudentId(e.getSubject(), studentId).isPresent())
            {
                sessionRepo.save(e);
            }
        });

        /*for(int i=0; i< sessionModelList.stream().count(); ++i)
        {
            sessionModelList.get(i).setStudentId(studentId);

            Optional<SessionModel> existingSession = sessionRepo.findBySubjectAndStudentId(sessionModelList.get(i).getSubject(), studentId);

            if(existingSession.isPresent())
            {
                //Update existing session
                int sessionId = existingSession.get().getStudentId();
                sessionModelList.get(i).setId(sessionId);

                sessionRepo.save(sessionModelList.get(i));
            }
            else
            {
                //Add new session
                sessionRepo.save(sessionModelList.get(i));
            }
        }*/
    }

    public void UpdateSession(int studentId, List<SessionModel> sessionModelList)
    {
        List<SessionModel> sessionsToAdd = sessionModelList.stream().collect(Collectors.toList());
        List<String> existingSessionSubject = sessionRepo.findByStudentId(studentId).stream().map(m->m.getSubject()).collect(Collectors.toList());

        sessionModelList.stream().forEach(e -> {
            e.setStudentId(studentId);
            //Update existing session records
            if(existingSessionSubject.contains(e.getSubject()))
            {
                sessionRepo.save(e);
                sessionsToAdd.remove(e);
                existingSessionSubject.remove(e.getSubject());
            }
        });

        //Add new sessions
        if(sessionsToAdd.size() > 0)
            AddSessions(sessionsToAdd, studentId);

        if(existingSessionSubject.size() > 0)
        {
            existingSessionSubject.stream().forEach(e -> {
                DeleteSessionBySubject(e, studentId);
            });
        }
    }

    @Override
    public void DeleteSession(SessionModel sessionModel)
    {
        sessionRepo.delete(sessionModel);
    }

    public void DeleteSessionBySubject(String subject, int studentId){
        sessionRepo.delete(sessionRepo.findBySubjectAndStudentId(subject, studentId).get());
    }
}
