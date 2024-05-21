import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./home.css";
import dash1 from "./vitasdash/dash1";
import dash2 from "./vitasdash/dash2";
import dash3 from "./vitasdash/dash3";

type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({ history }) => {
  const logout = () => {
    localStorage.clear();
    history.push("/login");


  };

  const dash1 = () => {
    localStorage.clear();
    history.push("vitasdash/dash1");
  };
  const dash2 = () => {
    localStorage.clear();
    history.push("vitasdash/dash1");
  };
  const dash3 = () => {
    localStorage.clear();
    history.push("vitasdash/dash1");
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
        
      
              <button className="btn btn-primary " type="button" data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                  <img src="iconos\list_menu.png" className="img-fluid-rounded float-start" 
                  alt="no se encontro la imgen"/>Menu
              </button>

        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasScrolling" 
                 aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header">
             <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                   Menu desplegable
             </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
              <ul className="list-group list-group-flush-list-group-item-table-dark" >

                    <p>
                      <a className="btn btn-primary dropdown-toggle" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Link with href 
                     </a>
                    </p>
                    <div className="collapse" id="collapseExample">
                      <div className="#">
                        <li className="list-group-item"><button className="butt" onClick={dash2}>
                          dash2
                        </button></li>
                        <li className="list-group-item"><button className="butt" onClick={dash3}>
                          dash3
                        </button></li>
                      </div>
                    </div>
              </ul> 
                   <ul className="list-group list-group-flush-list-group-item-table-dark" >

                    <p>
                      <a className="btn btn-primary dropdown-toggle" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Link with href
                      </a>
                    </p>
                    <div className="collapse" id="collapseExample2">
                      <div className="#">
                        <li className="list-group-item"><button className="butt" onClick={dash2}>
                          dash2
                        </button></li>
                        <li className="list-group-item"><button className="butt" onClick={dash3}>
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

        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Enlace</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Link
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><a className="dropdown-item" href="#">Acción</a></li>
                    <li><a className="dropdown-item" href="#">Otra acción</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Algo más aquí</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Enlace</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
                <button className="btn btn-outline-success text-body" type="submit">Buscar</button>
              </form>
            </div>
          </div>
        </nav>
        <div>
          <button type="submit" className="butn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center text-center"
          style={{ height: "90vh" }}
        >
          <p className="muted display-6">Hello User👋</p>
        </div>
      </div>
      <div className="fixed-bottom">
      <table className="table table-dark table-hover border-info">
  <thead>
  <th scope="row">3</th>
      <td  className="table-active">Larry the Bird</td>
      <td>@twitter</td>
  </thead>
  <tbody>
    <tr className="table-active">
    <th scope="row">3</th>
      <td  className="table-active">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
    <tr>
    <th scope="row">3</th>
      <td  className="table-active">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td  className="table-active">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
      </div>
    </>
  );
};

export default Home;
