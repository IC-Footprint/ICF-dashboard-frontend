import { useEffect, useState } from 'react';

function useIntervalIncrement(initialValue?: number, rate?: number) {
  const [value, setValue] = useState(initialValue);

  if (initialValue && !value) {
    setValue(initialValue);
  }

  useEffect(() => {
    if (!rate) {
      return;
    }
    const intervalId = setInterval(
      () =>
        setValue((prevValue) => {
          if (prevValue !== undefined) {
            return prevValue + rate;
          }
        }),
      1000
    );
    return () => clearInterval(intervalId);
  }, [rate]);

  return value;
}

export default useIntervalIncrement;
