import { Dispatch, SetStateAction } from 'react';

export interface TotalType {
    amountAccumulated: number;
    results: {
        month: number;
        interest: number;
        interestTotal: number;
        accumulated : number;
        monthValue: number;
    }[];
}

export interface InvestmentType {
    interestRate: number;
    setInterestRate: Dispatch<SetStateAction<number>>;
    initialValue: number;
    setInitialValue: Dispatch<SetStateAction<number>>;
    monthValue: number;
    setMonthValue: Dispatch<SetStateAction<number>>;
    period: number;
    setPeriod: Dispatch<SetStateAction<number>>;
    total: TotalType;
    setTotal: Dispatch<SetStateAction<TotalType>>;
    yearlyAdjustment: number;
    setYearlyAdjustment: Dispatch<SetStateAction<number>>;
}