import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Student from './student';
import CreateStudent from './create';
import EditStudent from './edit';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Student/>}> </Route>
          <Route path='/create'  element={<CreateStudent/>} /> 
          <Route path='/edit/:rollno'  element={<EditStudent/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
