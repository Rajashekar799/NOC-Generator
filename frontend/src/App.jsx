import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenerateNOC from './pages/GenerateNOC';
import Records from './pages/Records';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">NOC Generator</h1>
            <div>
              <a href="/generate" className="text-white mr-4">Generate NOC</a>
              <a href="/records" className="text-white">Records</a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/generate" element={<GenerateNOC />} />
          <Route path="/records" element={<Records />} />
          <Route path="/" element={<GenerateNOC />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
