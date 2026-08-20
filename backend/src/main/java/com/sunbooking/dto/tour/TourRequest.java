package com.sunbooking.dto.tour;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.sunbooking.entity.TourStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TourRequest(
        @NotBlank @Size(max = 255) String name,
        String description,
        @DecimalMin(value = "0.0", inclusive = true) BigDecimal basePrice,
        String departure,
        String destination,
        String duration,
        TourStatus status,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Long categoryId
) {
}