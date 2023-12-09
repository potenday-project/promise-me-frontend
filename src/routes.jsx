import { createBrowserRouter } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Landing from './pages/Landing';
import RootLayout from './layout/RootLayout';
import Main from './pages/Main';
import MeetingMinutesDetail from './pages/MeetingMinutesDetail';
import MeetingMinutesInput from './pages/MeetingMinutesInput';
import MeetingMinutesList from './pages/MeetingMinutesList';
import Milestone from './pages/Milestone';
import Profile from './pages/Profile';
import ProjectInfo from './pages/ProjectInfo';
import PutCategory from './pages/PutCategory';
import PutDuration from './pages/PutDuration';
import PutMembers from './pages/PutMembers';
import PutProjectName from './pages/PutProjectName';
import PutTopic from './pages/PutTopic';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import TodoList from './pages/TodoList';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Landing />} />
        <Route path='main' element={<Main/>} />
        <Route path='meetingminutesdetail' element={<MeetingMinutesDetail/>} />
        <Route path='meetingminutesinput' element={<MeetingMinutesInput/>} />
        <Route path='meetingminuteslist' element={<MeetingMinutesList/>} />
        <Route path='milestone' element={<Milestone/>} />
        <Route path='profile' element={<Profile/>} />
        <Route path='projectinfo' element={<ProjectInfo/>} />
        <Route path='putcategory' element={<PutCategory/>} />
        <Route path='putduration' element={<PutDuration/>} />
        <Route path='putmembers' element={<PutMembers/>} />
        <Route path='putprojectname' element={<PutProjectName/>} />
        <Route path='puttopic' element={<PutTopic/>} />
        <Route path='signin' element={<Signin/>} />
        <Route path='signup' element={<SignUp/>} />
        <Route path='todolist' element={<TodoList/>} />
      </Route>
    </>
  )
)

export default router;