import { useNavigate } from "react-router-dom";

function Landingpage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      {/* <Navbar /> */}
      {/* Hero Section */}
      <section
        className="flex-grow relative flex items-center justify-center text-center px-4 w-full h-screen m-0 p-0">
        {/* Background Video */}
        <video
          src="./assets/videoplayback.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

        {/* Hero Content */}
        <div className="absolute z-20">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4 text-gray-50">
            Welcome to <span className="text-[#EE4266]">Color</span><span className="text-[#ABCDEF]">Buddy</span>
          </h1>
          <p className="text-lg md:text-2xl mb-6 text-gray-50">
            Generate color palettes according to your emotions.
          </p>
          <p className="text-lg mb-6 text-gray-50">
            To use our services, please login or create a new account by signing up.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-600 hover:bg-indigo-700 text-gray-50 font-semibold py-3 px-6 rounded-md">
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-gray-50 text-indigo-600 hover:bg-gray-200 font-semibold py-3 px-6 rounded-md">
              Sign Up
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landingpage;
