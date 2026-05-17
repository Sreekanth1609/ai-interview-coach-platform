package com.interviewcoach.interview_service.service;

import com.interviewcoach.interview_service.ai.GroqService;
import com.interviewcoach.interview_service.dto.CreateInterviewRequest;
import com.interviewcoach.interview_service.dto.DashboardStatsResponse;
import com.interviewcoach.interview_service.dto.EvaluationResponse;
import com.interviewcoach.interview_service.dto.SubmitInterviewRequest;
import com.interviewcoach.interview_service.entity.InterviewEvaluation;
import com.interviewcoach.interview_service.entity.InterviewSession;
import com.interviewcoach.interview_service.repository.InterviewSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewSessionRepository repository;
    private final GroqService geminiService;

    public InterviewSession createInterview(
            CreateInterviewRequest request,
            String userEmail
    ) {

        List<String> questions =
                geminiService.generateQuestions(request);

        InterviewSession interviewSession =
                new InterviewSession();

        interviewSession.setRole(request.getRole());
        interviewSession.setExperience(request.getExperience() );
        interviewSession.setTechStack( request.getTechStack());
        interviewSession.setDifficulty( request.getDifficulty());
        interviewSession.setNumberOfQuestions(request.getNumberOfQuestions());
        interviewSession.setQuestions(questions);
        interviewSession.setUserEmail(userEmail);
        interviewSession.setCreatedAt(LocalDateTime.now());

        return repository.save(interviewSession);
    }

    public InterviewSession getInterviewById(String  id) {

        return repository.findById(id)
                .orElseThrow(() ->new RuntimeException("Interview not found"));
    }

    public InterviewSession submitInterview(
            String id,
            SubmitInterviewRequest request
    ) {

        InterviewSession interviewSession = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        // Save Answers
        interviewSession.setAnswers(request.getAnswers());

        // Mark Interview Completed
        interviewSession.setCompleted(true);

        // Generate AI Evaluation
        EvaluationResponse evaluationResponse =
                geminiService.evaluateInterview(interviewSession);

        // Convert DTO → Entity
        InterviewEvaluation evaluation = new InterviewEvaluation();

        evaluation.setScore(evaluationResponse.getScore());
        evaluation.setStrengths(evaluationResponse.getStrengths());
        evaluation.setImprovements(evaluationResponse.getImprovements());
        evaluation.setFeedback(evaluationResponse.getFeedback());

        // Save Evaluation
        interviewSession.setEvaluation(evaluation);

        return repository.save(interviewSession);
    }

    public List<InterviewSession> getUserInterviews(String userEmail) {

        return repository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }


    public DashboardStatsResponse getDashboardStats( String userEmail) {

        List<InterviewSession> interviews =repository.findByUserEmailOrderByCreatedAtDesc(userEmail);

        long totalInterviews =
                interviews.size();

        long completedInterviews =
                interviews.stream()
                        .filter(InterviewSession::isCompleted)
                        .count();

        List<Integer> scores =
                interviews.stream()
                        .filter(interview ->
                                interview.getEvaluation() != null
                        )
                        .map(interview ->
                                interview.getEvaluation().getScore()
                        )
                        .toList();

        double averageScore =
                scores.stream()
                        .mapToInt(Integer::intValue)
                        .average()
                        .orElse(0);

        int bestScore =
                scores.stream()
                        .mapToInt(Integer::intValue)
                        .max()
                        .orElse(0);

        return new DashboardStatsResponse(
                totalInterviews,
                completedInterviews,
                averageScore,
                bestScore
        );
    }
}
