import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wrapper from './components/Wrapper.jsx';
import Home from './pages/home.jsx';
import SignUpPage from './pages/signUp.jsx';
import SignInPage from './pages/signIn.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignInPage/>} />
          <Route path="sign-up" element={<SignUpPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
