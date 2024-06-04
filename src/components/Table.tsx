import { Table as TableContainer, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export function Table(){
    return(
        <div className="w-full overflow-auto">
            <TableContainer>
                <TableHeader>
                    <TableRow>
                        <TableHead>Final Value</TableHead>
                        <TableHead>Accumulated Interest</TableHead>
                        <TableHead>Effective Annual Rate</TableHead>
                        <TableHead>Future Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>$10,000.00</TableCell>
                        <TableCell>$2,000.00</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>$12,000.00</TableCell>
                    </TableRow>
                </TableBody>
            </TableContainer>
        </div>
    );
}