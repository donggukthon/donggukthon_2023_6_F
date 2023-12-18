import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Report from './pages/Report/Report';
import ReportUpload from './pages/Report/ReportUpload/ReportUpload';
import ReportSuccess from './pages/Report/ReportSuccess/ReportSuccess';
export default function Router() {

  return (
    <>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/report/upload" element={<ReportUpload />} />
            <Route path="/report/upload/success" element={<ReportSuccess />} />
        </Routes>
    </>
  );
}
