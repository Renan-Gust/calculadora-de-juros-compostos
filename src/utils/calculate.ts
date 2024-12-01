import { InvestmentType, TotalType } from '@/types/investment';

interface CalculateProps {
    interestRate: InvestmentType['interestRate']
    initialValue: InvestmentType['initialValue']
    monthValue: InvestmentType['monthValue']
    period: InvestmentType['period']
    setTotal: InvestmentType['setTotal']
}

export function calculate({ interestRate, initialValue, monthValue, period, setTotal }: CalculateProps){
    const monthsTotal = (period * 12) + 1;
    const monthlyRate = (interestRate / 12) / 100;
    const totalTemp: TotalType = {
        amountAccumulated: 0,
        results: []
    };

    Array.from({ length: monthsTotal }).map((_, index) => {
        if(index === 0){
            totalTemp.results.push({
                month: index,
                interest: 0,
                interestTotal: 0,
                accumulated:  initialValue
            });
        }
        
        if(index === 1){
            const interest = Number((initialValue === 0 ? 0 : initialValue * monthlyRate).toFixed(2));

            totalTemp.results.push({
                month: index,
                interest,
                interestTotal: interest,
                accumulated:  Number((initialValue + monthValue + interest).toFixed(2))
            });
        }

        if(index > 1){
            if(monthsTotal >= 13){
                const taxaReajuste = 0.10;
                const monthsValuesAdjustment = calculateYearlyAdjustment(monthValue, taxaReajuste, monthsTotal - 1);
                console.log(monthsValuesAdjustment);
            }

            const interest = Number((totalTemp.results[index - 1].accumulated * monthlyRate).toFixed(2));

            totalTemp.results.push({
                month: index,
                interest,
                interestTotal: 0,
                accumulated: 0
            });

            totalTemp.results[index].interestTotal = calculateInterestTotal(totalTemp);
            totalTemp.results[index].accumulated = Number((interest + monthValue +  totalTemp.results[index - 1].accumulated).toFixed(2));
        }
    });

    totalTemp.amountAccumulated = (monthsTotal * monthValue) + initialValue;
    setTotal(totalTemp);
}

function calculateInterestTotal(totalTemp: TotalType){
    let interest = 0;
    [...totalTemp.results].map(item => interest += item.interest);

    return Number((interest).toFixed(2));
}

function calculateYearlyAdjustment(monthValue: number, rate: number, months: number){
    let monthsValuesAdjustment = [];
                
    for (let month = 1; month <= months; month++) {
        const years = (Math.floor((month - 13) / 12)) + 1;
        const monthValueAdjustment = monthValue * Math.pow(1 + rate, years);

        monthsValuesAdjustment.push(+monthValueAdjustment.toFixed(2));
    }

    return monthsValuesAdjustment;
}