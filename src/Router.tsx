import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
export default function Router() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </>
  );
}
