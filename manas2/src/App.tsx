
import { BrowserRouter, Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Layout from './pages/Layout';
import Chat from './pages/Chat';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/authContext';


import React from 'react'

const App:React.FC = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      {/* Top-level routes */}
      <Route path='/' element={<Landing/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/signIn' element={<SignIn/>}/>

      {/* Nested routes - Layout is the parent */}
      <Route path='/layout' element={<Layout/>}>
      <Route path='chat' element={<Chat/>}/>
      <Route path='journal' element={<Journal/>}/>
      <Route path='profile' element={<Profile/>}/>

      </Route>

    </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App
