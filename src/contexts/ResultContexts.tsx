import { createContext, useContext, useState } from 'react';

import { InvestmentType as ResultContextType, TotalType } from '@/types/investment';

export const Context = createContext({} as ResultContextType);

export const ResultContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [initialValue, setInitialValue] = useState(0);
    const [monthValue, setMonthValue] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [period, setPeriod] = useState(0);
    const [total, setTotal] = useState<TotalType>({
        amountAccumulated: 0,
        results: []
    });

    return(
        <Context.Provider value={{
            period,
            setPeriod,
            interestRate,
            setInterestRate,
            initialValue,
            setInitialValue,
            monthValue,
            setMonthValue,
            total,
            setTotal
        }}
        >
            {children}
        </Context.Provider>
    );
};

export const useResult = () => useContext<ResultContextType>(Context);