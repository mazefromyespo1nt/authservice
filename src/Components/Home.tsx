import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { UseListUserContext } from "../context/ListUsersContext";
import "../Components/componentscss/home.css";
import dash2 from "./vitasdash/dash2";
import dash3 from "./vitasdash/dash3";
import SignUp from "./SignUp";
import Dash1 from "./vitasdash/dash1";
import { useMenuContext } from "../context/contextmove";


type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({  }) => {
  const { showSignUp, showDash1, openSignUp, openDash1, Allfalse } = UseListUserContext();
  const { menuOpen, toggleMenu } = useMenuContext();
const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/login");
};

  
  //vista HOME 
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 50,
          paddingRight: 50,}}>
        
      
        <button className="btn btn-primary" onClick={toggleMenu}>
          <img src="iconos/list_menu.png" className="img-fluid-rounded float-start" alt="Menu" />
          Menu
        </button>

        <div className={`offcanvas offcanvas-start ${menuOpen ? "show" : ""}`} id="offcanvasScrolling">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu desplegable</h5>
            <button type="button" className="btn-close" onClick={toggleMenu}></button>
          </div>
              <ul className="list-group list-group-flush-list-group-item-table-dark" >

                    <p style={{height: "25px"}}>
                      <a className="list-group-item dropdown-toggle" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style={{backgroundColor:"#64aee5",}}>
                        Usuario
                     </a>
                    </p>
                    <div className="collapse" id="collapseExample">
                      <div className="#">
                        <li className="list-group-item"><button className="butt" >
                        <a className="dropdown-item" href="#" onClick={openSignUp}>Registrar usuario 
                  </a>
                        </button></li>
                        <li className="list-group-item"><button className="butt" >
                          <a className ="dropdown-item" href="#" onClick={openDash1}>
                           Usuarios registrados</a>
                        </button></li>
                      </div>
                    </div>
              </ul> 
                   <ul className="list-group list-group-flush-list-group-item-table-dark" >

                    <p style={{height: "25px"}}>
                      <a className="list-group-item dropdown-toggle" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample" style={{backgroundColor:"	#64aee5", }}>
                        Link with href
                      </a>
                    </p>
                    <div className="collapse" id="collapseExample2">
                      <div className="#">
                        <li className="list-group-item"><button className="butt" >
                          dash2
                        </button></li>
                        <li className="list-group-item"><button className="butt" >
                          dash3
                        </button></li>
                      </div>
                    </div>
                    </ul> 
        <div className="dropdown mt-3">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                Dropdown button
              </button>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
       </div>
          <div className="offcanvas-body">
            <p>Intenta desplazarte por el resto de la página para ver esta opción en acción.</p>
          </div>
       </div>

       <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
      <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#" onClick={Allfalse} style={{fontSize: 18}}>
        Inicio
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Details</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               Operaciones
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">
                   Registrar Usuario
                  </a></li>
                  <h1 className="dropdown-divider">
                  </h1>
                <li><a className="dropdown-item" href="#">Lista de usarios registrados </a></li>
                <li><h1 className="dropdown-divider">
                  </h1>
                </li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Link</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Buscar">
            </input>
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>Usuario
        <div>
          <button type="submit" className="butn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      
      <div className="container">
      <div
          className={`row d-flex justify-content-center align-items-center text-center ${ menuOpen ? "menu-open" : ""}`}
          style={{ height: "90vh" }}
        >
          {showSignUp && <SignUp />}
          {showDash1 && <Dash1 />}
          {!showSignUp && !showDash1 && <p className="muted display-6">Hello User👋</p>}
        </div>
      </div>
    </>
  );
};

export default Home;
