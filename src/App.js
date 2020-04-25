import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormPage from './component/Signup'
import Main from './component/Main';
import {BrowserRouter} from 'react-router-dom';
class App extends React.Component{

  render (){
    return (
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
    )
}
}

export default App;
