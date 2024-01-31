import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../components/Context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();

  const { setIsLoggedIn, setToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoggedIn(true);
      setToken(response.data.token);

      // Handle success (redirect or show a success message)
      console.log("Data login successfull", response);
      //set response.data to local storage
      localStorage.setItem("data", JSON.stringify(response.data.data));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      console.log("token", response.data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      // Handle error (show an error message)
      console.error("Error login data:", error);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-cover bg-no-repeat bg-center bg-[url(https://res.cloudinary.com/dzisbnmi0/image/upload/v1700668516/mount_rhavkt.png)] text-center items-center justify-center relative flex">
        <div className="absolute w-full sm:w-2/3 h-4/5 sm:h-screen bottom-0 px-24 xl:px-48 flex sm:left-0 sm:rounded-l-lg bg-white">
          <div className="flex flex-col text-left justify-center w-full">
            <div className="mb-12">
              <NavLink to="/">
                <ArrowBack />
              </NavLink>
            </div>
            <h2 className="text-3xl mb-3 sm:text-xl">Login Admin</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name="email"
                label="Email"
                type="text"
                placeholder="johndoe@gmail.com"
                errors={errors}
                register={register}
              />
              <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="it's secret"
                errors={errors}
                register={register}
              />
              <div className="w-full">
                <button
                  type="submit"
                  className="box-border w-full min-h-[30px] bg-cyan-600 rounded-[3px] text-white text-xs transition"
                >
                  Login
                </button>
              </div>
            </form>
            <div>
              <p>Belum punya akun?</p>
            </div>
            <div>
              <NavLink to={"/registrasi"}>Daftar Akun</NavLink>
            </div>
            <div>
              <NavLink to={"/login"}>Login Pengguna</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
