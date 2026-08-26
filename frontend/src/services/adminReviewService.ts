import { apiClient } from "@/services/apiClient"
import type { Review } from "@/services/reviewService"

export const adminReviewService = {
  getReviews: async (): Promise<Review[]> => {
    try {
      const response = await apiClient.get<any>("/api/admin/reviews")
      const data = response?.data
      if (Array.isArray(data)) {
        return data
      }
      if (Array.isArray(data?.content)) {
        return data.content
      }
      if (Array.isArray(data?.data)) {
        return data.data
      }
      return []
    } catch (error) {
      console.error("Failed to fetch admin reviews:", error)
      return []
    }
  },

  getReviewById: async (reviewId: number): Promise<Review> => {
    const response = await apiClient.get<Review>(`/api/admin/reviews/${reviewId}`)
    return response.data
  },

  deleteReview: async (reviewId: number): Promise<void> => {
    await apiClient.delete(`/api/admin/reviews/${reviewId}`)
  },
}
