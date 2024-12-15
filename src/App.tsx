import { Table } from './components/Table';
import { Calculator } from './components/Calculator';
import { ResultContextProvider } from './contexts/ResultContexts';
import { Results } from './components/Results';
import { Graphic } from './components/Graphic';

function App(){
    return(
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mx-auto px-4 md:px-8 py-20 min-h-screen">
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