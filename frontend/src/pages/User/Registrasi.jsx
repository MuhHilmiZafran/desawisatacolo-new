import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import axios from "axios";

const Registrasi = () => {
  const navigate = useNavigate();

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

      console.log(data);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/registrasi`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success (redirect or show a success message)
      console.log("Data register successfully");
      navigate(`/login`);
    } catch (error) {
      // Handle error (show an error message)
      console.error("Error register data:", error);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-cover bg-no-repeat bg-center bg-[url(https://res.cloudinary.com/dzisbnmi0/image/upload/v1700668516/mount_rhavkt.png)] text-center items-center justify-center relative flex">
        <div className="absolute w-full sm:w-2/3 h-2/3 sm:h-screen bottom-0 px-24 md:px-48 py-8 flex sm:left-0 sm:rounded-l-lg bg-white">
          <div className="flex flex-col text-left mt-12 md:mt-0 w-full">
            <div className="mb-5">
              <NavLink to="/">
                <ArrowBack />
              </NavLink>
            </div>
            <h2 className="text-3xl mb-3 sm:text-xl">Daftar Akun</h2>
            <div className="max-h-screen overflow-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <InputField
                  name="nama"
                  label="Nama Lengkap"
                  type="text"
                  placeholder="johndoe"
                  errors={errors}
                  register={register}
                /> */}
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@example.com"
                  errors={errors}
                  register={register}
                />
                {/* <InputField
                  name="username"
                  label="Username"
                  type="username"
                  placeholder="johndoe"
                  errors={errors}
                  register={register}
                />
                <InputField
                  name="nomor"
                  label="Nomor Handphone"
                  type="number"
                  placeholder="08xxxxxxxxxx"
                  errors={errors}
                  register={register}
                /> */}
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
                    Daftar
                  </button>
                </div>
              </form>
              <div>
                <p>Sudah punya akun?</p>
              </div>
              <div>
                <NavLink to={"/login"}>Login</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full"></div>
      </div>
    </>
  );
};

export default Registrasi;
