import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const { user, userLogin, loginWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [show, setShow] = useState(false);

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Login user
    userLogin(email, password)
      .then((result) => {
        setSuccess("User login successful!!!");
        form.reset();
        navigate(from, { replace: true });
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  const handleGoogleLogIn = (event) => {
    event.preventDefault();
    loginWithGoogle()
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogIn}>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
              id="email"
              type="email"
              name="email"
              placeholder="Email..."
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
              id="password"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password..."
              required
            />
            <p onClick={() => setShow(!show)}>
              {" "}
              <small>
                {show ? (
                  <span className="cursor-pointer">Hide Password</span>
                ) : (
                  <span className="cursor-pointer">Show Password</span>
                )}
              </small>{" "}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">
              New to Emma-John?{" "}
              <Link
                to="/sign-up"
                className="text-blue-500 hover:text-blue-700"
                href="#"
              >
                <span className="text-amber-400">Create New Account </span>
              </Link>
            </span>
          </div>
          <div className="w-full">
            <button
              className="bg-amber-300 hover:bg-amber-400 text-slate-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Log In
            </button>
          </div>
          <div className="my-2">
            <p>
              {success && (
                <span>
                  {" "}
                  <i className="text-bold text-green-600">{success}</i>{" "}
                </span>
              )}
            </p>
            <p>
              {error && (
                <span>
                  {" "}
                  <i className="text-bold text-red-600">{error}</i>{" "}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center justify-between my-3">
            <span> ----------------- </span>
            <span>OR</span>
            <span> ----------------- </span>
          </div>
          <div className=" w-full">
            <button
              onClick={handleGoogleLogIn}
              type="submit"
              className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-400 w-full flex items-center justify-center"
            >
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                className="w-6 h-6 mr-2"
              />{" "}
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
