package com.sunbooking.domain.review.dto;

import com.sunbooking.domain.booking.entity.Booking;
import com.sunbooking.domain.review.entity.Review;
import com.sunbooking.domain.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public record ReviewResponse(
        Long id,
        Long bookingId,
        Long tourId,
        String tourName,
        Long userId,
        String reviewerName,
        String reviewerAvatar,
        String content,
        Integer rating,
        List<ReviewImageResponse> images,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ReviewResponse from(Review review) {
        Booking booking = review.getBooking();
        User user = booking.getUser();

        List<ReviewImageResponse> images = Optional.ofNullable(review.getImages())
                .orElseGet(List::of)
                .stream()
                .map(ReviewImageResponse::from)
                .toList();

        return new ReviewResponse(
                review.getId(),
                booking.getId(),
                booking.getDeparture().getTour().getId(),
                booking.getDeparture().getTour().getName(),
                user.getId(),
                user.getFullName(),
                user.getAvatar(),
                review.getContent(),
                review.getRating(),
                images,
                review.getCreatedAt(),
                review.getUpdatedAt()
        );
    }
}
