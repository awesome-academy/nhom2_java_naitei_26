package com.sunbooking.service;

import com.sunbooking.dto.tour.TourRequest;
import com.sunbooking.dto.tour.TourResponse;
import com.sunbooking.entity.Category;
import com.sunbooking.entity.Tour;
import com.sunbooking.exception.ResourceNotFoundException;
import com.sunbooking.repository.CategoryRepository;
import com.sunbooking.repository.TourRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TourService {

    private final TourRepository tourRepository;
    private final CategoryRepository categoryRepository;

    public TourService(TourRepository tourRepository, CategoryRepository categoryRepository) {
        this.tourRepository = tourRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<TourResponse> search(String keyword, Long categoryId) {
        String normalizedKeyword = keyword == null || keyword.isBlank() ? null : keyword.trim();
        return tourRepository.search(normalizedKeyword, categoryId).stream()
                .map(TourResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public Page<TourResponse> search(String keyword, Long categoryId, Pageable pageable) {
        String normalizedKeyword = keyword == null || keyword.isBlank() ? null : keyword.trim();
        return tourRepository.search(normalizedKeyword, categoryId, pageable)
                .map(TourResponse::from);
    }

    @Transactional(readOnly = true)
    public TourResponse findById(Long id) {
        return TourResponse.from(findTour(id));
    }

    @Transactional
    public TourResponse create(TourRequest request) {
        Tour tour = new Tour();
        apply(tour, request);
        return TourResponse.from(tourRepository.save(tour));
    }

    @Transactional
    public TourResponse update(Long id, TourRequest request) {
        Tour tour = findTour(id);
        apply(tour, request);
        return TourResponse.from(tourRepository.save(tour));
    }

    @Transactional
    public void delete(Long id) {
        tourRepository.delete(findTour(id));
    }

    private Tour findTour(Long id) {
        return tourRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found: " + id));
    }

    private void apply(Tour tour, TourRequest request) {
        tour.setName(request.name().trim());
        tour.setDescription(request.description());
        tour.setBasePrice(request.basePrice());
        tour.setDeparture(request.departure());
        tour.setDestination(request.destination());
        tour.setDuration(request.duration());
        tour.setStatus(request.status());
        tour.setStartDate(request.startDate());
        tour.setEndDate(request.endDate());
        tour.setCategory(resolveCategory(request.categoryId()));
    }

    private Category resolveCategory(Long categoryId) {
        if (categoryId == null) {
            return null;
        }
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + categoryId));
    }
}