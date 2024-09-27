import { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";


const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex bg-base-200 relative">
      <aside
        className={`w-64 bg-base-100 shadow-lg p-4 rounded-lg lg:block lg:relative fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 lg:translate-x-0`}
      >
        <div className="flex flex-col space-y-4">
          <button
            className="lg:hidden btn btn-circle btn-outline"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <a className="btn btn-primary btn-block hover:bg-white hover:text-primary hover:shadow-xl">
            Dashboard
          </a>
          <a className="btn btn-outline btn-block hover:bg-primary hover:text-gray-100 hover:shadow-xl">
            Clients
          </a>
          <a className="btn btn-outline btn-block rounded-lg hover:bg-primary hover:text-gray-100 hover:shadow-xl">
            Engineers
          </a>
          <a className="btn btn-outline btn-block rounded-lg hover:bg-primary hover:text-gray-100 hover:shadow-xl">
            Projects
          </a>
          <a className="btn btn-outline btn-block rounded-lg hover:bg-primary hover:text-gray-100 hover:shadow-xl">
            Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="navbar bg-base-100 shadow-lg p-4 mx-4 rounded-lg flex justify-between">
          <div className="flex items-center">
            <button
              className="lg:hidden btn btn-outline hover:bg-white hover:text-primary hover:shadow-xl text-sm rounded-lg"
              onClick={toggleSidebar}
            >
              <Menu className="w-6" />
            </button>
            <span className="text-2xl font-bold ml-4">Dashboard</span>
          </div>
          <div className="flex-none">
            <button className="btn btn-outline hover:bg-white hover:text-primary hover:shadow-xl text-sm rounded-lg">
              <Bell className="w-4" />
            </button>

            <div className="avatar ml-4">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://askmescript.com/upload/photos/2020/04/pNFDnM5HcX9sozLiqIN4_24_62b73862def5530a11afeb3a88f402de_image.png"
                  alt="User Avatar"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
            <div className="card shadow-lg hover:shadow-xl bg-primary text-primary-content rounded-lg hover:bg-accent transition duration-300">
              <div className="card-body">
                <h2 className="card-title">Total Clients</h2>
                <p>45 Verified Clients</p>
              </div>
            </div>
            <div className="card shadow-lg hover:shadow-xl bg-secondary text-primary rounded-lg hover:bg-white transition duration-300">
              <div className="card-body">
                <h2 className="card-title">Total Engineers</h2>
                <p>25 Verified Engineers</p>
              </div>
            </div>
            <div className="card shadow-lg hover:shadow-xl bg-accent text-primary-content rounded-lg hover:bg-primary transition duration-300">
              <div className="card-body">
                <h2 className="card-title">Pending Verifications</h2>
                <p>10 Pending</p>
              </div>
            </div>
          </div>

          {/* Table */}

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Client <br />
                    Freelance
                  </td>
                  <td>
                    <div className="badge badge-success text-slate-50 px-4">
                      Verify
                    </div>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                {/* row 2 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Brice Swyre</div>
                        <div className="text-sm opacity-50">China</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Client <br />
                    Freelance
                  </td>
                  <td>
                    <div className="badge badge-error text-slate-900">
                      Rejected
                    </div>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                {/* row 3 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Marjy Ferencz</div>
                        <div className="text-sm opacity-50">Russia</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Client <br />
                    Freelance
                  </td>
                  <td>
                    <div className="badge badge-success text-slate-50 px-4">
                      Verify
                    </div>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                {/* row 4 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Yancy Tear</div>
                        <div className="text-sm opacity-50">Brazil</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Client <br />
                    Freelance
                  </td>
                  <td>
                    <div className="badge badge-warning text-slate-950">
                      Pending
                    </div>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
              {/* foot */}
            </table>
          </div>

          {/* Table */}
        </div>
      </div>
    </div>
  );
};

export default Home;
