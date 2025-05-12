import { Toaster } from 'react-hot-toast';
import './App.css';
import MainRouter from './router/MainRouter';

function App() {

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <MainRouter/>
    </>
  )
}

export default App;
