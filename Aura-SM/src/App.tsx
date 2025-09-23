import Cabecalho from './components/Cabecalho/Cabecalho'
import Rodape from './components/Rodape/Rodape'
import { lazy, Suspense } from 'react';

const OutletsPage = lazy(() => import("react-router-dom").then(module => ({ default: module.Outlet })));

export default function App(){

  return(
    
    <div className='container'>
      <Cabecalho/>
      <Suspense fallback={<div>Loading...</div>}>
        <OutletsPage/>
      </Suspense>
      <Rodape/>
    </div>

  );
}