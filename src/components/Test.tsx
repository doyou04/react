import React from 'react';
import '../style/Test.scss';



const Test = () => {

    const onCreate = () => {
        const user = {
            id: nextId.current,
            username,
            email
        }
        setUsers(users.concat(user));
    
        setInputs({
            usernmae:'',
            email:''
        })
    
        nextId.current += 1;
    }
    

  return (
    <div className="main">
    </div>
  );
}

export default Test;
