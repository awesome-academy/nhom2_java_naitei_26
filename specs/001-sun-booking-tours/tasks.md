# Implementation Tasks: SUN Booking Tours

**Feature Branch**: `001-sun-booking-tours`

**Implementation Strategy**: FULL PROJECT TEAM TASK MAP

- The task list represents the COMPLETE approved SUN Booking Tours system.
- Admin, Guest, User, Backend, Frontend, Authentication, Tour, Booking, Payment, Reviews, Comments, Likes, Content, and Testing are fully represented.
- Organized so different team members can independently identify and implement their responsibility.

## Phase 1: Shared Project Setup

- [ ] T001 [SHARED] Create `backend/` directory and initialize Maven Spring Boot 4.1.0 project with Java 21 in `backend/pom.xml`
- [ ] T002 [SHARED] Configure required Spring Boot dependencies (Web, Data JPA, Security, Validation, OAuth2, PostgreSQL) in `backend/pom.xml`
- [ ] T003 [SHARED] Configure PostgreSQL connection and base environment variables in `backend/src/main/resources/application.yml`
- [ ] T004 [SHARED] Create base backend package structure `com.sunbooking.*` and test infrastructure in `backend/src/`
- [ ] T005 [FE-SHARED] Create `frontend/` directory and initialize React 19 + Vite 8 + TypeScript project in `frontend/`
- [ ] T006 [FE-SHARED] Configure Tailwind CSS 4 plugin (`@tailwindcss/vite`) in `frontend/vite.config.ts` and import in `frontend/src/index.css`
- [ ] T007 [FE-SHARED] Configure React Router in `frontend/src/main.tsx`
- [ ] T008 [FE-SHARED] Configure frontend environment variables (backend API base URL) in `frontend/.env`
- [ ] T009 [FE-SHARED] Create approved frontend folder structure (`api/`, `assets/`, `components/`, `layouts/`, `pages/`, `routes/`, `hooks/`, `context/`, `services/`, `types/`, `utils/`)
- [ ] T010 [FE-SHARED] Setup frontend testing infrastructure (Vitest, React Testing Library, jsdom) in `frontend/vite.config.ts`

## Phase 2: Database / JPA Foundation

- [ ] T011 [P] [DB] Create `User` JPA entity and repository in `backend/src/main/java/com/sunbooking/entity/User.java`
- [ ] T012 [P] [DB] Create `SocialAccount` JPA entity and repository in `backend/src/main/java/com/sunbooking/entity/SocialAccount.java`
- [ ] T013 [P] [DB] Create `Category` JPA entity and repository in `backend/src/main/java/com/sunbooking/entity/Category.java`
- [ ] T014 [P] [DB] Create `Tour`, `TourImage`, and `TourDeparture` JPA entities and repositories in `backend/src/main/java/com/sunbooking/entity/Tour.java`, etc.
- [ ] T015 [P] [DB] Create `Place`, `TourPlace`, and `Food` JPA entities and repositories in `backend/src/main/java/com/sunbooking/entity/Place.java`, etc.
- [ ] T016 [P] [DB] Create `Booking` and `BookingTraveler` JPA entities and repositories in `backend/src/main/java/com/sunbooking/entity/Booking.java`, etc.
- [ ] T017 [P] [DB] Create `Payment` JPA entity and repository (mapping `bank_account_id` as scalar `Long`) in `backend/src/main/java/com/sunbooking/entity/Payment.java`
- [ ] T018 [P] [DB] Create `Review`, `ReviewImage`, and `ReviewLike` JPA entities and repositories preserving `User -> Booking -> Review` in `backend/src/main/java/com/sunbooking/entity/Review.java`, etc.
- [ ] T019 [P] [DB] Create `Comment` JPA entity and repository in `backend/src/main/java/com/sunbooking/entity/Comment.java`
- [ ] T020 [P] [DB] Create `News` JPA entity and repository in `backend/src/main/java/com/sunbooking/entity/News.java`

## Phase 3: Authentication and Authorization (FR-001, FR-002, FR-003)

