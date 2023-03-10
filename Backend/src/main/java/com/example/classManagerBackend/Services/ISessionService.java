package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Models.SessionEntity;

import java.util.List;

public interface ISessionService
{
    public void AddSessions(List<SessionEntity> sessionEntityList, int studentId);
    public void DeleteSession(SessionEntity sessionEntity);
    public void DeleteSessionBySubject(String subject, int studentId);
    public void DeleteSessions(List<SessionEntity> sessionEntityList);
    public void UpdateSession(int studentId, List<SessionEntity> sessionEntityList);
}
