import { BrowserRouter, Route,Routes } from "react-router-dom";
import ShowTasks from "./compoments/ShowTasks";
import NewTask from "./compoments/NewTask";
import EditTask   from "./compoments/EditTask";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ShowTasks></ShowTasks>}></Route>
      <Route path="/newTask" element={<NewTask></NewTask>}></Route>
      <Route path="/editTask/:id" element={<NewTask></NewTask>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
