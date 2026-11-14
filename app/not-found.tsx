import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] text-center px-4">
      <div className="text-8xl font-bold text-[#F47B20] mb-4">404</div>
      <h1 className="text-2xl font-bold text-[#171717] mb-2">Page Not Found</h1>
      <p className="text-[#777777] mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="bg-[#F47B20] text-white px-6 py-3 rounded-lg hover:bg-[#D96A10] transition font-semibold">
        Back to Home
      </Link>
    </div>
  );
}
