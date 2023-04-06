// import './App.css';
// import { Routes, Route, Link } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Registeration/registration';
import Signin from './components/Signin/signin';
import PastSignin from './components/Past-Signin/pastsignin';
import PublicRoute from './components/routes/publicRoutes';
import ProtectedRoute from './components/routes/protectedRoutes';

function App() {
  return (
    <>
      <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Register/>} />
          <Route path='/signin' element={<Signin/>} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/pastsignin' element={<PastSignin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      </div>
    </>

  );
}

export default App;
