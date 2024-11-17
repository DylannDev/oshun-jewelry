"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import useWixClient from "@/hooks/useWixClient";
import { useAuthStore } from "@/store/authStore";
import Loader from "@/components/Loader";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo: string;
};

const ProtectedRoute = ({
  children,
  requireAuth = true,
  redirectTo,
}: ProtectedRouteProps) => {
  const wixClient = useWixClient();
  const router = useRouter();
  const { isLoggedIn, checkLoginStatus } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      checkLoginStatus(wixClient); // Vérifie l'état de connexion

      if (requireAuth && !isLoggedIn) {
        // Redirige si l'utilisateur n'est pas connecté et qu'une authentification est requise
        router.push(redirectTo);
        return;
      }

      if (!requireAuth && isLoggedIn) {
        // Redirige si l'utilisateur est connecté mais ne devrait pas accéder à la page
        router.push(redirectTo);
        return;
      }

      setIsChecking(false); // Stoppe le chargement une fois la vérification terminée
    };

    verifyLogin();
  }, [
    isLoggedIn,
    checkLoginStatus,
    requireAuth,
    redirectTo,
    router,
    wixClient,
  ]);

  if (isChecking) {
    return (
      <div className="h-[calc(100dvh-80px)]">
        <Loader />
      </div>
    );
  }

  // Affiche le contenu protégé si les conditions sont remplies
  return <>{children}</>;
};

export default ProtectedRoute;
