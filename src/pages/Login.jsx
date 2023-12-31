import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadingWheel } from "../assets/images";
import Cookies from "js-cookie";
import { baseApiUrl } from "../constant/index.js";

export default function Login() {
  const [input, setInput] = useState({ nim: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await fetch(`${baseApiUrl}/user/login`, {
        headers: {
          "Content-type": "application/json",
        },

        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify({
          nim: input.nim,
          password: input.password,
        }),
      });

      const res = await data.json();

      if (res.success) {
        setLoading(false);
        Cookies.set("auth", res.token, { expires: 1 });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      if (error) {
        setLoading(false);
        setError(true);
      }
    }
  }

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="bg-cover h-screen bg-center flex items-center justify-center bg-loginBg max-sm:bg-cover">
      <div className="rounded-xl shadow-xl mx-auto bg-white">
        <div className="sm:p-9 p-6">
          <h1 className="text-center font-bold text-3xl">Login and Enjoy Your Ride</h1>
          <p className="my-3 text-center text-sm">
            Get your bike and explore Polinema comfortably
          </p>

          <form onSubmit={handleLogin} className="mt-12">
            <div className="my-5">
              <h6 className="text-sm">NIM</h6>
              <div className="mt-2">
                <input
                  className="border border-black rounded-md p-2 w-full"
                  type="text"
                  onChange={(e) => setInput({ ...input, nim: e.target.value })}
                  value={input.nim}
                />
              </div>
            </div>
            <div className="my-5">
              <h6 className="text-sm">Password</h6>
              <div className="mt-2">
                <input
                  className="border border-black rounded-md p-2 w-full"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setInput({ ...input, password: e.target.value })}
                  value={input.password}
                />
              </div>
            </div>
            <div className="my-10 flex flex-row w-full justify-between items-center">
              <div className="flex justify-between items-center gap-3">
                <input
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="checkbox"
                  className="rounded-sm"
                />
                <label className="text-sm">See password</label>
              </div>

              <div className="basis-1/2">
                <h6 className="text-right text-sm font-semibold">
                  <a href="#">Forgot Password ?</a>
                </h6>
              </div>
            </div>
            <button className="rounded-md p-2 w-full bg-primary text-center text-base font-semibold roun">
              {loading ? (
                <img
                  src={loadingWheel}
                  alt="loading"
                  className="animate-spin w-5 m-auto"
                />
              ) : (
                "SIGN IN"
              )}
            </button>
            <h1>{error && "Error"}</h1>
          </form>
        </div>
      </div>
    </div>
  );
}
