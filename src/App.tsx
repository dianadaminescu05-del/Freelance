import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DespreNoi from './pages/DespreNoi';
import Servicii from './pages/Servicii';
import Comenzi from './pages/Comenzi';
import B2B from './pages/B2B';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/despre-noi" element={<DespreNoi />} />
        <Route path="/servicii" element={<Servicii />} />
        <Route path="/comenzi" element={<Comenzi />} />
        <Route path="/b2b" element={<B2B />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
