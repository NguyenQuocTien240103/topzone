import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './routes/index';

function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App
