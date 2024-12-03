import { Info } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { calculate } from '@/utils/calculate';
import { useResult } from '@/contexts/ResultContexts';

// Colocar grafico

export function Calculator(){
    const {
        interestRate,
        setInterestRate,
        initialValue,
        setInitialValue,
        monthValue,
        setMonthValue,
        period,
        setPeriod,
        setTotal,
        yearlyAdjustment,
        setYearlyAdjustment        
    } = useResult();

    function handleCalculate(){
        calculate({
            interestRate,
            initialValue,
            monthValue,
            period,
            setTotal,
            yearlyAdjustment
        });
    }

    return(
        <div className="w-full">
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div className='grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-4'>
                    <div className="space-y-2">
                        <Label htmlFor="initial-value">Valor inicial</Label>
                        <NumericFormat
                            value={initialValue || ''}
                            onValueChange={(values) => setInitialValue(values.floatValue ?? 0)}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="R$ "
                            fixedDecimalScale={true}
                            decimalScale={2}
                            allowNegative={false}
                            customInput={Input}
                            placeholder="R$ 0,00"
                            id="initial-value"
                        />
                    </div>
                
                    <div className="space-y-2">
                        <Label htmlFor="interest-rate">Taxa de juros</Label>

                        <div className="grid grid-cols-[2fr_1fr]">
                            <NumericFormat
                                suffix="%"
                                decimalScale={2}
                                fixedDecimalScale={false}
                                allowNegative={false}
                                thousandSeparator="."
                                decimalSeparator=","
                                customInput={Input}
                                value={interestRate || ''}
                                onValueChange={(values) => setInterestRate(values.floatValue || 0)}
                                placeholder="0%"
                                className="rounded-tr-none rounded-br-none"
                                id="interest-rate"
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
                        <NumericFormat
                            value={monthValue || ''}
                            onValueChange={(values) => setMonthValue(values.floatValue ?? 0)}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="R$ "
                            fixedDecimalScale={true}
                            decimalScale={2}
                            allowNegative={false}
                            customInput={Input}
                            placeholder="R$ 0,00"
                            id="monthly-investment"
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

                <div className="space-y-2">
                    <Label htmlFor="yearly-adjustment">Reajuste anual</Label>

                    <div className="flex items-center gap-2">
                        <NumericFormat
                            suffix="%"
                            decimalScale={2}
                            fixedDecimalScale={false}
                            allowNegative={false}
                            thousandSeparator="."
                            decimalSeparator=","
                            customInput={Input}
                            value={yearlyAdjustment || ''}
                            onValueChange={(values) => setYearlyAdjustment(values.floatValue || 0)}
                            placeholder="0%"
                            id="yearly-adjustment"
                        />

                        <HoverCard openDelay={200}>
                            <HoverCardTrigger asChild>
                                <Button variant="ghost">
                                    <Info />
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="space-y-1">
                                    <p className="text-sm">O reajuste só vai ser aplicado a partir do 13° mês.</p>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </div>
            
            <Button className="w-full" onClick={handleCalculate}>Calcular</Button>
        </div>
    );
}