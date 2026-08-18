# REST API Contracts

## 1. Authentication (`/api/auth`)

- `POST /api/auth/register`: Register Guest account.
- `POST /api/auth/login`: Sign in with credentials (returns JWT).
- `POST /api/auth/social`: Authenticate via Facebook, Twitter, or Google token.
- `POST /api/auth/logout`: Sign out (client-side discard or token blacklist).

## 2. Users (`/api/users`)

- `GET /api/users/me`: View profile (User).
- `PUT /api/users/me`: Update profile (User).
- `GET /api/users`: Manage users (Admin).

## 3. Bank Accounts (`/api/users/me/bank-accounts`)

- `GET /api/users/me/bank-accounts`: List bank accounts (Temporarily excluded pending mentor confirmation).
- `POST /api/users/me/bank-accounts`: Add bank account (Temporarily excluded pending mentor confirmation).
- `PUT /api/users/me/bank-accounts/{id}`: Edit bank account (Temporarily excluded pending mentor confirmation).
- `DELETE /api/users/me/bank-accounts/{id}`: Delete bank account (Temporarily excluded pending mentor confirmation).

*Note: These APIs may be reconsidered only after mentor confirmation.*

## 4. Tours & Categories (`/api/tours`, `/api/categories`)

- `GET /api/categories`: List categories.
- `GET /api/tours`: View and search tours.
- `POST /api/tours`: Create tour (Admin).
- `PUT /api/tours/{id}`: Update tour (Admin).

## 5. Places, Food, and News (`/api/content`)

- `GET /api/places`: View place information.
- `GET /api/food`: View food information.
- `GET /api/news`: View news content.

## 6. Bookings (`/api/bookings`)

- `POST /api/bookings`: Create booking (User).
- `GET /api/bookings`: List bookings (Admin) or User's own bookings.
- `PUT /api/bookings/{id}/cancel`: Cancel booking (User, Admin).

## 7. Payments (`/api/payments`)

- `POST /api/payments`: Initiate an internet banking payment for a Booking (Provider TBD).
- `GET /api/payments/{bookingId}`: Retrieve current Payment status.
- `POST /api/payments/webhook`: Receive/verify authoritative external payment result (Provider TBD).

## 8. Reviews, Comments, Likes (`/api/reviews`)

- `GET /api/reviews`: List tour reviews.
- `POST /api/reviews`: Create new review for a booking.
- `POST /api/reviews/{id}/comments`: Comment on a review.
- `POST /api/reviews/comments/{id}/reply`: Reply to a comment.
- `POST /api/reviews/{id}/like`: Like a review.

## 9. Revenue (`/api/admin/revenue`)

- `GET /api/admin/revenue`: View revenue metrics (Admin).
