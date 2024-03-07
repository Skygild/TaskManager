import React from "react";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form className="w-full max-w-md p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
            Email
          </label>
          <input type="email" id="email" name="email" className="w-full p-2 border rounded" required />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600 font-semibold mb-2">
            Username
          </label>
          <input type="text" id="username" name="username" className="w-full p-2 border rounded" required />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">
            Password
          </label>
          <input type="password" id="password" name="password" className="w-full p-2 border rounded" required />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-600 font-semibold mb-2">
            Confirm Password
          </label>
          <input type="password" id="confirmPassword" name="confirmPassword" className="w-full p-2 border rounded" required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Register
        </button>

        {/* Additional Text */}
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
