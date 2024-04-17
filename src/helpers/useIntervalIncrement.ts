import { useState, useEffect } from 'react';

export default function useIntervalIncrement(initialValue?: number, rate?: number) {
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

// export function useCalculatedCarbonDebit(
//   initialCarbonDebit?: number,
//   cumulativeNetworkEmissionsRate?: number,
//   avoidedEmissions?: number,
//   offsetEmissions?: number,
//   offsetOccured?: boolean
// ) {
//   // Initialize the carbon debit state with the initial value provided
//   const [carbonDebit, setCarbonDebit] = useState<number | undefined>(undefined);

//   useEffect(() => {
//     if (initialCarbonDebit !== undefined) {
//       setCarbonDebit(initialCarbonDebit);
//     }
//   }, [initialCarbonDebit]);

//   // Now, carbonDebit will be updated whenever initialCarbonDebit changes

//   // Use an effect to call calculateCarbonDebit when offsetOccurred changes to true
//   useEffect(() => {
//     const calculateCarbonDebit = () => {
//       if (offsetOccured) {
//         // Directly subtract the offset emissions from the initial carbon debit
//         setCarbonDebit((prevDebit) => (prevDebit ?? 0) - ((avoidedEmissions ?? 0)+ (offsetEmissions ?? 0)));
//       }
//     };

//     if (offsetOccured) {
//       calculateCarbonDebit();
//     }
//   }, [offsetOccured, offsetEmissions, avoidedEmissions]); 

//   // console.log('carbonDebit', carbonDebit);
//   return carbonDebit;
// }
