import { useState, useEffect } from "react";
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

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user,setUser]=useAuthContext();

  const navigate = useNavigate();

  const handleLogout =  () => {
    setUser({...userSchema});
    api.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem("user");
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
                {[
                  { icon: LayoutDashboard, text: "Dashboard", primary: true },
                  { icon: UserRound, text: "Clients" },
                  { icon: HardHat, text: "Engineers" },
                  { icon: HousePlus, text: "Projects" },
                  { icon: Settings, text: "Settings" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                      item.primary
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </motion.a>
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
                  Dashboard
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Statistics Cards */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {[
                {
                  title: "Total Clients",
                  value: "45 Verified Clients",
                  color: "bg-blue-500",
                },
                {
                  title: "Total Engineers",
                  value: "25 Verified Engineers",
                  color: "bg-green-500",
                },
                {
                  title: "Pending Verifications",
                  value: "10 Pending",
                  color: "bg-yellow-500",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className={`${card.color} rounded-lg shadow-lg p-6 text-white transform transition-all duration-200`}
                >
                  <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                  <p className="text-2xl font-bold">{card.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Table */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      name: "Hart Hagerty",
                      country: "United States",
                      type: "Client",
                      status: "Verify",
                    },
                    {
                      name: "Brice Swyre",
                      country: "China",
                      type: "Client",
                      status: "Rejected",
                    },
                    {
                      name: "Marjy Ferencz",
                      country: "Russia",
                      type: "Client",
                      status: "Verify",
                    },
                    {
                      name: "Yancy Tear",
                      country: "Brazil",
                      type: "Client",
                      status: "Pending",
                    },
                  ].map((user, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              className="h-10 w-10 rounded-full"
                              src={`https://img.daisyui.com/images/profile/demo/${
                                index + 2
                              }@94.webp`}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.country}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.type}</div>
                        <div className="text-sm text-gray-500">Freelance</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "Verify"
                              ? "bg-green-100 text-green-800"
                              : user.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.status}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Details
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
