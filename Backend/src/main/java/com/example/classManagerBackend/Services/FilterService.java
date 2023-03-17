package com.example.classManagerBackend.Services;

import com.example.classManagerBackend.Repos.BoardRepo;
import com.example.classManagerBackend.Repos.ClassRepo;
import com.example.classManagerBackend.Repos.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilterService
{
    @Autowired
    BoardRepo boardRepo;

    @Autowired
    ClassRepo classRepo;

    @Autowired
    SubjectRepo subjectRepo;

    public List<String> GetClassList()
    {
        return classRepo.findAll().stream().map(e->e.getClassName()).collect(Collectors.toList());
    }

    public List<String> GetBoardList()
    {
        return boardRepo.findAll().stream().map(e->e.getBoardName()).collect(Collectors.toList());
    }

    public List<String> GetSubjectList()
    {
        return subjectRepo.findAll().stream().map(e->e.getSubject()).collect(Collectors.toList());
    }
}
