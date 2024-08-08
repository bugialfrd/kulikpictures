// import config from "@config/config";
// import { markdownify } from "@lib/utils/textConverter";

// const Contact = ({ data }) => {
//   const { frontmatter } = data;
//   const { title } = frontmatter;
//   const { contact_form_action } = config.params;

//   return (
//     <section className="section">
//       <div className="container max-w-[700px]">
//         {markdownify(title, "h1", "h2 mb-8 text-center")}
//         <form
//           className="contact-form"
//           method="POST"
//           action={contact_form_action}
//         >
//           <div className="mb-6">
//             <label className="mb-2 block" htmlFor="name">
//               Name
//             </label>
//             <input
//               className="form-input w-full"
//               name="name"
//               type="text"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="mb-2 block" htmlFor="email">
//               Email
//             </label>
//             <input
//               className="form-input w-full"
//               name="email"
//               type="email"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="mb-2 block" htmlFor="subject">
//               Subject
//             </label>
//             <input
//               className="form-input w-full"
//               name="subject"
//               type="text"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="mb-2 block" htmlFor="message">
//               Message
//             </label>
//             <textarea className="form-textarea w-full" rows="7" />
//           </div>
//           <button className="btn btn-outline-primary">Submit Now</button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Contact;

// This example uses `@web3forms/react` plugin and tailwindcss for css styling

import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm({
    mode: "onTouched"
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Please update the Access Key in the .env
  const apiKey = process.env.PUBLIC_ACCESS_KEY || "1cf76dc3-c61c-4267-9f3c-176fe89918d2";

  const { submit: onSubmitForm } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Kulik Pictures",
      subject: "Ajukan pertanyaan tentang Kulik Pictures"
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    }
  });

  const formClasses = {
    input: "w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none",
    inputError: "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0",
    inputDefault: "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0",
    button: "w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black",
    spinner: "w-5 h-5 mx-auto text-white dark:text-black animate-spin",
    successMessage: "mt-3 text-sm text-center text-green-500",
    errorMessage: "mt-3 text-sm text-center text-red-500"
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmitForm)} className="mt-10">
        <input
          type="checkbox"
          id="botcheck"
          className="hidden"
          style={{ display: "none" }}
          {...register("botcheck")}
        />

        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            autoComplete="false"
            className={`${formClasses.input} ${
              errors.name ? formClasses.inputError : formClasses.inputDefault
            }`}
            {...register("name", {
              required: "Full name is required",
              maxLength: 80
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
            id="email_address"
            type="email"
            placeholder="Email Address"
            name="email"
            autoComplete="false"
            className={`${formClasses.input} ${
              errors.email ? formClasses.inputError : formClasses.inputDefault
            }`}
            {...register("email", {
              required: "Enter your email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email"
              }
            })}
          />
          {errors.email && (
            <div className="mt-1 text-red-600">
              <small>{errors.email.message}</small>
            </div>
          )}
        </div>

        <div className="mb-3">
          <textarea
            name="message"
            placeholder="Your Message"
            className={`${formClasses.input} h-36 ${
              errors.message ? formClasses.inputError : formClasses.inputDefault
            }`}
            {...register("message", {
              required: "Enter your Message"
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
          className={formClasses.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <svg
              className={formClasses.spinner}
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

      {isSubmitSuccessful && (
        <div className={isSuccess ? formClasses.successMessage : formClasses.errorMessage}>
          {message || (isSuccess ? "Success. Message sent successfully" : "Something went wrong. Please try later.")}
        </div>
      )}
    </div>
  );
}

