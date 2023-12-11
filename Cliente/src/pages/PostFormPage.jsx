import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate,useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

function PostFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { user, isAuthenticated } = useAuth();
  const { createPost, updatePost, getMyPosts, getPost } = usePosts();
  const params = useParams()
  const navigate  = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
    console.log(values);
    const res = {
      description: values.description,
      photo: values.image[0],
    };
    if(params.id){

      await updatePost(params.id,res);
    } else {
      await createPost(res);
    }
    // Después de que la creación del post se completa, realiza la redirección
    navigate("/my-posts");
  } catch (error) {
    console.error("Error al crear el post", error);
  }
  });

  useEffect(() => {
    async function loadPost(){
      if(params.id){
        const post = await getPost(params.id)
        setValue("description", post.description)
      }
    }
    loadPost()
  },[])


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white max-w-md w-full p-10 rounded-md shadow-md">
        {params.id ? (
          <h1 className="text-2xl font-bold text-center mb-4">Editar Publicación</h1>
        ) : (
          <h1 className="text-2xl font-bold text-center mb-4">Añadir Publicación</h1>
        )}
        <form onSubmit={onSubmit}>
          <textarea
            className="w-full bg-gray-100 rounded-md p-4 mb-4 resize-none focus:outline-none"
            type="text"
            autoComplete="off"
            {...register("description", { required: true })}
            placeholder="Descripción"
          />
          {errors.description && <p className="text-red-500 text-sm">La descripción es requerida</p>}

          <input
            className="w-full bg-gray-100 rounded-md p-2 mb-4 focus:outline-none"
            type="file"
            {...register("image")}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2 font-bold hover:bg-blue-400 focus:outline-none"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default PostFormPage;

/*
          

          <textarea
            className="w-full bg-slate-200 rounded-md p-2 m-2"
            type="text" autoComplete="off"
            {...register("telefono", { required: true })}
            placeholder="Teléfono"
          />
          {errors.telefono && <p className="text-red-500">Teléfono es requerido</p>}

          <textarea
            className="w-full bg-slate-200 rounded-md p-10 m-2"
            type="text" autoComplete="off"
            {...register("direccion", { required: true })}
            placeholder="Dirección"
          />
          {errors.direccion && <p className="text-red-500">Dirección es requerida</p>}
*/