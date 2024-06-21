import { Table as TableContainer, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useResult } from '@/contexts/ResultContexts';
import { formatCurrency } from '@/utils/formatCurrency';
import { getMonths } from '@/utils/getMonths';

export function Table(){
    const { total } = useResult();

    return(
        <div className="w-full overflow-auto">
            <TableContainer>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mês</TableHead>
                        <TableHead>Juros</TableHead>
                        <TableHead>Total de Juros</TableHead>
                        <TableHead>Acumulado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {total.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.month} - {getMonths(item.month)}</TableCell>
                            <TableCell>{formatCurrency(item.interest)}</TableCell>
                            <TableCell>{formatCurrency(item.interestTotal)}</TableCell>
                            <TableCell>{formatCurrency(item.accumulated)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        </div>
    );
}