import { BrowserRouter, Switch, Route } from "react-router-dom";
import HostelUI from "./components/hostel/HostelUI";
import HostelDetails from "./components/hostel/HostelDetails";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";


function App() {
  return (
    <BrowserRouter>
      
        <Switch>


          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/UI" component={HostelUI} />
          <Route exact path="/details/:id" component={HostelDetails} />
          {/* <Route exact path="/addHostel" component={AddHostel} /> */}

      
        </Switch>
 
    </BrowserRouter>
    // </ContextProvider>
  );
}

export default App;
