import { Table } from './components/Table';
import { Calculator } from './components/Calculator';
import { ResultContextProvider } from './contexts/ResultContexts';
import { Results } from './components/Results';

function App(){
    return(
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl mx-auto px-4 md:px-8 py-20 [&>div]:max-h-96">
            <ResultContextProvider>
                <Calculator />
                <Results />
                <Table />
            </ResultContextProvider>
        </div>
    );
}

export default App;