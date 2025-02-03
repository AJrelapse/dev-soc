"use client";

import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Name
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Email
        </label>
        <div className="relative mt-1">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Password
        </label>
        <div className="relative mt-1">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Re-type Password
        </label>
        <div className="relative mt-1">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  );
}
