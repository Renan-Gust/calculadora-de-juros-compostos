import { Table } from './components/Table';
import { Calculator } from './components/Calculator';
import { ResultContextProvider } from './contexts/ResultContexts';
import { Results } from './components/Results';
import { Graphic } from './components/Graphic';

function App(){
    return(
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto px-4 md:px-8 py-20 min-h-screen">
            <div>
                <h1 className='text-center text-xl md:text-2xl mb-4'>Calculadora de Juros Compostos com Reajuste Anual nos Aportes</h1>
                <p className='text-center'>Simule o impacto dos juros compostos nos seus investimentos, levando em consideração aportes anuais reajustados. Basta preencher os valores abaixo e veja como seus investimentos crescem com o tempo.</p>
            </div>

            <ResultContextProvider>
                <Calculator />
                <Results />
                <Graphic />
                <Table />
            </ResultContextProvider>
        </div>
    );
}

export default App;