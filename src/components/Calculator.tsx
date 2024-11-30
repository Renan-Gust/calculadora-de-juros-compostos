import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { calculate } from '@/utils/calculate';
import { useResult } from '@/contexts/ResultContexts';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercentage } from '@/utils/formatPercentage';

// Reajuste anual - Colocar uma informo que o reajuste anual so vai funcionar a partir do segundo ano...
// Colocar grafico

export function Calculator(){
    const { interestRate, setInterestRate, initialValue, setInitialValue, monthValue, setMonthValue, period, setPeriod, setTotal } = useResult();

    const [initialValueFormatted, setInitialValueFormatted] = useState(formatCurrency(0));
    const [monthValueFormatted, setMonthValueFormatted] = useState(formatCurrency(0));
    const [interestRateFormatted, setInterestRateFormatted] = useState('0.00%');

    function handleCalculate(){
        const initialValueOriginal = parseFloat(initialValueFormatted.replace('R$', '').replace('.', '').replace(',', '.'));
        const monthValueOriginal = parseFloat(monthValueFormatted.replace('R$', '').replace('.', '').replace(',', '.'));

        setInitialValue(initialValueOriginal);
        setMonthValue(monthValueOriginal);

        calculate({
            interestRate,
            initialValue: initialValueOriginal,
            monthValue: monthValueOriginal,
            period,
            setTotal
        });
    }

    return(
        <div className="w-full">
            <div className="grid grid-cols-1 gap-4 mb-6">

                <div className='grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-4'>
                    <div className="space-y-2">
                        <Label htmlFor="initial-value">Valor inicial</Label>
                        <Input
                            id="initial-value"
                            type="text"
                            placeholder="R$ 0,00"
                            value={initialValueFormatted}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/\D/g, '');
                                const numberValue = rawValue ? parseInt(rawValue, 10) : 0;
                                setInitialValueFormatted(formatCurrency(numberValue / 100));
                            }}
                        />
                    </div>
                
                    <div className="space-y-2">
                        <Label htmlFor="interest-rate">Taxa de juros</Label>

                        <div className="grid grid-cols-[2fr_1fr]">
                            <Input
                                id="interest-rate"
                                type="text"
                                placeholder="0"
                                className='rounded-tr-none rounded-br-none'
                                // value={interestRateFormatted}
                                onChange={(e) => {
                                    // Captura o valor digitado
                                    // let rawValue = e.target.value;

                                    // // Permite apenas números e ponto decimal
                                    // rawValue = rawValue.replace(/[^0-9.]/g, '');

                                    // // Se houver mais de um ponto decimal, remove o extra
                                    // const parts = rawValue.split('.');
                                    // if (parts.length > 2) {
                                    //     rawValue = parts[0] + '.' + parts.slice(1).join('');
                                    // }

                                    // // Converte o valor para número e divide por 100 para obter a porcentagem
                                    // const numberValue = rawValue ? parseFloat(rawValue) : 0;
                                    // const percentageValue = numberValue / 100;

                                    // // Se o valor for um número inteiro, exibe sem casas decimais
                                    // if (Number.isInteger(percentageValue)) {
                                    //     setInterestRateFormatted(`${percentageValue}%`);
                                    // } else {
                                    //     // Caso contrário, formata com 2 casas decimais
                                    //     setInterestRateFormatted(`${percentageValue.toFixed(2)}%`);
                                    // }
                                    setInterestRate(+e.target.value);
                                }}
                            />

                            <Select defaultValue='yearly'>
                                <SelectTrigger className='rounded-tl-none rounded-bl-none'>
                                    <SelectValue placeholder="Taxa de juros" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Mensal</SelectItem>
                                    <SelectItem value="yearly">Anual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-4'>
                    <div className="space-y-2">
                        <Label htmlFor="monthly-investment">Investimento mensal</Label>
                        <Input
                            id="monthly-investment"
                            type="text"
                            placeholder="R$ 0,00"
                            value={monthValueFormatted}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/\D/g, '');
                                const numberValue = rawValue ? parseInt(rawValue, 10) : 0;
                                setMonthValueFormatted(formatCurrency(numberValue / 100));
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="period">Período</Label>

                        <div className="grid grid-cols-[2fr_1fr]">
                            <Input
                                id="period"
                                type="number"
                                placeholder="0"
                                className='rounded-tr-none rounded-br-none'
                                value={period}
                                onChange={(e) => setPeriod(parseInt(e.target.value))}
                            />

                            <Select defaultValue='yearly'>
                                <SelectTrigger className='rounded-tl-none rounded-bl-none'>
                                    <SelectValue placeholder="Período" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Mensal</SelectItem>
                                    <SelectItem value="yearly">Anual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            
            <Button className="w-full" onClick={handleCalculate}>Calcular</Button>
        </div>
    );
}