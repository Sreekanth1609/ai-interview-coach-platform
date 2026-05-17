package com.api_gateway.config;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class Logging {

    @Bean
    public GlobalFilter logFilter(){
        return (exchange, chain) -> {
            System.out.println("🔥 Request hit Gateway: " + exchange.getRequest().getURI());
            return chain.filter(exchange);
        };
    }
}
