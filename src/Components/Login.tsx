import React, { FC } from "react";
import { Link } from "react-router-dom";
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

          const raw = {
            "request_type": "auth_user",
            "request_body": {
              "user_value": data.email,
              "user_key": data.password
            }
          };
    console.debug(raw)
            fetch('http://localhost:8080/testseis', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(raw)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
  .then(data => {
        console.debug("SE envia");
        console.debug(typeof data);
        console.debug(data);
        toast.success("Solicitud Exitosa",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        localStorage.setItem("auth", "fgngfjmsjn654b44ghnf6g4jsf6gj");
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch(error => {
        console.error("error al enviar solicitud:", error);
        toast.error("ocurrio un erro al intentar iniciar la seción. Por favor, intentalo nuevamente ",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
      });
       try {
          const response = await fetch("http://localhost:8080/testseis",);
          const result = await response.text();
          console.debug(result);
          if (response.ok) {
    
            toast.success("Solicitud Exitosa", 
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
            localStorage.setItem("auth", "fgngfjmsjn654b44ghnf6g4jsf6gj");
            setTimeout(() => {
              history.push("/");
            }, 3000);
          } else {
            toast.error("verifica tu contraseña o email", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: 0,
              toastId: "my_toast",
            });
    
          };
        }
        catch (error){
          console.error("error al enviar solicitud:",error);
          toast.error("ocurrio un erro al intentar iniciar la seción. Por favor, intentalo nuevamente ",
          {
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
                    
                      
                     
                    
                    <p className="card-text pb-2">
                      ¿Ya estas registrado?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/register"}>
                        Sign Up
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
export default Login;
