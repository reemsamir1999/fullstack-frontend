import { useForm } from "react-hook-form";
import { signUp } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await signUp(data.email, data.name, data.password);
      alert("Sign Up Successful! Redirecting to Sign In...");
      navigate("/signin");
    } catch (error) {
      const err = error as AxiosError;
      alert("Signup Failed! " + (err.response?.data as any)?.message || "Unknown error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+\.\S+$/ })}
              placeholder="Email"
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
          </div>
          
          <div>
            <input
              {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
              placeholder="Name"
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>}
          </div>

          <div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must have a letter, number, and special character",
                },
              })}
              type="password"
              placeholder="Password"
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
          </div>

          <button type="submit" className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-4 text-center">
          Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}
