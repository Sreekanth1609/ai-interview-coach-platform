package com.interviewcoach.interview_service.service;

import com.interviewcoach.interview_service.ai.GroqService;
import com.interviewcoach.interview_service.dto.ResumeAnalysisResponse;
import com.interviewcoach.interview_service.dto.ResumeInterviewResponse;
import com.interviewcoach.interview_service.entity.InterviewSession;
import com.interviewcoach.interview_service.repository.InterviewSessionRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final GroqService groqService;

    private final InterviewSessionRepository repository;

    public ResumeInterviewResponse processResume(
            MultipartFile file,
            String userEmail
    ) {

        try {

            PDDocument document =
                    Loader.loadPDF(file.getBytes());

            PDFTextStripper pdfTextStripper =
                    new PDFTextStripper();

            String resumeText =
                    pdfTextStripper.getText(document);

            document.close();

            System.out.println("RESUME TEXT:");
            System.out.println(resumeText);

            // AI Resume Analysis
            ResumeAnalysisResponse analysis =
                    groqService.analyzeResume(resumeText);

            // AI Question Generation
            List<String> questions =
                    groqService.generateQuestionsFromResume(resumeText);

            // Create Interview Session
            InterviewSession session =
                    new InterviewSession();

            session.setUserEmail(userEmail);

            session.setRole(
                    analysis.getRole()
            );

            session.setExperience(
                    analysis.getExperience()
            );

            session.setTechStack(
                    analysis.getTechStack()
            );

            session.setDifficulty("Medium");

            session.setQuestions(questions);

            session.setNumberOfQuestions(
                    questions.size()
            );

            InterviewSession savedSession =
                    repository.save(session);

            return new ResumeInterviewResponse(
                    savedSession.getId()
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to process resume",
                    e
            );
        }
    }
}