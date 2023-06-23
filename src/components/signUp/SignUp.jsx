import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, createUser, verifyEmailAddress } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPass = form.confirmPass.value;
    console.log(email, password, confirmPass);

    if (password !== confirmPass) {
      setError("Passwords did not match!");
      return;
    } else if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    // Register User
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setSuccess("User registration successful!");
        console.log(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(error.message);
      });

    // Verify email address
    verifyEmailAddress()
      .then((result) => {
        setSuccess("Please verify your email address.");
        console.log(result);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(error.message);
      });
    form.reset();
    // Clear message
    setSuccess("");
    setError("");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignUp}>
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
              type="password"
              name="password"
              placeholder="Password..."
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
              id="confirm-password"
              type="password"
              name="confirmPass"
              placeholder="Confirm Password..."
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700"
                href="#"
              >
                <span className="text-amber-400">Log In</span>
              </Link>
            </span>
          </div>
          <div className="my-2">
            <p className="text-red-600 font-bold">
              <i>{error && <span>{error}</span>}</i>
            </p>
            <p className="text-green-700 font-bold">
              {" "}
              <i>{success && <span>{success}</span>}</i>
            </p>
          </div>
          <div className="w-full">
            <button
              className="bg-amber-300 hover:bg-amber-400 text-slate-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-between my-3">
            <span> ----------------- </span>
            <span>or</span>
            <span> ----------------- </span>
          </div>
          <div className=" w-full">
            <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-400 w-full flex items-center justify-center">
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

export default SignUp;
