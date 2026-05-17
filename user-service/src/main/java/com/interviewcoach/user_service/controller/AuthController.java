package com.interviewcoach.user_service.controller;

import com.interviewcoach.user_service.dto.ApiResponse;
import com.interviewcoach.user_service.dto.AuthResponse;
import com.interviewcoach.user_service.dto.LoginRequest;
import com.interviewcoach.user_service.dto.RegisterRequest;
import com.interviewcoach.user_service.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ApiResponse<String> register(
            @Valid @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}
