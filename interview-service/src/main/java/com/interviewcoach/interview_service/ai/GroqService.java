package com.interviewcoach.interview_service.ai;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.interviewcoach.interview_service.dto.*;

import com.interviewcoach.interview_service.entity.InterviewSession;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final WebClient.Builder webClientBuilder;

    public List<String> generateQuestions(
            CreateInterviewRequest interviewRequest
    ) {

        String prompt = """
                Generate EXACTLY %d interview questions.
                
                Role: %s
                Experience: %s
                Tech Stack: %s
                Difficulty: %s
                
                Return ONLY a valid JSON array.
                
                Example:
                [
                  "Question 1",
                  "Question 2"
                ]
                
                Do not return anything else.
                """.formatted(
                interviewRequest.getNumberOfQuestions(),
                interviewRequest.getRole(),
                interviewRequest.getExperience(),
                interviewRequest.getTechStack(),
                interviewRequest.getDifficulty()
        );

        String url =
                "https://api.groq.com/openai/v1/chat/completions";

        GroqRequest request =
                new GroqRequest(
                        "llama-3.1-8b-instant",List.of(new Message("user",prompt)));

        GroqResponse response =
                webClientBuilder
                        .build()
                        .post()
                        .uri(url)
                        .header(HttpHeaders.AUTHORIZATION,
                                "Bearer " + apiKey)
                        .contentType(MediaType.APPLICATION_JSON )
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(GroqResponse.class)
                        .block();

        String text = response
                .choices()
                .getFirst()
                .message()
                .content();

        System.out.println("RAW AI RESPONSE:");
        System.out.println(text);

        try {

            ObjectMapper mapper =new ObjectMapper();

            List<String> questions =mapper.readValue(text,new TypeReference<List<String>>() {});

            return questions;

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response",e);
        }
    }

    public EvaluationResponse evaluateInterview(InterviewSession interviewSession) {

        String prompt = """
            
            Evaluate this mock interview.
            
            Role: %s
            Experience: %s
            Tech Stack: %s
            
            Questions:
            %s
            
            Answers:
            %s
            
            Return ONLY valid JSON.
            
            Example:
            {
              "score": 82,
              "strengths": [
                "Strong Spring Boot fundamentals"
              ],
              "improvements": [
                "Need deeper Kafka knowledge"
              ],
              "feedback": "Good backend understanding overall"
            }
            
            Do not return anything else.
            
            """.formatted(
                interviewSession.getRole(),
                interviewSession.getExperience(),
                interviewSession.getTechStack(),
                interviewSession.getQuestions(),
                interviewSession.getAnswers()
        );

        String url =
                "https://api.groq.com/openai/v1/chat/completions";

        GroqRequest request =
                new GroqRequest(
                        "llama-3.1-8b-instant",List.of(new Message("user",prompt)));

        GroqResponse response =
                webClientBuilder
                        .build()
                        .post()
                        .uri(url)
                        .header(HttpHeaders.AUTHORIZATION,"Bearer " + apiKey )
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(GroqResponse.class)
                        .block();

        String text = response
                .choices()
                .getFirst()
                .message()
                .content();

        System.out.println("AI EVALUATION:");
        System.out.println(text);

        try {

            ObjectMapper mapper =
                    new ObjectMapper();

            return mapper.readValue(text,
                    EvaluationResponse.class);

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to parse evaluation response",e);
        }
    }

    public List<String> generateQuestionsFromResume(String resumeText) {

        String prompt = """
            
            Based on this resume, generate 5 technical interview questions.
            
            Resume:
            %s
            
            Return ONLY a STRICT valid JSON array.
            Do not use markdown.
            Do not use ```json.
            Do not add explanations.
            
            Example:
            [
              "Question 1",
              "Question 2"
            ]
            
            """.formatted(resumeText);

        String url =
                "https://api.groq.com/openai/v1/chat/completions";

        GroqRequest request =
                new GroqRequest(
                        "llama-3.1-8b-instant",
                        List.of(new Message("user", prompt))
                );

        GroqResponse response =
                webClientBuilder
                        .build()
                        .post()
                        .uri(url)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(GroqResponse.class)
                        .block();

        String text = response
                .choices()
                .getFirst()
                .message()
                .content();

        System.out.println("AI QUESTIONS:");
        System.out.println(text);

        try {

            // CLEAN RESPONSE
            text = text.trim();

            if (text.startsWith("```json")) {
                text = text.replace("```json", "");
            }

            if (text.endsWith("```")) {
                text = text.replace("```", "");
            }

            text = text.trim();

            // FIX INCOMPLETE JSON
            if (!text.endsWith("]")) {
                text = text + "]";
            }

            ObjectMapper mapper =
                    new ObjectMapper();

            return mapper.readValue(
                    text,
                    new TypeReference<List<String>>() {}
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse AI response",
                    e
            );
        }
    }

    public ResumeAnalysisResponse analyzeResume(
            String resumeText
    ) {

        String prompt = """
            
            Analyze this resume.
            
            Extract:
            1. Role
            2. Experience
            3. Main Tech Stack
            
            Resume:
            %s
            
            Return ONLY valid JSON.
            
            Example:
            {
              "role": "Java Backend Developer",
              "experience": "3 Years",
              "techStack": "Java, Spring Boot, Kafka, MySQL"
            }
            
            Do not return anything else.
            
            """.formatted(resumeText);

        String url =
                "https://api.groq.com/openai/v1/chat/completions";

        GroqRequest request =
                new GroqRequest(
                        "llama-3.1-8b-instant",
                        List.of(new Message("user", prompt))
                );

        GroqResponse response =
                webClientBuilder
                        .build()
                        .post()
                        .uri(url)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(GroqResponse.class)
                        .block();

        String text = response
                .choices()
                .getFirst()
                .message()
                .content();

        System.out.println("RESUME ANALYSIS:");
        System.out.println(text);

        try {

            text = text.trim();

            if (text.startsWith("```json")) {
                text = text.replace("```json", "");
            }

            if (text.endsWith("```")) {
                text = text.replace("```", "");
            }

            ObjectMapper mapper =
                    new ObjectMapper();

            return mapper.readValue(
                    text,
                    ResumeAnalysisResponse.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse resume analysis",
                    e
            );
        }
    }
}