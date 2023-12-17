import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Report from './pages/Report/Report';
import ReportUpload from './pages/ReportUpload/ReportUpload';
export default function Router() {

  return (
    <>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/report/upload" element={<ReportUpload />} />
        </Routes>
    </>
  );
}
