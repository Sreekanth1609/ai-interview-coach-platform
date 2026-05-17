package com.interviewcoach.interview_service.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateInterviewRequest {

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Experience is required")
    private String experience;

    @NotBlank(message = "Tech stack is required")
    private String techStack;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    @Min(value = 1, message = "Minimum 1 question required")
    @Max(value = 20, message = "Maximum 20 questions allowed")
    private int numberOfQuestions;
}