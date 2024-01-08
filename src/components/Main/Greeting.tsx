import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
};

const Greeting = ({name, mark}:GreetingsProps) =>{

  return <h1>hello {name} {mark}</h1>

}

Greeting.defaultProps = {
  mark: '!'
};

 export default Greeting;