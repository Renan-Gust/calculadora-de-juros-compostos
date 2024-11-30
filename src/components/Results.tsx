import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useResult } from '@/contexts/ResultContexts';
import { formatCurrency } from '@/utils/formatCurrency';

export function Results() {
    const { total } = useResult();

    if(total.results.length === 0){
        return;
    }

    return (
        <div className='flex flex-wrap justify-between gap-4 w-full mb-10 md:mb-0'>
            <Card className='flex-1'>
                <CardHeader>
                    <CardTitle className='text-center text-lg'>Total em juros</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold tracking-tighter text-center">{formatCurrency(total.results[total.results.length - 1].interestTotal)}</div>
                </CardContent>
            </Card>

            <Card className='flex-1'>
                <CardHeader>
                    <CardTitle className='text-center text-lg'>Valor investido</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold tracking-tighter text-center">{formatCurrency(total.amountAccumulated)}</div>
                </CardContent>
            </Card>

            <Card className='flex-1'>
                <CardHeader>
                    <CardTitle className='text-center text-lg'>Valor final</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold tracking-tighter text-center">{formatCurrency(total.results[total.results.length - 1].accumulated)}</div>
                </CardContent>
            </Card>
        </div>
    );
}
