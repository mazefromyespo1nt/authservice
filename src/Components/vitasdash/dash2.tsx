import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";


type SomeComponentProps = RouteComponentProps
const dash2 : FC<SomeComponentProps> = ({history}) =>{

    const logout = () => {
        localStorage.clear();
        history.push("/login");
};

return(

<div><p>hola </p>
<div>
          <button type="submit" className="butn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>




);

};
export default dash2;