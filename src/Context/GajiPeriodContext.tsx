import { ReactNode, createContext, useState } from "react";
import { dataMonth } from "../data/month";

type PeriodContextType = {
  period: { value: string; label: string };
  updatePeriod: (period: { value: string; label: string }) => void;
};

export const GajiPeriodContext = createContext<PeriodContextType | null>(null);

const GajiPeriodProvider = ({ children }: { children: ReactNode }) => {
  const [period, setPeriod] = useState<{ value: string; label: string }>(
    dataMonth(new Date(), new Date())[0]
  );

  const updatePeriod = (period: { value: string; label: string }) => {
    setPeriod(period);
  };

  return (
    <GajiPeriodContext.Provider value={{ period, updatePeriod }}>
      {children}
    </GajiPeriodContext.Provider>
  );
};

export default GajiPeriodProvider;
