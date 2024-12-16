import { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, TooltipProps, Legend } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { useResult } from '@/contexts/ResultContexts';
import { formatCurrency } from '@/utils/formatCurrency';
import { getMonths } from '@/utils/getMonths';
import { TotalType } from '@/types/investment';

interface CustomTooltipType extends TooltipProps<ValueType, NameType> {
    data: TotalType['results'];
};

export function Graphic(){
    const [isMobile, setIsMobile] = useState(false);
    const { total } = useResult();
    
    useEffect(() => {
        const handleResize = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
        handleResize();
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if(total.results.length === 0){
        return;
    }

    return(
        <LineChart
            width={800}
            height={300}
            data={total.results}
            margin={{ top: 0, right: 0, bottom: 20, left: 20 }}
            className='!w-full md:!w-[896px] !h-full md:!h-[300px]'
        >
            <CartesianGrid />

            <XAxis dataKey='month'>
                <Label value='Meses' offset={-15} position="insideBottom" />
            </XAxis>

            <YAxis dataKey="accumulated" tickFormatter={FormatYAxis} />

            {!isMobile &&
                <Tooltip content={<CustomTooltip data={total.results} />} />
            }

            <Legend verticalAlign="top" wrapperStyle={{ top: -15, width: '100%', left: isMobile ? '15px' : '32px' }} />

            <Line type="monotone" dataKey="amountInvested" stroke="hsl(var(--primary))" name="Total investido" />
            <Line type="monotone" dataKey="interestTotal" stroke="#82ca9d" name="Total em Juros" />
        </LineChart>
    )
}

function FormatYAxis(tickItem: number){
    return formatCurrency(tickItem);
}

function CustomTooltip({ active, payload, label }: CustomTooltipType){
    if(active && payload && payload.length){
        return(
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex-1 p-6">
                <p>{label} - {getMonths(label)}</p>
                <p>Total investido: {formatCurrency(payload[0].payload.amountInvested)}</p>
                <p>Total em Juros: {formatCurrency(payload[0].payload.interestTotal)}</p>
            </div>
        );
    }
    
    return null;
}