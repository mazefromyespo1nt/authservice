import React, { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState, useEffect } from "react";
import { UseListUserContext } from "../context/ListUsersContext";




//6s6stype SomeComponentProps = RouteComponentProps;
const SignUp: React.FC = ({ }): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState
    <{ label: string; regex: RegExp; valid: boolean }[]>([]);
  const { Allfalse } = UseListUserContext();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const validatePassword = (password: string) => {
    const requirements = [
      { label: 'Al menos una mayúscula', regex: /[A-Z]/ },
      { label: 'Mínimo 9 caracteres', regex: /.{9,}/ },
      { label: 'Al menos un número', regex: /\d/ },
      { label: 'Al menos un carácter especial (!@.#)', regex: /[!@.#]/ },
    ];

    const updatedRequirements = requirements.map(req => ({
      ...req,
      valid: req.regex.test(password)
    }));

    setPasswordRequirements(updatedRequirements);
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const signUp = async (data: any) => {
    const payload = {
      nombre: data.name,
      lastname: data.lastname,
      fecha: data.date,
      email: data.email,
      password: data.password,
      telefono: data.number,
    };
    console.log(payload);
    try {
      const response = await fetch('http://localhost:8088/api/usuarios/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {

        if (response.status === 409) {
          throw new Error("El correo electrónico ya está registrado");
        }

        throw new Error('Ocurrió un error al intentar registrarse. Por favor, inténtalo nuevamente.');
      }

      const responseData = await response.json();
      console.debug("Respuesta del servidor:", responseData);
      toast.success("Registro exitoso", {
        position: "top-center",
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
      }, 3000);

    } catch (error: any) {
      console.error("Error al enviar la solicitud:", error.message);
      if (error.message === 'El correo electrónico ya está registrado') {
        toast.error("El correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.", {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      } else {
        toast.error("Ocurrió un error al intentar registrarse. Por favor, inténtalo nuevamente.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      }
    }
  };
  return (
    <>

      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >

          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title text-center text-secondary mt-3 mb-3">
                  Registro de personal
                </h5>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(signUp)}
                >
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("name", {
                          required: "El nombre es requerido!",
                          pattern: {
                            value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
                            message: "solo letras y espacios."
                          }
                        })}
                      />
                      {errors.name && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Apellidos</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput2"
                        {...register("lastname", {
                          required: "Tu apellido es requerido!",
                          pattern: {
                            value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
                            message: " solo letras y espacios"
                          }
                        })}
                      />
                      {errors.lastname && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.lastname.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="" style={{ textAlign: "left" }}>
                    <label className="form-label">Email-@</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput3"
                      {...register("email", {
                        required: "Es requerido!",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Ingresa un correo electrónico válido"
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="" style={{ textAlign: "left" }}>
                      <label className="form-label">Fecha de nacimiento</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("date", {
                          required: "La fecha es requerida!",
                          pattern: {
                            value: dateRegex,
                            message: "Formato de fecha inválido.",
                          },
                        })}
                      />
                      {errors.date && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.date.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="" style={{ textAlign: "left" }}>
                      <label className="form-label">Numero Telefonico</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput2"
                        {...register("number", {
                          required: "Se requiere el numero telefonico",
                          pattern: {
                            value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                            message: "Formato de número telefónico inválido. Debe ser un número de 10 dígitos."
                          }
                        })}
                      />
                      {errors.number && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.number.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-8" style={{ textAlign: "left" }}>
                    <label className="form-label" >Crea una Contraseña</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-sm"
                        {...register("password", {
                          required: "La contraseña es requerida",
                        })}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ borderLeft: "none" }}
                      >
                        <img
                          src={showPassword ? "/iconos/eye-slash.png" : "/iconos/eye.png"}
                          alt="Mostrar/Ocultar contraseña"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </button>
                    </div>
                    <ul className="list-unstyled mt-2">
                      {passwordRequirements.map((req, index) => (
                        <li key={index} style={{ color: req.valid ? 'green' : 'red', fontSize: 10 }} >
                          {req.valid ? "✔️" : "❌"} {req.label}
                        </li>
                      ))}
                    </ul>
                    {errors.password && <p className="text-danger" style={{ fontSize: 14 }}>{errors.password.message}</p>}
                  </div>
                  <div className="col-md-8" style={{ textAlign: "left" }}>
                    <label className="form-label">Confirmar contraseña</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput6"
                      {...register("cpassword", {
                        required: "confirme su contrasña",

                        validate: (value) =>
                          value === watch("password") ||
                          "La contraseña no coincide echale un ojo",
                      })}

                    />

                    {errors.cpassword && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.cpassword.message}
                      </p>
                    )}

                  </div>
                  <div className="text-center mt-4 " >
                    <select className="form-select" aria-label="Size 4 select example">
                      <option selected>Selecciona un Rol</option>
                      <option value="1">Administrador</option>  
                      <option value="2">Custodio</option>
                      <option value="3">Manejador</option>
                      <option value="3">Cliente</option>

                    </select>
                  </div>
                  <div className="text-center mt-4 " >
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Submit
                    </button >

                  </div>
                  <a onClick={Allfalse} href="#">Regresar al inicio</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
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
