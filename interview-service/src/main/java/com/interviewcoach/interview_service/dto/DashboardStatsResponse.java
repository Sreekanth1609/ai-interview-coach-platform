package com.interviewcoach.interview_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalInterviews;

    private long completedInterviews;

    private double averageScore;

    private int bestScore;
}
