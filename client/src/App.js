import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import ErrorPage from './Pages/Error/ErrorPage';
import CreateRecipe from './Pages/CreateRecipe/CreateRecipe';
import DetailRecipe from './Components/DetailRecipe/DetailRecipe';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<DetailRecipe />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
