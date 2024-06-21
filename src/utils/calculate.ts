import { InvestmentType, TotalType } from '@/types/investment';

interface CalculateProps {
    interestRate: InvestmentType['interestRate']
    initialValue: InvestmentType['initialValue']
    monthValue: InvestmentType['monthValue']
    period: InvestmentType['period']
    setTotal: InvestmentType['setTotal']
}

export function calculate({ interestRate, initialValue, monthValue, period, setTotal }: CalculateProps){
    const monthsTotal = period * (12 + 1);
    const monthlyRate = (interestRate / 12) / 100;
    const totalTemp: TotalType[] = [];

    Array.from({ length: monthsTotal }).map((_, index) => {
        if(index === 0){
            totalTemp.push({
                month: index,
                interest: 0,
                interestTotal: 0,
                accumulated:  initialValue
            });
        }
        
        if(index === 1){
            const interest = Number((initialValue === 0 ? 0 : initialValue * monthlyRate).toFixed(2));

            totalTemp.push({
                month: index,
                interest,
                interestTotal: interest,
                accumulated:  Number((initialValue + monthValue + interest).toFixed(2))
            });
        }

        if(index > 1){
            const interest = Number((totalTemp[index - 1].accumulated * monthlyRate).toFixed(2));

            totalTemp.push({
                month: index,
                interest,
                interestTotal: 0,
                accumulated: 0
            });

            totalTemp[index].interestTotal = calculateInterestTotal(totalTemp);
            totalTemp[index].accumulated = Number((interest + monthValue +  totalTemp[index - 1].accumulated).toFixed(2));
        }
    });

    setTotal(totalTemp);
}

function calculateInterestTotal(totalTemp: TotalType[]){
    let interest = 0;
    [...totalTemp].map(item => interest += item.interest);

    return Number((interest).toFixed(2));
}