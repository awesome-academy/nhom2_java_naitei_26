import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import PublicLayout from "@/app/layouts/PublicLayout";
import HomePage from "@/pages/HomePage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import TourListPage from "@/features/tour/pages/TourListPage";
import PlaceListPage from "@/features/place/pages/PlaceListPage";
import FoodListPage from "@/features/food/pages/FoodListPage";
import NewsListPage from "@/features/news/pages/NewsListPage";
import BookingHistoryPage from "@/features/booking/pages/BookingHistoryPage";
import ProfilePage from "@/features/user/pages/ProfilePage";
import { RouteMiddleware } from "@/app/middleware/RouteMiddleware";
import VietQrCheckoutPage from "@/features/payment/pages/VietQrCheckoutPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "tours",
        element: <TourListPage />,
      },
      {
        path: "places",
        element: <PlaceListPage />,
      },
      {
        path: "food",
        element: <FoodListPage />,
      },
      {
        path: "news",
        element: <NewsListPage />,
      },
      {
        path: "checkout/:bookingId", // Payment route with bookingId parameter
        element: (
            <RouteMiddleware type="auth">
              <VietQrCheckoutPage />
            </RouteMiddleware>
        ),
      },
      {
        path: "bookings",
        element: (
          <RouteMiddleware type="auth">
            <BookingHistoryPage />
          </RouteMiddleware>
        ),
      },
      {
        path: "profile",
        element: (
          <RouteMiddleware type="auth">
            <ProfilePage />
          </RouteMiddleware>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <RouteMiddleware type="auth">
        <AdminDashboardPage />
      </RouteMiddleware>
    ),
  },
  {
    path: "/login",
    element: (
      <RouteMiddleware type="guest">
        <LoginPage />
      </RouteMiddleware>
    ),
  },
  {
    path: "/register",
    element: (
      <RouteMiddleware type="guest">
        <RegisterPage />
      </RouteMiddleware>
    ),
  },
]);
