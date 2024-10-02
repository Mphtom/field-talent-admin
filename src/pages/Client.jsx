import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, UserCheck, UserX, Fingerprint, CircleUserRound } from "lucide-react";

const Engineer = () => {
  const client = {
    name: "Omar Omar",
    idFrontImage: "https://www.atd13.fr/wp-content/uploads/2021/04/AdobeStock_248823389-web-1536x1024.jpeg",
    idBackImage: "https://npr.brightspotcdn.com/dims4/default/55854a8/2147483647/strip/true/crop/3000x2243+0+0/resize/1760x1316!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fuploads%2F2017%2F4%2F04%2Fshutterstock_428314099.jpg",
    idNumber: "A1234567",
    address: "123 Main St, Cairo, Egypt",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage("");
  };

  const handleVerify = () => {
    setVerificationStatus("verified");
  };

  const handleReject = () => {
    setVerificationStatus("rejected");
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-base-100 flex items-center justify-center p-6">
      <motion.div 
        className="max-w-6xl w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="bg-primary text-primary-content px-10 py-8">
          <h1 className="text-5xl font-bold mb-2">Client Details</h1>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-base-200 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Personal Information</h2>
              <div className="space-y-3">

              <p className="flex items-center">
              <CircleUserRound className="w-5 h-5 mr-3 text-primary" />
                {client.name}</p>
                <p className="flex items-center">

                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  {client.address}
                </p>
                
                <p className="flex items-center">
                  <Fingerprint className="w-5 h-5 mr-3 text-primary" />
                  ID Number: {client.idNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-primary">ID Document</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-base-content mb-2">Front Side</p>
                <img 
                  src={client.idFrontImage} 
                  alt="ID Front" 
                  className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                  onClick={() => openModal(client.idFrontImage)}
                />
              </div>
              <div>
                <p className="text-sm text-base-content mb-2">Back Side</p>
                <img 
                  src={client.idBackImage} 
                  alt="ID Back" 
                  className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                  onClick={() => openModal(client.idBackImage)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mt-8 p-6 bg-base-200">
          <button
            className="btn btn-success btn-lg"
            onClick={handleVerify}
          >
            <UserCheck className="w-5 h-5 mr-2" />
            Accept
          </button>
          <button
            className="btn btn-error btn-lg"
            onClick={handleReject}
          >
            <UserX className="w-5 h-5 mr-2" />
            Reject
          </button>
        </div>

        <AnimatePresence>
          {verificationStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className={`alert ${verificationStatus === "verified" ? "alert-success" : "alert-error"}`}>
                <div>
                  <h3 className="font-bold">{verificationStatus === "verified" ? "Client Accepted" : "Client Rejected"}</h3>
                  <div className="text-xs">
                    {verificationStatus === "verified" 
                      ? "The client's identity has been successfully verified." 
                      : "The client's identity has been rejected. Please review the information."
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <motion.div 
            className="bg-base-100 rounded-lg p-2 relative max-w-4xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="btn btn-circle btn-sm absolute top-2 right-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Engineer;