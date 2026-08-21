package com.sunbooking.domain.content.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbooking.domain.content.dto.NewsRequest;
import com.sunbooking.domain.content.dto.NewsResponse;
import com.sunbooking.domain.content.entity.News;
import com.sunbooking.domain.content.repository.NewsRepository;
import com.sunbooking.global.exception.ResourceNotFoundException;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Transactional(readOnly = true)
    public List<NewsResponse> findAll() {
        return newsRepository.findAll().stream()
                .map(NewsResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public NewsResponse findById(Long id) {
        return NewsResponse.from(findNews(id));
    }

    @Transactional
    public NewsResponse create(NewsRequest request) {
        News news = new News();
        apply(news, request);
        return NewsResponse.from(newsRepository.save(news));
    }

    @Transactional
    public NewsResponse update(Long id, NewsRequest request) {
        News news = findNews(id);
        apply(news, request);
        return NewsResponse.from(newsRepository.save(news));
    }

    @Transactional
    public void delete(Long id) {
        News news = findNews(id);
        news.setStatus("INACTIVE");
        newsRepository.save(news);
    }

    private News findNews(Long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found: " + id));
    }

    private void apply(News news, NewsRequest request) {
        news.setAuthorId(request.authorId());
        news.setTitle(request.title().trim());
        news.setSummary(request.summary());
        news.setContent(request.content());
        news.setThumbnailUrl(request.thumbnailUrl());
        news.setStatus(request.status());
        news.setPublishedAt(request.publishedAt());
    }
}