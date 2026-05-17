package com.interviewcoach.interview_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    private Key getSignKey() {

        byte[] keyBytes = secret.getBytes();

        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email) {

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expiration
                        )
                )

                .signWith(
                        getSignKey(),
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    public String extractEmail(String token) {

        return extractAllClaims(token).getSubject();
    }

    public boolean validateToken(String token) {

        try {

            Jwts.parserBuilder()

                    .setSigningKey(getSignKey())

                    .build()

                    .parseClaimsJws(token);

            return true;

        } catch (Exception ex) {

            return false;
        }
    }

    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()

                .setSigningKey(getSignKey())

                .build()

                .parseClaimsJws(token)

                .getBody();
    }
}