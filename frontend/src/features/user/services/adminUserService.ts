import { apiClient } from "@/services/apiClient";

export interface UserItem {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  lockedUsers: number;
  deletedUsers?: number;
  newThisWeek: number;
  adminUsers: number;
  regularUsers: number;
  staffUsers: number;
  guideUsers: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface CreateUserData {
  username: string;
  password?: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: string;
  status?: string;
}

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role?: string;
  status?: string;
  password?: string;
}

export const adminUserService = {
  getUsers: async (params?: {
    keyword?: string;
    role?: string;
    status?: string;
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponse<UserItem>> => {
    try {
      const response = await apiClient.get<any>("/api/admin/users", { params });
      const data = response?.data;
      if (Array.isArray(data)) {
        return {
          content: data,
          totalElements: data.length,
          totalPages: 1,
          size: data.length,
          number: 0,
        };
      }
      return {
        content: Array.isArray(data?.content) ? data.content : [],
        totalElements: typeof data?.totalElements === "number" ? data.totalElements : (data?.content?.length || 0),
        totalPages: typeof data?.totalPages === "number" ? data.totalPages : 1,
        size: typeof data?.size === "number" ? data.size : 10,
        number: typeof data?.number === "number" ? data.number : 0,
      };
    } catch (error) {
      console.error("Failed to fetch admin users:", error);
      return {
        content: [],
        totalElements: 0,
        totalPages: 1,
        size: 10,
        number: 0,
      };
    }
  },

  getUserStats: async (): Promise<UserStats> => {
    try {
      const response = await apiClient.get<any>("/api/admin/users/stats");
      const data = response?.data;
      return {
        totalUsers: Number(data?.totalUsers) || 0,
        activeUsers: Number(data?.activeUsers) || 0,
        inactiveUsers: Number(data?.inactiveUsers) || 0,
        lockedUsers: Number(data?.lockedUsers) || 0,
        deletedUsers: Number(data?.deletedUsers) || 0,
        newThisWeek: Number(data?.newThisWeek) || 0,
        adminUsers: Number(data?.adminUsers) || 0,
        regularUsers: Number(data?.regularUsers) || 0,
        staffUsers: Number(data?.staffUsers) || 0,
        guideUsers: Number(data?.guideUsers) || 0,
      };
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        lockedUsers: 0,
        deletedUsers: 0,
        newThisWeek: 0,
        adminUsers: 0,
        regularUsers: 0,
        staffUsers: 0,
        guideUsers: 0,
      };
    }
  },

  getUserById: async (id: number): Promise<UserItem> => {
    const response = await apiClient.get<UserItem>(`/api/admin/users/${id}`);
    return response.data;
  },

  createUser: async (data: CreateUserData): Promise<UserItem> => {
    const response = await apiClient.post<UserItem>("/api/admin/users", data);
    return response.data;
  },

  updateUser: async (id: number, data: UpdateUserData): Promise<UserItem> => {
    const response = await apiClient.put<UserItem>(`/api/admin/users/${id}`, data);
    return response.data;
  },

  updateStatus: async (id: number, status: string): Promise<UserItem> => {
    const response = await apiClient.patch<UserItem>(`/api/admin/users/${id}/status`, { status });
    return response.data;
  },

  updateRole: async (id: number, role: string): Promise<UserItem> => {
    const response = await apiClient.patch<UserItem>(`/api/admin/users/${id}/role`, { role });
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/users/${id}`);
  },

  restoreUser: async (id: number): Promise<UserItem> => {
    const response = await apiClient.patch<UserItem>(`/api/admin/users/${id}/restore`);
    return response.data;
  },
};
