import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../config";
import { useContactStore } from "./../store";
import { toast } from "react-hot-toast";
import illustration from "../assets/contact-us.webp";

const Login = () => {
  const setAuth = useContactStore((state) => state.setAuth);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const user = data.user;

        localStorage.setItem("profile", JSON.stringify(user));
        setAuth(user);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login Error");
        setAuth(null);
      });
  };

  return (
    <div className="items-center justify-center flex h-screen w-screen">
      <div className="text-center flex-col space-y-3  max-w-6xl">
        <img src={illustration} alt="illustration" className="w-1/3 mx-auto" />
        <h2 className="text-2xl font-extrabold text-blue-500 ">
          Welcome to our simple Contact List Full Stack Application !
        </h2>
        <div className="flex justify-center">
          <button
            onClick={handleSignIn}
            className="shadow-lg drop-shadow-xl  p-3 flex items-center space-x-2   font-bold bg-gray-200 border border-blue-500 rounded-md text-white"
          >
            <p className="text-blue-600 ">Login with</p>
            <div className="bg-white">
              <FcGoogle size={20} color="black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
