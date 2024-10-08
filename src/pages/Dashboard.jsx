
import { motion} from "framer-motion";


const Dashboard = ()=>{

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };

return <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
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

}

export default Dashboard;