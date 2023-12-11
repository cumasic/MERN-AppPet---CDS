import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getProfileRequest } from "../api/auth";
import { useEffect, useState } from "react";
import { updateUserRequest, getUserRequest } from "../api/user";

function ProfilePage() {
  const { register, handleSubmit, setValue } = useForm();
  const { user, loading } = useAuth();
  const [newUser, setnewUser] = useState([]);
  const [validator, setValidator] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    if (values.image) {
      const res = {
        username: values.username,
        email: values.email,
        address: values.address,
        phone: values.phone,
        image: values.image[0],
      };
      updateUserRequest(user.id, res);
      await VerificadorEdit();
    } else {
      const res = {
        username: values.username,
        email: values.email,
        address: values.address,
        phone: values.phone,
      };
      updateUserRequest(user.id, res);
      await VerificadorEdit();
    }
    setValidator(false);
  });

  async function VerificadorEdit() {
    const gg = await getUserRequest(user.id);
    setnewUser(gg.data);
    setValidator(true);
  }

  useEffect(() => {
    setValue("username", newUser.username);
    setValue("email", newUser.email);
    setValue("address", newUser.address);
    setValue("phone", newUser.phone);
    async function getProfile() {
      const gg = await getUserRequest(user.id);
      setnewUser(gg.data);
    }
    getProfile();
  }, [validator]);

  return (
    <>
      <div className="h-screen bg-gray-100 font-sans">
        <NavBar />
        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-center justify-center mt-[5vh]">
            <div className="flex items-center">
              <div className="flex flex-col w-72 bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="font-bold text-lg">
                    {validator ? (
                      <input
                        className="w-24 p-1 rounded-md border"
                        {...register("username")}
                      />
                    ) : (
                      <span className="text-xl">{newUser.username}</span>
                    )}
                  </div>
                </div>
                <div className="bg-gray-200 mb-2 h-52 flex flex-col justify-between">
                  <div className="flex justify-center">
                    <h1 className="text-lg font-semibold">Foto Personal</h1>
                  </div>
                  <div className="w-full h-full">
                    {newUser.photo ? (
                      <img
                        src={newUser.photo.url}
                        alt="User"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <img
                        src="https://res.cloudinary.com/disi3bzmx/image/upload/v1701121341/posts/bhbua911khdfqpupieap.jpg"
                        alt="Default"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  {validator && (
                    <>
                      <div>
                        <input
                          type="file"
                          className="w-full text-sm text-gray-700 p-1 border rounded-md"
                          {...register("image")}
                        />
                      </div>
                    </>
                  )}
                  <div className="flex justify-center">
                    {validator ? (
                      <>
                        <button
                          type="submit"
                          className="text-sm font-bold bg-green-500 text-white rounded-md p-1.5 px-2.5 m-2 hover:bg-green-400"
                        >
                          Guardar Perfil
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/profile`}
                          className="text-sm font-bold bg-green-500 rounded-md p-1.5 px-2.5 m-2 hover:bg-green-400 text-white"
                          onClick={VerificadorEdit}
                        >
                          Editar
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-72 w-full ml-5">
                <div className="text-xl font-semibold mb-4">
                  <h1>Datos Personales:</h1>
                </div>
                <div className="mb-2 flex items-start">
                  <h1 className="font-semibold">Email:</h1>
                  {validator ? (
                    <input
                      className="ml-2 w-40 p-1 border rounded-md"
                      {...register("email")}
                    />
                  ) : (
                    <span className="ml-2">{newUser.email}</span>
                  )}
                </div>
                <div className="mb-2 flex items-start">
                  <h1 className="font-semibold">Dirección:</h1>
                  {validator ? (
                    <input
                      className="ml-2 w-32 p-1 border rounded-md"
                      {...register("address")}
                    />
                  ) : (
                    <span className="ml-2">{newUser.address}</span>
                  )}
                </div>
                <div className="mb-2 flex items-start">
                  <h1 className="font-semibold">Telefono:</h1>
                  {validator ? (
                    <input
                      className="ml-2 w-32 p-1 border rounded-md"
                      {...register("phone")}
                    />
                  ) : (
                    <span className="ml-2">{newUser.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfilePage;
