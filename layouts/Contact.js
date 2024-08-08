// This example uses `@web3forms/react` plugin and tailwindcss for css styling

import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Replace with your actual API key or load from environment variables
  const apiKey = process.env.PUBLIC_ACCESS_KEY || "1cf76dc3-c61c-4267-9f3c-176fe89918d2";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "name",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  return (
    <div className="max-w-lg mx-auto mt-10">
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="checkbox"
          id="botcheck"
          className="hidden"
          style={{ display: "none" }}
          {...register("botcheck")}
        />

        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            autoComplete="off"
            className={`w-full px-4 py-3 border-2 rounded-md outline-none ${
              errors.name
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-gray-600"
            }`}
            {...register("name", {
              required: "Full name is required",
              maxLength: 80,
            })}
          />
          {errors.name && (
            <div className="mt-1 text-red-600">
              <small>{errors.name.message}</small>
            </div>
          )}
        </div>

        <div className="mb-5">
          <input
            type="number"
            placeholder="Nomor Whatsapp"
            autoComplete="off"
            className={`w-full px-4 py-3 border-2 rounded-md outline-none ${
              errors.name
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-gray-600"
            }`}
            {...register("whatsapp", {
              required: "Masukkan nomor whatsapp",
              maxLength: 13,
            })}
          />
          {errors.name && (
            <div className="mt-1 text-red-600">
              <small>{errors.whatsapp.message}</small>
            </div>
          )}
        </div>

        <div className="mb-5">
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="off"
            className={`w-full px-4 py-3 border-2 rounded-md outline-none ${
              errors.email
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-gray-600"
            }`}
            {...register("email", {
              required: "Enter your email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <div className="mt-1 text-red-600">
              <small>{errors.email.message}</small>
            </div>
          )}
        </div>

        <div className="mb-5">
          <textarea
            placeholder="Your Message"
            className={`w-full px-4 py-3 border-2 rounded-md outline-none ${
              errors.message
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-gray-600"
            }`}
            {...register("message", {
              required: "Enter your Message",
            })}
          />
          {errors.message && (
            <div className="mt-1 text-red-600">
              <small>{errors.message.message}</small>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <svg
              className="w-5 h-5 mr-3 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Send Message"
          )}
        </button>
      </form>

      {isSubmitSuccessful && isSuccess && (
        <div className="mt-4 text-sm text-center text-green-500">
          {message || "Success. Message sent successfully"}
        </div>
      )}
      {isSubmitSuccessful && !isSuccess && (
        <div className="mt-4 text-sm text-center text-red-500">
          {message || "Something went wrong. Please try later."}
        </div>
      )}
    </div>
  );
}



