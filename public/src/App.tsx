
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PAGES
import NavegationBar from './components/NavegationBar'
import AllUsers from './pages/AllUsers'
import User from './pages/User'
import EditUser from './pages/EditUser'
import CreateUser from './pages/CreateUser'

import AllGroup from './pages/AllGroup'
import Group from './pages/Group'
import EditGroup from './pages/EditGroup'
import CreateGroup from './pages/CreateGroup'

import AllRoles from './pages/AllRoles'
import EditRole from './pages/EditRole'
import CreateRole from './pages/CreateRole'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <header className='header'>
          <NavegationBar></NavegationBar>
        </header>
        <Routes>
          <Route path='/users' element={<AllUsers/>}/>
          <Route path='/users/:idUser' element={<User/>}/>
          <Route path='/createUser' element={<CreateUser/>}/>
          <Route path='/editUser/:idUser' element={<EditUser/>}/>

          <Route path='/groups' element={<AllGroup/>}/>
          <Route path='/groups/:idGroup/*' element={<Group/>}/>
          <Route path='/createGroup' element={<CreateGroup/>}/>
          <Route path='/editGroup/:idGroup' element={<EditGroup/>}/>

          <Route path='/roles' element={<AllRoles/>}/>
          <Route path='/createRole' element={<CreateRole/>}/>
          <Route path='/editRole/:idRole' element={<EditRole/>}/>

          <Route path='/' element={<AllUsers/>}/>
          <Route path='*' element={<AllUsers/>}/>
        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
