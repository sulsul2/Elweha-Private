import { ReactNode, createContext, useState } from "react";
import { dataYear } from "../data/year";

type PeriodContextType = {
  period: { value: string; label: string };
  updatePeriod: (period: { value: string; label: string }) => void;
};

export const PajakPeriodContext = createContext<PeriodContextType | null>(null);

const PajakPeriodProvider = ({ children }: { children: ReactNode }) => {
  const [period, setPeriod] = useState<{ value: string; label: string }>(
    dataYear(new Date(), new Date())[0]
  );

  const updatePeriod = (period: { value: string; label: string }) => {
    setPeriod(period);
  };

  return (
    <PajakPeriodContext.Provider value={{ period, updatePeriod }}>
      {children}
    </PajakPeriodContext.Provider>
  );
};

export default PajakPeriodProvider;
