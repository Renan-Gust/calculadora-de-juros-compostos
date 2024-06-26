import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { calculate } from '@/utils/calculate';
import { useResult } from '@/contexts/ResultContexts';

export function Calculator(){
    const { interestRate, setInterestRate, initialValue, setInitialValue, monthValue, setMonthValue, period, setPeriod, setTotal } = useResult();

    function handleCalculate(){        
        calculate({
            interestRate,
            initialValue,
            monthValue,
            period,
            setTotal
        });
    }

    return(
        <div className="w-full">
            <div className="grid grid-cols-1 gap-4 mb-6">

                <div className='grid grid-cols-[1fr_2fr] gap-4'>
                    <div className="space-y-2">
                        <Label htmlFor="initial-value">Valor inicial</Label>
                        <Input
                            id="initial-value"
                            type="number"
                            placeholder="R$ 0,00"
                            onChange={(e) => setInitialValue(+e.target.value)}
                        />
                    </div>
                
                    <div className="space-y-2">
                        <Label htmlFor="interest-rate">Taxa de juros</Label>

                        <div className="grid grid-cols-[2fr_1fr]">
                            <Input
                                id="interest-rate"
                                type="number"
                                placeholder="% 0,00"
                                className='rounded-tr-none rounded-br-none'
                                onChange={(e) => setInterestRate(+e.target.value)}
                            />

                            <Select>
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

                <div className='grid grid-cols-[1fr_2fr] gap-4'>
                    <div className="space-y-2">
                        <Label htmlFor="monthly-investment">Investimento mensal</Label>
                        <Input
                            id="monthly-investment"
                            type="number"
                            placeholder="R$ 0,00"
                            onChange={(e) => setMonthValue(+e.target.value)}
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
                                onChange={(e) => setPeriod(+e.target.value)}
                            />

                            <Select>
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