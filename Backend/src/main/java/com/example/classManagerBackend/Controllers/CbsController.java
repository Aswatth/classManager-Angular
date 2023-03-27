package com.example.classManagerBackend.Controllers;

import com.example.classManagerBackend.Services.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CbsController
{
    @Autowired
    FilterService filterService;

    @GetMapping("/class")
    public List<String> GetClassList()
{
    return filterService.GetClassList();
}

    @PostMapping("/class")
    public List<String> AddClasses(@RequestBody List<String> classList)
    {
        filterService.UpdateClassList(classList);
        return GetClassList();
    }

    @GetMapping("/board")
    public List<String> GetBoardList()
    {
        return filterService.GetBoardList();
    }

    @PostMapping("/board")
    public List<String> AddBoards(@RequestBody  List<String> boardList)
    {
        filterService.UpdateBoardList(boardList);
        return GetBoardList();
    }

    @GetMapping("/subject")
    public List<String> GetSubjectList()
    {
        return filterService.GetSubjectList();
    }

    @PostMapping("/subject")
    public List<String> AddSubjects(@RequestBody  List<String> subjectList)
    {
        filterService.UpdateSubjectList(subjectList);
        return GetSubjectList();
    }

    @PostMapping("/safe/{cbsType}")
    public boolean SafeToDelete(@RequestBody String itemToDelete, @PathVariable String cbsType)
    {
        return filterService.IsSafeToDelete(itemToDelete, cbsType);
    }
}
