import { useMemo, useEffect, useCallback } from "react";
import { useSetState } from "../hooks/use-set-state";
import axiosInstance from "../utils/axios";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem("access_token");

      if (accessToken) {
        // Call auth/me API to get user data
        const meQuery = `
          query Me {
            me {
              id
              name
              email
              number
            }
          }
        `;

        const response = await axiosInstance.post("", {
          query: meQuery,
        });

        if (response.data.errors) {
          console.error("Auth error:", response.data.errors);
          sessionStorage.removeItem("access_token");
          setState({ user: null, loading: false });
          return;
        }

        const userData = response.data.data.me;

        setState({
          user: { ...userData, accessToken },
          loading: false,
        });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error("Session check error:", error);
      sessionStorage.removeItem("access_token");
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user || null,
      checkUserSession,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [checkUserSession, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
