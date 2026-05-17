package com.api_gateway.filter;

import com.api_gateway.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class AuthenticationFilter implements GlobalFilter {

    private final RouteValidator validator;
    private final JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
                             GatewayFilterChain chain) {

        if (validator.isSecured.test(exchange.getRequest().getURI().getPath())) {

            if (!exchange.getRequest().getHeaders()
                    .containsKey(HttpHeaders.AUTHORIZATION)) {

                exchange.getResponse()
                        .setStatusCode(HttpStatus.UNAUTHORIZED);

                return exchange.getResponse().setComplete();
            }

            String authHeader = exchange.getRequest()
                    .getHeaders()
                    .getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader != null && authHeader.startsWith("Bearer ")) {

                String token = authHeader.substring(7);

                if (!jwtUtil.validateToken(token)) {

                    exchange.getResponse()
                            .setStatusCode(HttpStatus.UNAUTHORIZED);

                    return exchange.getResponse().setComplete();
                }
            }
        }

        return chain.filter(exchange);
    }
}