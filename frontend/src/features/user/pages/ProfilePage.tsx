import MyReviewsSection from "@/features/user/components/MyReviewsSection"
import { useAuthStore } from "@/features/auth/store/authStore"

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const role = String(user?.role || "").toUpperCase()
  const isUser = role === "USER"

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tài khoản</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your account activity and tour reviews.</p>
      </div>

      {isUser && <MyReviewsSection />}
    </div>
  )
}
