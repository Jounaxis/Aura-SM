import Cabecalho from './components/Cabecalho/Cabecalho'
import Rodape from './components/Rodape/Rodape'
import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

const OutletsPage = lazy(() => import("react-router-dom").then(module => ({ default: module.Outlet })));

export default function App(){
  const location = useLocation();
  const currentPath = location.pathname;
  const hiddenHeaderPaths = ["/", "/cadastro"]; 
  const shouldShowHeader = !hiddenHeaderPaths.includes(currentPath);

  return(
    <div className='container'>
      {shouldShowHeader && <Cabecalho/>}
      <Suspense fallback={<div>Loading...</div>}>
        <OutletsPage/>
      </Suspense>
      <Rodape/>
    </div>

  );
}
