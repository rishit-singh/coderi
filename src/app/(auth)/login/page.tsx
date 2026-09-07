import Link from 'next/link';
import { LoginForm } from '@/components/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-brand-600 text-2xl font-bold">
            Coderi
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="mt-1 text-gray-500 text-sm">Sign in to your account</p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-brand-600 font-medium hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </main>
  );
}
