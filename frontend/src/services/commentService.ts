import { apiClient } from './apiClient'

export type Comment = {
  id: number
  reviewId: number
  userId: number
  userName: string | null
  userAvatar: string | null
  parentCommentId: number | null
  content: string
  createdAt: string
  updatedAt: string
  replies: Comment[]
}

export type CreateCommentRequest = {
  content: string
  parentCommentId?: number | null
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response &&
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    'message' in error.response.data &&
    typeof error.response.data.message === 'string'
  ) {
    return error.response.data.message
  }

  return error instanceof Error ? error.message : fallback
}

export async function getComments(reviewId: number): Promise<Comment[]> {
  try {
    const response = await apiClient.get<Comment[]>(`/api/reviews/${reviewId}/comments`)
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to load comments'))
  }
}

export async function createComment(
  reviewId: number,
  request: CreateCommentRequest,
): Promise<Comment> {
  try {
    const response = await apiClient.post<Comment>(`/api/reviews/${reviewId}/comments`, request)
    return response.data
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to submit comment'))
  }
}
