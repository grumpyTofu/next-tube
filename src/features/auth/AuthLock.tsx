import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

interface AuthLockProps {}

const AuthLock: React.FC<AuthLockProps> = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session && router.pathname !== "/login") {
      router.replace("/login");
    } else if (!loading && session && router.pathname == "/login") {
      router.replace("/");
    }
  }, [session, loading]);

  return <>{children}</>;
};

export default AuthLock;
