// src/app/hoc/withAuth.js
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        // Reindirizza alla pagina di login se non autenticato
        router.push("/login");
      }
    }, [loading, user, router]);

    if (loading || !user) {
      // Mostra un placeholder durante il caricamento
      return <div>Loading...</div>;
    }

    // Ritorna il componente originale se autenticato
    return <Component {...props} />;
  };
}
