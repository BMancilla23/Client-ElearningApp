"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface withAuthProps {
  children: ReactNode;
  requiredRole?: string;
}

const WithAuth = ({ children, requiredRole }: withAuthProps) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    router.push("/");
    return null;
  }

  return <>{children}</>;
};

export default WithAuth;
