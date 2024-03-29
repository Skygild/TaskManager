import React from "react";

export default function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form className="w-full max-w-md p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
            Email
          </label>
          <input type="email" id="email" name="email" className="w-full p-2 border rounded text-black" required />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">
            Password
          </label>
          <input type="password" id="password" name="password" className="w-full p-2 border rounded text-black" required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" disabled>
          Sign In
        </button>
      </form>
    </div>
  );
}
