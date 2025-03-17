import { useForm } from "react-hook-form";
import { signIn } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await signIn(data.email, data.password);
      alert("Login Successful! Redirecting to Dashboard...");
      navigate("/dashboard");
    } catch (error) {
      const err = error as AxiosError;
      alert("Login Failed! " + (err.response?.data as any)?.message || "Unknown error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
          </div>

          <div>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
          </div>

          <button type="submit" className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
