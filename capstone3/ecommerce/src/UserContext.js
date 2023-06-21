import React from 'react';
import {useState} from 'react';

//Create a Context Object
//A context Object as the name states is adata that can be used to store information that can be shared to other component/s within the app.

//The context object is a different approach to passing information between components and allows easir access by avoiding the use of prop passing.


//With the help of createContext() method we were able to create a context stored in variable UserContext.
const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
	    id: null,
	    isAdmin: null
  			});
  const [quant, setQuant] = useState(0);
  const [or,setOr] = useState();
  

  const unsetUser = () => {
    localStorage.clear();
  };

  const contextValue = {
    user,
    setUser,
    unsetUser,
    quant,
    setQuant,
    or,
    setOr
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
export default UserContext;
