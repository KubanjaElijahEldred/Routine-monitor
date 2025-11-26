package com.routinemonitor.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Routine Monitor App API")
                        .version("1.0.0")
                        .description("RESTful API for Routine Monitor Application with authentication and task management")
                        .contact(new Contact()
                                .name("Elijah Kubanja")
                                .email("elijah@example.com")
                                .url("https://github.com/KubanjaElijahEldred/Routine-Monitor-App"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080/api")
                                .description("Development server"),
                        new Server()
                                .url("https://api.routinemonitor.com")
                                .description("Production server")
                ));
    }
}
