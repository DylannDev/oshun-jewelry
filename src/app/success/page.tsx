"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  // Redirection automatique après un délai
  useEffect(() => {
    if (!orderId) return;

    const timer = setTimeout(() => {
      router.push("/orders/" + orderId);
    }, 6000);

    return () => clearTimeout(timer);
  }, [orderId, router]);

  return (
    <ProtectedRoute requireAuth={true} redirectTo="/login">
      <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)] ">
        <Confetti width={2000} height={1000} />
        <h1 className="text-3xl font-semibold">
          Votre commande est en cours 🎉
        </h1>
        <h2 className="text-xl font-medium">
          Vous recevrez le récapitulatif de la commande par mail
        </h2>
        <h3 className="text-sm text-gray-500 ">
          Redirection vers la page des commandes...
        </h3>
      </div>
    </ProtectedRoute>
  );
};

export default SuccessPage;