- [ ] T021 [BE-AUTH] Configure CORS and explicit CSRF protection in `backend/src/main/java/com/sunbooking/config/SecurityConfig.java`
- [ ] T022 [BE-AUTH] Implement Spring Security foundation, password hashing, and role-based authorization in `backend/src/main/java/com/sunbooking/config/SecurityConfig.java`
- [ ] T023 [BE-AUTH] Implement JWT creation, validation, and cookie-aware extraction (HttpOnly Secure cookie) in `backend/src/main/java/com/sunbooking/security/JwtTokenProvider.java`
- [ ] T024 [BE-AUTH] Configure OAuth2 Client infrastructure and `SocialAccount` mapping (Google, Facebook, Twitter) in `backend/src/main/java/com/sunbooking/security/OAuth2UserService.java`
- [ ] T025 [BE-AUTH] Implement authentication endpoints (`POST /api/auth/register`, `/login`, `/logout`, `/social`) in `backend/src/main/java/com/sunbooking/controller/AuthController.java`
- [ ] T026 [BE-AUTH] Configure unauthorized/forbidden security handler responses in `backend/src/main/java/com/sunbooking/security/CustomAccessDeniedHandler.java`
- [ ] T027 [BE-USER] Implement current user endpoint (`GET /api/users/me`) in `backend/src/main/java/com/sunbooking/controller/UserController.java`
- [ ] T028 [FE-SHARED] Implement centralized Axios client with credentials enabled and CSRF headers in `frontend/src/api/apiClient.ts`
- [ ] T029 [FE-SHARED] Create AuthContext, authentication restoration, and logout logic in `frontend/src/context/AuthContext.tsx`
- [ ] T030 [FE-SHARED] Implement Protected Routes (Guest, User, Admin) and fallback pages (Unauthorized, Not Found) in `frontend/src/components/auth/`
- [ ] T031 [FE-GUEST] Create Registration page in `frontend/src/pages/guest/RegisterPage.tsx`
- [ ] T032 [FE-GUEST] Create standard Login page and integrate API in `frontend/src/pages/guest/LoginPage.tsx`
- [ ] T033 [FE-GUEST] Add social-login entry points in `frontend/src/pages/guest/LoginPage.tsx`
- [ ] T034 [FE-USER] Configure authenticated User routing layout in `frontend/src/layouts/UserLayout.tsx`
- [ ] T035 [FE-ADMIN] Configure Admin protected routing and login access flow in `frontend/src/routes/AdminRoutes.tsx`

## Phase 4: User Profile (FR-004)

- [ ] T036 [BE-USER] Create Profile DTOs and update logic in `backend/src/main/java/com/sunbooking/service/UserService.java`
- [ ] T037 [BE-USER] Implement profile update endpoint (`PUT /api/users/me`) with validation and authorization in `backend/src/main/java/com/sunbooking/controller/UserController.java`
- [ ] T038 [FE-USER] Create Profile page with user details in `frontend/src/pages/user/ProfilePage.tsx`
- [ ] T039 [FE-USER] Create Edit Profile form, integrate API, and handle validation/errors in `frontend/src/pages/user/EditProfilePage.tsx`

## Phase 5: Tour / Category / Content Backend (FR-005)

- [ ] T040 [P] [BE-TOUR] Implement Category retrieval (`GET /api/categories`) in `backend/src/main/java/com/sunbooking/controller/CategoryController.java`
- [ ] T041 [P] [BE-TOUR] Implement Tour search and list retrieval (`GET /api/tours`) in `backend/src/main/java/com/sunbooking/controller/TourController.java`
- [ ] T042 [P] [BE-TOUR] Implement Tour detail retrieval (`GET /api/tours/{id}`) with departures, images, places, and food in `backend/src/main/java/com/sunbooking/controller/TourController.java`
- [ ] T043 [P] [BE-REVIEW] Implement public Tour Review display data retrieval (`GET /api/reviews` by tourId) in `backend/src/main/java/com/sunbooking/controller/ReviewController.java`
- [ ] T044 [P] [BE-CONTENT] Implement independent content endpoints (`GET /api/places`, `GET /api/food`, `GET /api/news`) in `backend/src/main/java/com/sunbooking/controller/ContentController.java`

