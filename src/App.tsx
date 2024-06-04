import { useState } from 'react';

import { Table } from './components/Table';
import { Calculator } from './components/Calculator';

function App(){
    const [initialValue, setInitialValue] = useState(1000);
    const [monthValue, setMonthValue] = useState(100);
    const [annualInterestRate, setAnnualInterestRate] = useState(12);
    const [periodAnnual, setPeriodAnnual] = useState(1);
    const [total, setTotal] = useState([]);

    function handleCalculate(){
        const monthsTotal = periodAnnual * (12 + 1);
        const monthlyRate = (annualInterestRate / 12) / 100;
        const arr: any = [];

        Array.from({ length: monthsTotal }).map((_, index) => {
            if(index === 0){
                arr.push({
                    mes: index,
                    juros: 0,
                    totalJuros: 0,
                    acumulado:  initialValue
                });
            }
            
            if(index === 1){
                const juros = Number((initialValue === 0 ? 0 : initialValue * monthlyRate).toFixed(2));

                arr.push({
                    mes: index,
                    juros: juros,
                    totalJuros: juros,
                    acumulado:  Number((initialValue + monthValue + juros).toFixed(2))
                });
            }

            if(index > 1){
                const juros = Number((arr[index - 1].acumulado * monthlyRate).toFixed(2));

                arr.push({
                    mes: index,
                    juros: juros,
                    totalJuros: 0,
                    acumulado: 0
                });

                arr[index].totalJuros = calcularTotalDeJuros(index);
                arr[index].acumulado = Number((juros + monthValue +  arr[index - 1].acumulado).toFixed(2));
            }
        });

        function calcularTotalDeJuros(pos){
            let juros = 0;

            const newArr = [...arr];

            newArr.map(item => juros += item.juros);

            console.log(juros);

            return Number((juros).toFixed(2));
        }

        console.log(arr);
        setTotal(arr);
    }

    return(
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl mx-auto px-4 md:px-8 h-screen">
            <Calculator />
            <Table />
        </div>
    );
}

export default App;