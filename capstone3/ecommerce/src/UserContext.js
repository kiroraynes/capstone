import React from 'react';

// // Create a Context object
// // A context object as the name states is a data that can be used to store information that can be shared to other components within the app.

// The Context object is a different approach to passing information between components and allows easier access by avoiding the use of prop passing.

// With the help of createContext() method we are able to create a context stored in variable UserContext.

const UserContext = React.createContext();

// The provider component allows other components to consume/use the context object and supply necessary information needed to the context object.
export const UserProvider = UserContext.Provider;
export default UserContext;