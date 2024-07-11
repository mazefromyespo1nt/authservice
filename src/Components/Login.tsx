import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router";

    type SomeComponentProps = RouteComponentProps;
const Login: FC<SomeComponentProps> = ({ history }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
    //llamada de token junto con validacion de credeciales
  const login = async (data: any) => {

    let params = {
      
      email: data.email,
      password: data.password,
    };
   


          // const raw = {
          //   "request_type": "auth_user",
          //   "request_body": {
          //     "user_value": data.email,
          //     "user_key": data.password
          //   }
            
          // };
          try {
            const response = await fetch('http://localhost:8088/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              if (response.status === 400) {
                toast.error( "Error: ❌ al parecer tu Email no esta en la base de datos o esta incorrecto", {
                  position: "top-center",
                  autoClose: 3000,  
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: 0,
                  toastId: "email_not_found",
                });
              } else if (response.status === 401) {
                toast.error("Error: ❌ La contraseña es incorrecta, verifica la contraseña", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: false,
                  progress: 0,
                  toastId: "invalid_password",
                });
              } else {
                throw new Error('Error en la autenticación');
              }
              throw new Error(errorData.message || 'Error en la autenticación');
            }
      
            const responseData = await response.json();
            toast.success("As ingresado exitosamente ✅", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
            localStorage.setItem("auth", responseData.token);
            setTimeout(() => {
              history.push("/");
            }, 3000);
          } catch (error: any) {
            console.error("Error al enviar solicitud:", error.message);
            toast.error(`Error: ${error.message}`, {
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
        };
      
    //    try {
    //       const response = await fetch("http://localhost:8080/login",);
    //       const result = await response.text();
    //       console.debug(result);
    //       if (response.ok) {
    
    //         toast.success("Solicitud Exitosa", 
    //         {
    //           position: "top-right",
    //           autoClose: 3000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: false,
    //           progress: 0,
    //           toastId: "my_toast",
    //         });
    //         localStorage.setItem("auth", "fgngfjmsjn654b44ghnf6g4jsf6gj");
    //         setTimeout(() => {
    //           history.push("/");
    //         }, 3000);
    //       } else {
    //         toast.error("verifica tu contraseña o email", {
    //           position: "top-right",
    //           autoClose: 3000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: false,
    //           progress: 0,
    //           toastId: "my_toast",
    //         });
    
    //       };
    //     }
    //     catch (error){
    //       console.error("error al enviar solicitud:",error);
    //       toast.error("ocurrio un erro al intentar iniciar la seción. Por favor, intentalo nuevamente ",
    //       {
    //         position: "top-center",
    //           autoClose: 3000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: false,
    //           progress: 0,
    //           toastId: "my_toast",
    //  });
        //} 
  
// vista login
  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 shadow-lg p-3 mb-5 bg-body rounded border border-primary" style={{ maxWidth: "320px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">Login </h3>                
               <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="mb-3 mt-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control shadow-none"
                      id="exampleFormControlInput1"
                      {...register("email", { required: "Email is required!" })}/>                   
                      {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>{errors.email.message} </p>)}                         
                  </div>     
                   <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-none"
                      id="exampleFormControlInput2"
                      {...register("password", {required: "Password is required!",})}/>
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>{errors.password.message} </p>)}
                  </div>       
                    
                     
                 
                  <div className="text-center mt-4 ">
                      <button className="btn btn-outline-primary text-center shadow-none mb-3"type="submit">  
                    Submit
                      </button>
                    
                      
                     
                    
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
export default Login;
