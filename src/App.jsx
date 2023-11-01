import "./styles/index.css"
import ListTasks from "./components/ListTasks/ListTasks";
import MyCalendar from "./components/Calendar/MyCalendar";

function App() {


  return <div className="container">
    <div className="App">
      <ListTasks  />
      <MyCalendar/>
    </div>
  </div>;
}

export default App;
