import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleError = useCallback((error) => {
    setIsLoading(false);
    Alert.alert(
      'Error',
      error?.message || 'An unexpected error occurred',
      [{ text: 'OK' }]
    );
  }, []);

  const wrapWithLoading = useCallback(async (promise) => {
    try {
      setIsLoading(true);
      const result = await promise;
      setIsLoading(false);
      return result;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, [handleError]);

  return { isLoading, wrapWithLoading, handleError };
}; 