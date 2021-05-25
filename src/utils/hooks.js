import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useLocationChange = (onChangeFunction) => {
  const location = useLocation();

  useEffect(() => {
    onChangeFunction(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
};
