package com.interviewcoach.user_service.exception;

import com.interviewcoach.user_service.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Object>>handleUserAlreadyExists(UserAlreadyExistsException ex) {

        ApiResponse<Object> response =
                ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .data(null)
                        .build();

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>>handleValidationException(MethodArgumentNotValidException ex) {

        String errorMessage =
                ex.getBindingResult()
                        .getFieldError()
                        .getDefaultMessage();

        ApiResponse<Object> response =
                ApiResponse.builder()
                        .success(false)
                        .message(errorMessage)
                        .data(null)
                        .build();

        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex) {

        ApiResponse<Object> response =
                ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .data(null)
                        .build();

        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Object>> handleAccessDeniedException( AccessDeniedException ex) {

        ApiResponse<Object> response =
                ApiResponse.builder()
                        .success(false)
                        .message("Access Denied")
                        .data(null)
                        .build();

        return new ResponseEntity<>(
                response,
                HttpStatus.FORBIDDEN
        );
    }
}
