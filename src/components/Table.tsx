import { ArrowRight } from 'lucide-react';

import { Table as TableContainer, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useResult } from '@/contexts/ResultContexts';
import { formatCurrency } from '@/utils/formatCurrency';
import { getMonths } from '@/utils/getMonths';

export function Table(){
    const { total } = useResult();

    if(total.results.length === 0){
        return;
    }

    return(
        <div className='w-full'>
            <div className='flex items-center justify-center gap-2 w-full mb-3 md:hidden'>
                <p>Arraste para o lado para ver mais dados</p>
                <ArrowRight size={16} />
            </div>
        
            <TableContainer>
                <TableHeader className='sticky top-0 bg-primary'>
                    <TableRow>
                        <TableHead className='text-primary-foreground text-center'>Mês</TableHead>
                        <TableHead className='text-primary-foreground text-center'>Aporte</TableHead>
                        <TableHead className='text-primary-foreground text-center'>Juros</TableHead>
                        <TableHead className='text-primary-foreground text-center'>Total de Juros</TableHead>
                        <TableHead className='text-primary-foreground text-center'>Acumulado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {total.results.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className='text-center'>{item.month} - {getMonths(item.month)}</TableCell>
                            <TableCell className='text-center'>{formatCurrency(item.monthValue)}</TableCell>
                            <TableCell className='text-center'>{formatCurrency(item.interest)}</TableCell>
                            <TableCell className='text-center'>{formatCurrency(item.interestTotal)}</TableCell>
                            <TableCell className='text-center'>{formatCurrency(item.accumulated)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        </div>
    );
}