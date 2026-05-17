package com.interviewcoach.user_service.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public String adminDashboard(Authentication authentication) {

        System.out.println(authentication.getAuthorities());

        return "Welcome Admin";
    }
}
