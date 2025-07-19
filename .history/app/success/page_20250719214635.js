// app/success/page.js
import Link from Next

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600">
        {" "}
        Payment Successful!
      </h1>
      <p className="mt-4 text-lg">
        Thank you for your purchase. Your order is confirmed!
      </p>
      <Link href="/" className="mt-6 text-blue-500 underline">
        Go back to store
      </Link>
    </div>
  );
}
