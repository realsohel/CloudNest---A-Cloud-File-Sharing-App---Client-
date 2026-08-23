import { useAuth } from "@clerk/react";
import  { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { userCreditsContext } from "../context/UserCreditsContext";
import { fetchFiles, uploadFiles } from "../services/FileService";
import { AlertCircle, Loader2 } from "lucide-react";
import DashboardUpload from "../components/DashboardUpload";
import RecentFiles from "../components/RecentFiles";

const Dashboard = () => {
  const [recentFiles, setRecentFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { getToken } = useAuth();

  const {
    credits,
    setCredits,
    fetchUserCredits,
  } = useContext(userCreditsContext);

  const MAX_FILES = 5;

  const fetchRecentFiles = async () => {
    try {
      setIsLoading(true);

      const token = await getToken();

      const response = await fetchFiles(token);

      const sortedFiles = [...response.data]
        .sort(
          (a, b) =>
            new Date(b.uploadedAt) - new Date(a.uploadedAt)
        )
        .slice(0, 5);

      setRecentFiles(sortedFiles);

    } catch (error) {
      console.error(
        "Error fetching recent files:",
        error
      );

      setMessage(
        "Unable to load your recent files."
      );

      setMessageType("error");

    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchRecentFiles();
  }, [getToken]);


  const handleFileChange = (e) => {

    const selected = Array.from(e.target.files || []);

    if (selected.length === 0) {
      return;
    }

    const totalFiles =
      selectedFiles.length + selected.length;


    // Maximum 5 files
    if (totalFiles > MAX_FILES) {

      setMessage(
        `You can only upload a maximum of ${MAX_FILES} files at once.`
      );

      setMessageType("error");

      return;
    }


    // Credit validation
    if (totalFiles > credits) {

      setMessage(
        `You only have ${credits} credit${
          credits === 1 ? "" : "s"
        } remaining. Please select ${
          credits
        } or fewer file${
          credits === 1 ? "" : "s"
        }.`
      );

      setMessageType("error");

      return;
    }


    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...selected,
    ]);

    setMessage("");
    setMessageType("");
  };

  const handleRemoveFile = (index) => {

    setSelectedFiles((prevFiles) =>
      prevFiles.filter(
        (_, idx) => idx !== index
      )
    );

    setMessage("");
    setMessageType("");
  };


  const handleUpload = async () => {

    if (selectedFiles.length === 0) {
      setMessage( "Please select at least one file to upload.");
      setMessageType("error");
      return;
    }


    if (selectedFiles.length > MAX_FILES) {
      setMessage( `You can only upload a maximum of ${MAX_FILES} files at once.` );
      setMessageType("error");
      return;
    }


    if (selectedFiles.length > credits) {
      setMessage(`You only have ${credits} credit${credits === 1 ? "" : "s"} remaining.`);
      setMessageType("error");
      return;
    }


    setUploading(true);
    setMessage("Uploading files...");
    setMessageType("info");


    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });


    try {

      const token = await getToken();
      const response = await uploadFiles(
        token,
        formData
      );

      console.log("Upload response:", response);

      if ( response?.data?.remainingCredits !== undefined) {
        setCredits( response.data.remainingCredits);

      } else {
        // Fallback: fetch latest credits
        await fetchUserCredits();

      }

      setMessage( `${selectedFiles.length} file${ selectedFiles.length === 1? "": "s"} uploaded successfully.`);
      setMessageType("success");
      setSelectedFiles([]);

      await fetchRecentFiles();
      await fetchUserCredits();


    } catch (error) {

      console.error( "Error uploading files:",error);

      setMessage(error.response?.data?.message || "Error uploading files. Please try again later.");
      setMessageType("error");

    } finally {
      setUploading(false);
    }
  };


  const remainingUploads = Math.min(MAX_FILES,credits);


  return (
    <DashboardLayout activeMenu="Dashboard">

      <div className="p-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            My Nest
          </h1>
          <p className="text-gray-600 mt-1">
            Upload, manage and share your files securely.
          </p>

        </div>


        {/* Message */}
        {message && (
          <div className={` mb-6 p-4 rounded-lg flex items-center gap-3 ${
                messageType === "error"
                  ? "bg-red-50 text-red-700"
                  : messageType === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-blue-50 text-blue-700"
              }
            `}
          >

            {messageType === "error" && (
              <AlertCircle size={20} />
            )}

            <span>{message}</span>

          </div>

        )}


        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Upload Section */}
          <div className="lg:col-span-2">

            <DashboardUpload
              files={selectedFiles}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
              uploading={uploading}
              onRemoveFile={handleRemoveFile}
              remainingUploads={remainingUploads}
              credits={credits}
            />

          </div>


          {/* Recent Files */}
          <div className="lg:col-span-3">

            {isLoading ? (

              <div className=" flex justify-center items-center h-64 bg-white rounded-xl border border-gray-200">
                
                <Loader2 className="animate-spin mr-2 text-blue-600" size={24} />
                <span className="text-gray-600">
                  Loading recent files...
                </span>
              
              </div>

            ) : (
              <RecentFiles files={recentFiles}/>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;