## Phase 6: Guest Frontend (FR-005)

- [ ] T045 [FE-GUEST] Create Home page for Tour discovery in `frontend/src/pages/guest/HomePage.tsx`
- [ ] T046 [FE-GUEST] Create Tour list and Tour search interface in `frontend/src/pages/guest/TourSearchPage.tsx`
- [ ] T047 [FE-GUEST] Create Tour detail page rendering departures and images in `frontend/src/pages/guest/TourDetailPage.tsx`
- [ ] T048 [FE-GUEST] Display Tour reviews on the Tour detail page in `frontend/src/components/tours/TourReviews.tsx`
- [ ] T049 [FE-GUEST] Create Place, Food, and News content discovery pages in `frontend/src/pages/content/`

## Phase 7: User Tour Frontend (FR-005)

- [ ] T050 [FE-USER] Integrate authenticated Tour browsing, detailed search, and departure selection UI in `frontend/src/pages/user/UserTourBrowsingPage.tsx`
- [ ] T051 [FE-USER] Ensure authenticated access to Place/Food/News content with shared frontend components in `frontend/src/pages/content/`

## Phase 8: Booking (FR-006, FR-008)

- [ ] T052 [P] [BE-BOOKING] Create Booking DTOs and `BookingService` for creation, validation, and traveler persistence in `backend/src/main/java/com/sunbooking/service/BookingService.java`
- [ ] T053 [BE-BOOKING] Implement concurrent slot protection, available slot validation, and amount calculation in `BookingService.java`
- [ ] T054 [BE-BOOKING] Implement endpoint to create Booking (`POST /api/bookings`) with transaction boundaries in `backend/src/main/java/com/sunbooking/controller/BookingController.java`
- [ ] T055 [BE-BOOKING] Implement User own booking retrieval (`GET /api/bookings`) and cancellation (`PUT /api/bookings/{id}/cancel`) in `BookingController.java`
- [ ] T056 [BE-BOOKING] Implement Admin booking retrieval and cancellation actions with authorization in `BookingController.java`
- [ ] T057 [FE-USER] Create booking form, departure selection, and traveler form UI in `frontend/src/pages/user/BookingFormPage.tsx`
- [ ] T058 [FE-USER] Create User booking list and Booking detail views in `frontend/src/pages/user/UserBookingsPage.tsx`
- [ ] T059 [FE-USER] Implement User cancellation action and confirmation UI in `frontend/src/pages/user/UserBookingsPage.tsx`
- [ ] T060 [FE-ADMIN] Create Booking management list and detail view for Admin in `frontend/src/pages/admin/AdminBookingsPage.tsx`
- [ ] T061 [FE-ADMIN] Implement Admin cancellation action and status display in `frontend/src/pages/admin/AdminBookingsPage.tsx`

## Phase 9: Payment (FR-007)

- [ ] T062 [P] [BE-PAYMENT] Create Payment DTOs and `PaymentService` for provider-independent status retrieval and amount validation in `backend/src/main/java/com/sunbooking/service/PaymentService.java`
- [ ] T063 [BE-PAYMENT] Implement endpoints (`POST /api/payments`, `GET /api/payments/{bookingId}`) with booking/payment consistency checks in `backend/src/main/java/com/sunbooking/controller/PaymentController.java`
- [ ] T064 [BE-PAYMENT] Define the backend Payment provider integration boundary/interface required for future provider implementation in `backend/src/main/java/com/sunbooking/service/PaymentProvider.java`
- [ ] T065 [FE-USER] Create generic payment status UI (pending/success/failure presentation) in `frontend/src/pages/user/PaymentStatusPage.tsx`

## Phase 10: Reviews / Rating (FR-009)

