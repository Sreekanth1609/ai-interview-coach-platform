package com.interviewcoach.interview_service.controller;

import com.interviewcoach.interview_service.dto.ResumeInterviewResponse;
import com.interviewcoach.interview_service.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeInterviewResponse> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) {

        String userEmail =
                authentication.getName();

        ResumeInterviewResponse response =
                resumeService.processResume(
                        file,
                        userEmail
                );

        return ResponseEntity.ok(response);
    }
}