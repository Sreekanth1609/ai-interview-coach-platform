package com.interviewcoach.user_service.service;

import com.interviewcoach.user_service.dto.ApiResponse;
import com.interviewcoach.user_service.dto.AuthResponse;
import com.interviewcoach.user_service.dto.LoginRequest;
import com.interviewcoach.user_service.dto.RegisterRequest;
import com.interviewcoach.user_service.exception.UserAlreadyExistsException;
import com.interviewcoach.user_service.repository.UserRepository;
import com.interviewcoach.user_service.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.interviewcoach.user_service.entity.User;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ApiResponse<String> register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            throw new UserAlreadyExistsException(
                    "Email already exists"
            );
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        return ApiResponse.<String>builder()
                .success(true)
                .message("User Registered Successfully")
                .data(null)
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token =
                jwtService.generateToken(request.getEmail());

        return new AuthResponse(token);
    }
}
