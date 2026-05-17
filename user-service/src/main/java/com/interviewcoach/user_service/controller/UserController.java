package com.interviewcoach.user_service.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public String profile(Authentication authentication) {

        System.out.println(authentication.getAuthorities());

        return "Welcome : " + authentication.getName();
    }
}