import { useCallback } from 'react';
import { useAuthContext as useAuth } from '../contexts/AuthContext';

import { errorService } from '../services/errorService';

export const useErrorHandler = () => {
  const { user } = useAuth();

  const handleError = useCallback(async (error: any, context?: string) => {
    console.error('Error occurred:', error, context);
      try {
        await errorService.logError({
          message: error.message || 'Unknown error',
          userId: user?.id ? user.id : 'anonymous',
          statusCode: error.statusCode || 500,
          route: context || 'unknown',
        });
      } catch (logError) {
        console.error('Failed to log error:', logError);
      }
  }, [user]);

  return { handleError };
};