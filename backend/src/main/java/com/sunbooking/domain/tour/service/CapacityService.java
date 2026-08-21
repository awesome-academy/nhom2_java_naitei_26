package com.sunbooking.domain.tour.service;

import com.sunbooking.domain.tour.entity.TourDeparture;
import com.sunbooking.domain.tour.repository.TourDepartureRepository;
import com.sunbooking.global.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CapacityService {

    private final TourDepartureRepository departureRepository;

    @Transactional
    public void reserveCapacity(Long departureId, int slots) {
        TourDeparture departure = departureRepository.findById(departureId)
                .orElseThrow(() -> new ResourceNotFoundException("Departure not found"));

        // Check availability - field name is 'availableSlot'
        if (departure.getAvailableSlot() < slots) {
            throw new RuntimeException("Not enough slots available");
        }

        // Deduct slots
        departure.setAvailableSlot(departure.getAvailableSlot() - slots);
        departureRepository.save(departure);
    }

    @Transactional
    public void releaseCapacity(Long departureId, int slots) {
        TourDeparture departure = departureRepository.findById(departureId)
                .orElseThrow(() -> new ResourceNotFoundException("Departure not found"));

        // Restore slots
        departure.setAvailableSlot(departure.getAvailableSlot() + slots);
        departureRepository.save(departure);
    }
}