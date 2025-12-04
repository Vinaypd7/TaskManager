import { useCallback } from "react";
import { useAuthContext as useAuth } from "../contexts/AuthContext";

import { errorService } from "../services/errorService";

/**
 * useErrorHandler
 *
 * Returns `handleError`, a helper that logs an error via `errorService`
 * along with optional context and ensures any logging failures are caught.
 */
export const useErrorHandler = () => {
  const { user } = useAuth();

  const handleError = useCallback(
    async (error: unknown, context?: string) => {
      console.error("Error occurred:", error, context);
      try {
        const message =
          error instanceof Error
            ? error.message
            : String(error || "Unknown error");
        await errorService.logError({
          message,
          userId: user?.id ? user.id : "anonymous",
          statusCode:
            (error as unknown as { statusCode?: number })?.statusCode || 500,
          route: context || "unknown",
        });
      } catch (logError) {
        console.error("Failed to log error:", logError);
      }
    },
    [user],
  );

  return { handleError };
};
