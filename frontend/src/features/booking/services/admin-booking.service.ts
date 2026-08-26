import { apiClient } from '@/services/apiClient';
import type { 
  AdminBookingResponse, 
  AdminBookingFilterParams, 
  PageResponse,
  BookingStatus,
  AdminBookingStatsResponse
} from '../types/admin-booking.types';

export const getAdminBookings = async (
  params?: AdminBookingFilterParams
): Promise<PageResponse<AdminBookingResponse>> => {
  try {
    const response = await apiClient.get<any>('/api/admin/bookings', {
      params,
    });
    const data = response?.data;
    if (Array.isArray(data)) {
      return {
        content: data,
        totalPages: 1,
        totalElements: data.length,
        number: 0,
        size: data.length,
      };
    }
    return {
      content: Array.isArray(data?.content) ? data.content : [],
      totalPages: typeof data?.totalPages === 'number' ? data.totalPages : 1,
      totalElements: typeof data?.totalElements === 'number' ? data.totalElements : (data?.content?.length || 0),
      number: typeof data?.number === 'number' ? data.number : 0,
      size: typeof data?.size === 'number' ? data.size : 10,
    };
  } catch (error) {
    console.error('Failed to fetch admin bookings:', error);
    return {
      content: [],
      totalPages: 1,
      totalElements: 0,
      number: 0,
      size: 10,
    };
  }
};

export const getAdminBookingDetails = async (id: number): Promise<AdminBookingResponse> => {
  const response = await apiClient.get<AdminBookingResponse>(`/api/admin/bookings/${id}`);
  return response.data;
};

export const updateAdminBookingStatus = async (
  id: number,
  status: BookingStatus
): Promise<AdminBookingResponse> => {
  const response = await apiClient.patch<AdminBookingResponse>(`/api/admin/bookings/${id}/status`, {
    status,
  });
  return response.data;
};

export const getAdminBookingStats = async (): Promise<AdminBookingStatsResponse> => {
  try {
    const response = await apiClient.get<any>('/api/admin/bookings/stats');
    const data = response?.data;
    return {
      total: Number(data?.total) || 0,
      confirmed: Number(data?.confirmed) || 0,
      pending: Number(data?.pending) || 0,
      failed: Number(data?.failed) || 0,
    };
  } catch (error) {
    console.error('Failed to fetch admin booking stats:', error);
    return {
      total: 0,
      confirmed: 0,
      pending: 0,
      failed: 0,
    };
  }
};

export const adminBookingService = {
  getAdminBookings,
  getAdminBookingDetails,
  updateAdminBookingStatus,
  getAdminBookingStats,
};
