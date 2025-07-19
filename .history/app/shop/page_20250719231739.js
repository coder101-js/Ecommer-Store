import dynamic from "next/dynamic";
import { Suspense } from "react";

const ShopClient = dynamic(() => import("./ShopClient"), {
  ssr: false,
});

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center pt-20">Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}
