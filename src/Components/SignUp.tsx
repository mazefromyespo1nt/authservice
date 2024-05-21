import React, { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

type SomeComponentProps = RouteComponentProps;
//FUNCIOM CON UN LLAMADO A UN API NO SE OCUPA
const SignUp: FC<SomeComponentProps> = ({ history }) => {
  const {
    register,
    handleSubmit,
       watch,
        reset,
      formState: { errors },
      } = useForm();
  const submitData = (data: any) => {
    let params = {
      firstname: data.firstname,
      lastname: data.apedidos,
      email: data.email,
      date: data.fecha,
      password: data.password,
      confirmpassword: data.cpassword,
    };
    console.log(data);
    axios
      .post("http://localhost:4000/api/signup", params)
      .then(function (response) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        reset();
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Registro de personal
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("firstname", {
                          required: "El nombre es requerido!",
                        })}
                      />
                      {errors.firstname && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.firstname.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Apeidos</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput2"
                        {...register("apeidos", {
                          required: "Tu apeido es requerido!", 
                        })}
                      />
                      {errors.lastname && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.lastname.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput3"
                      {...register("email", { required: "Es requerido!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Fecha de nacimiento</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("fecha", {
                          required: "Fecha es requerida!",
                        })}
                      />
                      {errors.firstname && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.firstname.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput5"
                      {...register("password", {
                        required: "La contraseña es requerida",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Confirmar contraseña</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput6"
                      {...register("cpassword", {
                        required: "cofirme su contrasña",

                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords don't match.",
                      })}
                    />
                    {errors.cpassword && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.cpassword.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Submit
                    </button>
                    <p className="card-text">
                      Regresar al{" "}
                      <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Log In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default SignUp;
