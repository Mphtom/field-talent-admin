import { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  Bell,
  CircleX,
  Menu,
  HousePlus,
  Settings,
  LayoutDashboard,
  UserRound,
  HardHat,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../store/AuthContext";
import { api } from "../Api/AxiosServiceConfiguration";
import apiService from "../Api/AxiosServiceConfiguration";
//import './Home.css'
const Home = () => {

  const items = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/" ,primary:true},
    { icon: UserRound, text: "Clients", path: "/client" ,primary:false},
    { icon: HardHat, text: "Engineers", path: "/engineer" ,primary:false},
    { icon: HousePlus, text: "Projects", path: "/projects" },
    { icon: Settings, text: "Settings", path: "/settings" }
  ];

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user,setUser]=useAuthContext();

  const navigate = useNavigate();

  const handleLogout =  () => {
    setUser({...userSchema});
    api.defaults.headers.common['Authorization'] = null;
    console.log("logged out");
    navigate('/login',{replace:true});
    };
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSidebarOpen && !event.target.closest("aside")) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
    

  {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="w-64 bg-white shadow-lg fixed top-0 left-0 h-full z-30 lg:relative"
          >
            <div className="flex flex-col h-full p-4">
              <button
                className="lg:hidden absolute top-4 right-4 text-gray-500"
                onClick={toggleSidebar}
              >
                <CircleX className="w-6 h-6" />
              </button>


              <div className="space-y-4 mt-8">
  {items.map((item, index) => (



    <motion.div 
    id="sideNavLink"
      key={index}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200  
      text-gray-700 hover:bg-gray-100
      ` } >

  
      <NavLink    to={item.path}  className={`
       ${(isActive) => {
        return (isActive && 'active' )}}
      

        flex items-center space-x-3 w-full`}>
        <item.icon  className="w-5 h-5" />
        <span>{item.text}</span>
        
      </NavLink>
    </motion.div>
  ))}
</div>




              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <button onClick={handleLogout}>Logout</button>
              </motion.a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="lg:hidden mr-2 text-gray-500"
                  onClick={toggleSidebar}
                >
                  <Menu className="w-6 h-6" />
                </motion.button>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {(items.find((itm)=>{return (itm.primary===true)}))?.text}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Bell className="w-6 h-6" />
                  
                </motion.button>
                <motion.div
                whileHover={{ scale: 1.1 }}
                >{user.name}</motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"
                >
                  
                  <img
                    src="https://askmescript.com/upload/photos/2020/04/pNFDnM5HcX9sozLiqIN4_24_62b73862def5530a11afeb3a88f402de_image.png"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                 
                </motion.div>
                
              </div>
            </div>
          </div>
        </header>


        {/* Main Dashboard Content */}

        <Outlet/>
        {/* <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">



        </main> 
         */}
      </div>
    </div>
  );
};

export default Home;