- [ ] T066 [P] [BE-REVIEW] Create Review DTOs and `ReviewService` enforcing UNIQUE booking review ownership in `backend/src/main/java/com/sunbooking/service/ReviewService.java`
- [ ] T067 [BE-REVIEW] Implement endpoint to create Review from Booking (`POST /api/reviews`) in `backend/src/main/java/com/sunbooking/controller/ReviewController.java`
- [ ] T068 [BE-REVIEW] Implement Admin explicit read-only Review viewing in `ReviewController.java`
- [ ] T069 [FE-USER] Create Review creation form, rating UI, and image upload where supported in `frontend/src/pages/user/ReviewFormPage.tsx`
- [ ] T070 [FE-USER] Create own Review management UI in `frontend/src/pages/user/UserReviewsPage.tsx`
- [ ] T071 [FE-ADMIN] Create Admin Review list, display, and rating presentation in `frontend/src/pages/admin/AdminReviewsPage.tsx`

## Phase 11: Comments / Replies / Likes (FR-009)

- [ ] T072 [P] [BE-REVIEW] Create Comment and Like DTOs in `backend/src/main/java/com/sunbooking/dto/review/`
- [ ] T073 [BE-REVIEW] Implement Comment creation (`POST /api/reviews/{id}/comments`) and Reply (`POST /api/reviews/comments/{id}/reply`) endpoints in `backend/src/main/java/com/sunbooking/controller/CommentController.java`
- [ ] T074 [BE-REVIEW] Implement Review Like endpoint (`POST /api/reviews/{id}/like`) with duplicate-like protection in `backend/src/main/java/com/sunbooking/controller/LikeController.java`
- [ ] T075 [FE-USER] Create Comment thread, form, and Reply UI in `frontend/src/components/reviews/CommentThread.tsx`
- [ ] T076 [FE-USER] Implement Like UI and state toggle in `frontend/src/components/reviews/ReviewItem.tsx`

## Phase 12: Admin Frontend Foundation

- [ ] T077 [FE-ADMIN] Create `AdminLayout`, `AdminSidebar`, `AdminHeader`, and `AdminDashboardPage` in `frontend/src/layouts/` and `frontend/src/pages/admin/`
- [ ] T078 [FE-ADMIN] Create reusable common loading/error/empty states, tables, pagination, and confirmation dialogs in `frontend/src/components/admin/common/`
- [ ] T079 [FE-ADMIN] Configure comprehensive Admin navigation structure in `frontend/src/layouts/AdminSidebar.tsx`

## Phase 13: Admin User Management (FR-010)

- [ ] T080 [P] [BE-ADMIN] Implement `GET /api/users` endpoint with Admin authorization in `backend/src/main/java/com/sunbooking/controller/AdminUserController.java`
- [ ] T081 [FE-ADMIN] Create Users management page and approved User action integrations in `frontend/src/pages/admin/AdminUsersPage.tsx`

## Phase 14: Admin Tour / Category Management (FR-010)

- [ ] T082 [P] [BE-ADMIN] Implement approved Admin Tour endpoints (`POST /api/tours`, `PUT /api/tours/{id}`) with validation in `backend/src/main/java/com/sunbooking/controller/AdminTourController.java`
- [ ] T083 [BE-ADMIN] Implement approved Category management operations in `backend/src/main/java/com/sunbooking/controller/AdminCategoryController.java`
- [ ] T084 [FE-ADMIN] Create Tour management page and Tour forms for approved operations in `frontend/src/pages/admin/AdminToursPage.tsx`
- [ ] T085 [FE-ADMIN] Create Category management page and forms in `frontend/src/pages/admin/AdminCategoriesPage.tsx`

## Phase 15: Admin Booking Management (FR-010)

- [ ] T086 [FE-ADMIN] Create Admin Bookings page using existing `GET /api/bookings` Admin retrieval in `frontend/src/pages/admin/AdminBookingsPage.tsx`
- [ ] T087 [FE-ADMIN] Implement Admin Booking detail, status display, and cancellation UI in `frontend/src/components/admin/bookings/AdminBookingDetail.tsx`

