package com.interviewcoach.interview_service.controller;

import com.interviewcoach.interview_service.dto.CreateInterviewRequest;
import com.interviewcoach.interview_service.dto.DashboardStatsResponse;
import com.interviewcoach.interview_service.dto.SubmitInterviewRequest;
import com.interviewcoach.interview_service.entity.InterviewSession;
import com.interviewcoach.interview_service.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping
    public ResponseEntity<InterviewSession> createInterview(
            @Valid @RequestBody CreateInterviewRequest request,
            Authentication authentication
    ) {

        String userEmail = authentication.getName();

        InterviewSession response =
                interviewService.createInterview(
                        request,
                        userEmail
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    @GetMapping("/user")
    public ResponseEntity<List<InterviewSession>> getUserInterviews(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                interviewService.getUserInterviews(
                        authentication.getName()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewSession> getInterviewById(
            @PathVariable String id
    ) {

        InterviewSession interviewSession =
                interviewService.getInterviewById(id);

        return ResponseEntity.ok(interviewSession);
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<InterviewSession> submitInterview(
            @PathVariable String id,
            @RequestBody SubmitInterviewRequest request
    ) {

        InterviewSession response =
                interviewService.submitInterview(
                        id,
                        request
                );

        return ResponseEntity.ok(response);

    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats(Authentication authentication) {

        return ResponseEntity.ok(interviewService.getDashboardStats(authentication.getName()));
    }
}