import { Link } from "react-router";
import { HiExclamationTriangle, HiArrowUturnLeft } from "react-icons/hi2";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
            <HiExclamationTriangle className="relative w-32 h-32 text-blue-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
        </div>

        <p className="text-lg text-gray-600 leading-relaxed">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
        >
          <HiArrowUturnLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
