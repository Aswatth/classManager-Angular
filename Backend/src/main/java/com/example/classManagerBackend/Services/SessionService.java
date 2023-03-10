package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.FeesAuditEntity;
import com.example.classManagerBackend.Models.SessionEntity;
import com.example.classManagerBackend.Repos.SessionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SessionService implements ISessionService
{
    @Autowired
    SessionRepo sessionRepo;

    @Autowired
    FeesAuditService feesAuditService;

    @Override
    public void AddSessions(List<SessionEntity> sessionEntityList, int studentId)
    {
        sessionEntityList.forEach(e -> {
            e.setStudentId(studentId);

            //Check if a studentId-Subject combination already exists
            if(!sessionRepo.findBySubjectAndStudentId(e.getSubject(), studentId).isPresent())
            {
                //Insert if not already present
                sessionRepo.save(e);
            }
        });

        /*//Create associate fees audit
        List<FeesAuditEntity> feesAuditEntityList = new ArrayList<>();

        //Get first day of current month in the form of yyyy-MM-dd format
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM");
        LocalDate currentDate = LocalDate.now();

        String feesDate = currentDate.format(dateFormatter) + "-01";
        String[] date = feesDate.split("-");

        LocalDate dateToStore = LocalDate.of(Integer.parseInt(date[0]),Integer.parseInt(date[1]),Integer.parseInt(date[2]));*/

       /* //Create a fees audit for each session record
        sessionEntityList.forEach(e -> {
            try
            {
                feesAuditEntityList.add(new FeesAuditEntity(
                        new SimpleDateFormat("yyyy-MM-dd").parse(dateToStore.toString()),
                        e.getId(), //Created session id
                        e.getFees(), // Session's fees
                        null, // Will be null unless a payment has been confirmed for the respective session
                        null // Optional comments for each payment confirmation
                ));
            } catch (ParseException ex)
            {
                ex.printStackTrace();
            }
        });

        //Insert created fees audit records
        feesAuditService.AddFeesAudit(feesAuditEntityList);*/
    }

    public void UpdateSession(int studentId, List<SessionEntity> sessionEntityList)
    {
        //List of sessions to add/ update
        List<SessionEntity> sessionsToAdd = new ArrayList<>(sessionEntityList);

        //List of existing subject for the current student's sessions
        List<String> existingSessionSubject = sessionRepo.findByStudentId(studentId).stream().map(SessionEntity::getSubject).collect(Collectors.toList());

        sessionEntityList.forEach(e -> {
            //Check if a session already exists for a particular subject
            if(existingSessionSubject.contains(e.getSubject()))
            {
                //Get session based on subject-studentId
                /*Optional<SessionEntity> existingSessionModel = sessionRepo.findBySubjectAndStudentId(e.getSubject(), studentId);

                if(existingSessionModel.isPresent())
                {
                    //Get fees audit if exists
                    List<FeesAuditEntity> feesAuditEntityList = existingSessionModel.get().getFeesAuditModelList();

                    //Get latest fees date
                    Date latestDate = Collections.max(feesAuditEntityList.stream().map(m->m.getFeesDate()).collect(Collectors.toList()));

                    //Update fees only for latest date which has not been paid yet
                    feesAuditEntityList.forEach(audit->{
                        if(audit.getFeesDate() == latestDate && audit.getPaidOn() == null)
                        {
                            audit.setFees(e.getFees());
                        }
                    });

                    e.setFeesAuditModelList(feesAuditEntityList);
                }*/

                //Update if already exists
                sessionRepo.save(e);

                //Remove from list of sessions to add/ update
                sessionsToAdd.remove(e);

                existingSessionSubject.remove(e.getSubject());
            }
        });

        //If any session is left out then add as new session record for current student
        if(sessionsToAdd.size() > 0)
            AddSessions(sessionsToAdd, studentId);

        //If any session's subject is left out then delete it
        if(existingSessionSubject.size() > 0)
        {
            existingSessionSubject.forEach(e -> {
                DeleteSessionBySubject(e, studentId);
            });
        }

        //If sessions are updated then update fees audit
        feesAuditService.UpdateFeesAudit(studentId, sessionEntityList.stream().map(m->m.getFees()).mapToDouble(Double::valueOf).sum());
    }

    @Override
    public void DeleteSession(SessionEntity sessionEntity)
    {
        /*List<FeesAuditEntity> feesAuditEntityList = sessionEntity.getFeesAuditModelList();
        feesAuditService.DeleteAudits(feesAuditEntityList);*/
        sessionRepo.delete(sessionEntity);
    }

    @Override
    public void DeleteSessions(List<SessionEntity> sessionEntityList)
    {
        /*sessionEntityList.forEach(e -> {
            feesAuditService.DeleteAudits(e.getFeesAuditModelList());
        });*/
        sessionRepo.deleteAll(sessionEntityList);
    }

    @Override
    public void DeleteSessionBySubject(String subject, int studentId){
        Optional<SessionEntity> sessionModel =sessionRepo.findBySubjectAndStudentId(subject, studentId);
        if(sessionModel.isPresent())
        {
            DeleteSession(sessionModel.get());
        }
    }
}
