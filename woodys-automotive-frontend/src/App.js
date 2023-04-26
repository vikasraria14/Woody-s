import Login from "./Components/Login/Login";
import { useDispatch } from "react-redux";
import { logInUser} from "./Reducers/loggedInUserReducer";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import VehicleListCustomer from "./Components/VehicleList/VehicleListCustomer";
import NewForm from "./Components/Form/NewForm";
import VehicleListAdminMain from "./Components/VehicleList/VehicleListAdminMain";
import ServiceModal from "./Components/ServiceInfo/ServiceInfoAdmin";
import MyModal from "./Components/ServiceInfo/ServiceInfoUser";
import Stats from "./Components/Stats/CityStats";

const App = () => {
  const dispatch = useDispatch();
//  const navigate = useNavigate();
  //const loggedInUser1=window.localStorage.getItem('loggedInUser')
  //window.localStorage.setItem('loggedInUser', JSON.stringify(res) )
  //window.localStorage.removeItem('loggedInUser')

  const x = window.localStorage.getItem("loggedInUser");
  if (x) {
    dispatch(logInUser(JSON.parse(x)));
  }
  

  return (
    <Router>
      <div className="App">
      
        <Routes>
       
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bookService" element={<NewForm />} />
          <Route path="/adminView" element={<VehicleListAdminMain />} />
          <Route path="/userView" element={<VehicleListCustomer />} />
          <Route path="/serviceModal" element={<ServiceModal />} />
          <Route path="/myModal" element={<MyModal />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
        
      </div>
    </Router>
  );
};
export default App;
