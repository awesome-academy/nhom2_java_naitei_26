package com.sunbooking.domain.payment.service;

import com.sunbooking.domain.booking.repository.BookingRepository;
import com.sunbooking.domain.payment.dto.SePayWebhookRequest;
import com.sunbooking.domain.payment.entity.Payment;
import com.sunbooking.domain.payment.entity.PaymentStatus;
import com.sunbooking.domain.payment.repository.PaymentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;
import static org.mockito.Mockito.*;

class PaymentConfirmationServiceTest {
    @Mock private PaymentRepository paymentRepository;
    @Mock private BookingRepository bookingRepository;
    @InjectMocks private PaymentConfirmationService confirmationService;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this); }

    @Test
    void confirmPayment_ShouldDoNothing_WhenStatusIsNotPending() {
        // T136: Check idempotency (skip if already SUCCESS)
        SePayWebhookRequest req = new SePayWebhookRequest();
        req.setContent("REF123");
        Payment p = new Payment();
        p.setStatus(PaymentStatus.SUCCESS);

        when(paymentRepository.findByTransactionReference("REF123")).thenReturn(Optional.of(p));
        confirmationService.confirmPayment(req);

        // Verify save is never called again
        verify(paymentRepository, never()).save(any());
    }
}