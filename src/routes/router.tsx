import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
]);

export default routes;