## Phase 16: Admin Review Management (FR-010)

- [ ] T088 [FE-ADMIN] Create Admin Reviews page using existing `GET /api/reviews` retrieval in `frontend/src/pages/admin/AdminReviewsPage.tsx`
- [ ] T089 [FE-ADMIN] Implement Admin review display and rating presentation in `frontend/src/components/admin/reviews/AdminReviewDisplay.tsx`

## Phase 17: Admin Revenue (FR-010)

- [ ] T090 [P] [BE-ADMIN] Create `RevenueService` (querying successful Payment records) and `GET /api/admin/revenue` endpoint in `backend/src/main/java/com/sunbooking/controller/RevenueController.java`
- [ ] T091 [FE-ADMIN] Create Revenue summary display and dashboard integration in `frontend/src/pages/admin/RevenuePage.tsx`

## Phase 18: Testing

- [ ] T092 [P] [TEST] Write unit/integration tests for Backend Authentication
- [ ] T093 [P] [TEST] Write unit/integration tests for Backend User/Profile
- [ ] T094 [P] [TEST] Write unit/integration tests for Backend Tour/Content
- [ ] T095 [P] [TEST] Write unit/integration tests for Backend Booking
- [ ] T096 [P] [TEST] Write unit/integration tests for Backend provider-independent Payment
- [ ] T097 [P] [TEST] Write unit/integration tests for Backend Review/Comment/Like
- [ ] T098 [P] [TEST] Write unit/integration tests for Admin backend capabilities and Repository mappings
- [ ] T099 [P] [TEST] Write unit tests for Frontend Shared/Auth components
- [ ] T100 [P] [TEST] Write unit tests for Frontend Guest components
- [ ] T101 [P] [TEST] Write unit tests for Frontend User components
- [ ] T102 [P] [TEST] Write unit tests for Frontend Admin components
- [ ] T103 [P] [TEST] Perform cross-cutting integration verification for REST contracts, CORS, CSRF, JWT cookies, and role-based authorization

## Phase 19: Full-Stack Workflow Tests

- [ ] T104 [TEST] Test Guest workflow: Register -> Login -> Search/View Tour
- [ ] T105 [TEST] Test User workflow: Login -> Tour -> Booking -> Payment status -> Cancellation -> Review -> Rating -> Comment -> Reply -> Like
- [ ] T106 [TEST] Test Admin workflow: Login -> Dashboard -> Users -> Tours -> Categories -> Bookings -> Reviews -> Revenue
- [ ] T107 [TEST] Test Social Auth workflow: Google/Facebook/Twitter flow integration

---

## Suggested Team Workstreams

### Workstream A — Shared / Architecture

T001, T002, T003, T004, T005, T006, T007, T008, T009, T010, T011, T012, T013, T014, T015, T016, T017, T018, T019, T020, T021, T022, T026, T028, T030, T103

### Workstream B — Backend Authentication/User

T023, T024, T025, T027, T036, T037, T080, T092, T093

### Workstream C — Backend Tour/Content

T040, T041, T042, T044, T082, T083, T094

### Workstream D — Backend Booking/Review

T043, T052, T053, T054, T055, T056, T062, T063, T064, T066, T067, T068, T072, T073, T074, T090, T095, T096, T097, T098

### Workstream E — Frontend Guest/User

T029, T031, T032, T033, T034, T038, T039, T045, T046, T047, T048, T049, T050, T051, T057, T058, T059, T065, T069, T070, T075, T076, T099, T100, T101

### Workstream F — Frontend Admin

T035, T071, T077, T078, T079, T081, T084, T085, T086, T087, T088, T089, T091, T102

### Workstream G — Full-Stack Workflow Testing

T104, T105, T106, T107

---

## Blockers

- BLOCKED — BANK ACCOUNT: Await mentor confirmation before generating Bank Account implementation tasks.
- BLOCKED — PAYMENT PROVIDER INTEGRATION: Internet Banking provider must be selected before provider-specific payment tasks are generated.
