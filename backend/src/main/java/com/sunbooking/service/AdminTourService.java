package com.sunbooking.service;

import com.sunbooking.dto.tour.TourRequest;
import com.sunbooking.dto.tour.TourResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminTourService {

    private final TourService tourService;

    public AdminTourService(TourService tourService) {
        this.tourService = tourService;
    }

    public List<TourResponse> findAll(String keyword, Long categoryId) {
        return tourService.search(keyword, categoryId);
    }

    public TourResponse findById(Long id) {
        return tourService.findById(id);
    }

    public TourResponse create(TourRequest request) {
        return tourService.create(request);
    }

    public TourResponse update(Long id, TourRequest request) {
        return tourService.update(id, request);
    }

    public void delete(Long id) {
        tourService.delete(id);
    }
}