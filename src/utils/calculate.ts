import { InvestmentType, TotalType } from '@/types/investment';

interface CalculateProps {
    interestRate: InvestmentType['interestRate'];
    initialValue: InvestmentType['initialValue'];
    monthValue: InvestmentType['monthValue'];
    period: InvestmentType['period'];
    setTotal: InvestmentType['setTotal'];
    yearlyAdjustment: InvestmentType['yearlyAdjustment'];
}

export function calculate({ interestRate, initialValue, monthValue, period, setTotal, yearlyAdjustment }: CalculateProps){
    const monthsTotal = (period * 12) + 1;
    const monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
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
                monthValue: monthValue,
                amountInvested: initialValue + monthValue
            });
        }

        if(index > 0){
            const previousAccumulated = totalTemp.results[index - 1].accumulated;
            const interest = Number((previousAccumulated * monthlyRate).toFixed(2));

            const isNotLastMonth = index < Array.from({ length: monthsTotal }).length - 1;
    
            totalTemp.results.push({
                month: index,
                interest,
                interestTotal: 0,
                accumulated: 0,
                monthValue: 0,
                amountInvested: 0
            });

            if(monthsTotal >= 13 && yearlyAdjustment){
                const yearlyAdjustmentPercentage = yearlyAdjustment / 100;
                monthsValuesAdjustment = calculateYearlyAdjustment(monthValue, yearlyAdjustmentPercentage, monthsTotal - 1);

                const currentMonthValue = monthsValuesAdjustment[index];
                const monthValueLastMonth = isNotLastMonth ? currentMonthValue : 0;

                totalTemp.results[index].accumulated = Number((interest + monthValueLastMonth + previousAccumulated).toFixed(2));
                totalTemp.results[index].monthValue = monthValueLastMonth;
                totalTemp.results[index].amountInvested = totalTemp.results[index - 1].amountInvested + monthValueLastMonth;
            } else {
                const monthValueLastMonth = isNotLastMonth ? monthValue : 0;

                totalTemp.results[index].accumulated = Number((interest + monthValueLastMonth + previousAccumulated).toFixed(2));
                totalTemp.results[index].monthValue = monthValueLastMonth;
                totalTemp.results[index].amountInvested = totalTemp.results[index - 1].amountInvested + monthValueLastMonth;
            }
    
            totalTemp.results[index].interestTotal = calculateInterestTotal(totalTemp);
        }
    });

    if(monthsValuesAdjustment.length === 0){
        totalTemp.amountAccumulated = ((monthsTotal - 1) * monthValue) + initialValue;
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