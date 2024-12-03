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
    let monthsValuesAdjustment: number[] = [];

    Array.from({ length: monthsTotal }).map((_, index) => {
        if(index === 0){
            totalTemp.results.push({
                month: index,
                interest: 0,
                interestTotal: 0,
                accumulated:  initialValue + monthValue,
                monthValue: monthValue
            });
        }
        
        if(index === 1){
            const interest = Number((initialValue === 0 ? 0 : initialValue * monthlyRate).toFixed(2));

            totalTemp.results.push({
                month: index,
                interest,
                interestTotal: interest,
                accumulated: Number((interest + monthValue + totalTemp.results[index - 1].accumulated).toFixed(2)),
                monthValue: monthValue
            });
        }

        if(index > 1){
            const interest = Number((totalTemp.results[index - 1].accumulated * monthlyRate).toFixed(2));

            totalTemp.results.push({
                month: index,
                interest,
                interestTotal: 0,
                accumulated: 0,
                monthValue: 0
            });

            if(monthsTotal >= 13){
                const taxaReajuste = 0.10;
                monthsValuesAdjustment = calculateYearlyAdjustment(monthValue, taxaReajuste, monthsTotal - 1);

                const currentMonthValue = monthsValuesAdjustment[index];

                totalTemp.results[index].accumulated = Number((interest + currentMonthValue + totalTemp.results[index - 1].accumulated).toFixed(2));
                totalTemp.results[index].monthValue = currentMonthValue;
            } else {
                totalTemp.results[index].accumulated = Number((interest + monthValue + totalTemp.results[index - 1].accumulated).toFixed(2));
                totalTemp.results[index].monthValue = monthValue;
            }

            totalTemp.results[index].interestTotal = calculateInterestTotal(totalTemp);
        }
    });

    if(monthsValuesAdjustment.length === 0){
        totalTemp.amountAccumulated = (monthsTotal * monthValue) + initialValue;
    } else{
        totalTemp.amountAccumulated = initialValue + Number((monthsValuesAdjustment.reduce((acc, value) => acc + value, 0)).toFixed(2));
    }

    setTotal(totalTemp);
}

function calculateInterestTotal(totalTemp: TotalType){
    let interest = 0;
    [...totalTemp.results].map(item => interest += item.interest);

    return Number((interest).toFixed(2));
}

function calculateYearlyAdjustment(monthValue: number, rate: number, months: number){
    let monthsValuesAdjustment = [];
                
    for (let month = 0; month <= months; month++) {
        const years = Math.floor(month / 13);
        const monthValueAdjustment = monthValue * Math.pow(1 + rate, years);

        monthsValuesAdjustment.push(+monthValueAdjustment.toFixed(2));
    }

    return monthsValuesAdjustment;
}