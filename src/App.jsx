import Home from "./pages/Home";
import { useEffect} from "react";
import { useAuthContext } from "./store/AuthContext";
import { BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Login from "./pages/Login";

function App() {

const [user,setUser] = useAuthContext();
    
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user)
  }, [user]);



const handleLogin = (token, name, email,id)=>{

  const newUser = {
   
    id:id,
    email: email,
    name: name,
    token: token,
    isUserLoggedIn: true,
  };
  setUser({...newUser});

};

  return (
     <BrowserRouter >
     
      <Routes >

        <Route
          index
          path="/"
          element={(user.isUserLoggedIn)?
            <Home />:<Navigate to="/login" replace:true />
          }
        />
      
        <Route
          path="/login"
          element={(!user.isUserLoggedIn)?
            <Login handleLogin={handleLogin} isUserLoggedIn={user.isUserLoggedIn}/>:<Navigate to="/" replace:true />
          }
        />
       
      </Routes>
     </BrowserRouter>)


}

export default App;
