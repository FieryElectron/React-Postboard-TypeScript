import './App.css';
import SignInPage from './components/SignInPage/SignInPage'
import PostBoardPage from './components/PostBoardPage/PostBoardPage'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer/>
        <Routes>
          <Route path='/' element={
            <SignInPage />
          } />
          <Route path='/postboard' element={
            <PostBoardPage />
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
