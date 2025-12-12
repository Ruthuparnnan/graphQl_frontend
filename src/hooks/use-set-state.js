import { useCallback, useState } from 'react';

export function useSetState(initialState) {
  const [state, setState] = useState(initialState);

  const setMergedState = useCallback((newState) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof newState === 'function' ? newState(prevState) : newState),
    }));
  }, []);

  return { state, setState: setMergedState };
}
