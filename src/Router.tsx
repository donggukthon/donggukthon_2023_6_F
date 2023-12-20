import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Report from './pages/Report/Report';
import ReportUpload from './pages/Report/ReportUpload/ReportUpload';
import ReportSuccess from './pages/Report/ReportSuccess/ReportSuccess';
import Trash from './pages/Trash/Trash';
import TrashUpload from './pages/Trash/TrashUpload/TrashUpload';
import Onboarding from './pages/Onboarding/Onboarding';
import TrashList from './pages/TrashList/TrashList';
import ReportList from './pages/ReportList/ReportList';
import RouteChangeTracker from './RouteChangeTracker';

export default function Router() {
  RouteChangeTracker();

  return (
    <>
        <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/report/upload" element={<ReportUpload />} />
            <Route path="/report/upload/success" element={<ReportSuccess />} />
            <Route path="/report/list" element={<ReportList />} />

            <Route path="/trash" element={<Trash />} />
            <Route path="/trash/upload" element={<TrashUpload />} />
            <Route path="/trash/noticeboard" element={<TrashList />} />
        </Routes>
    </>
  );
}
