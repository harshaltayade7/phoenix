import React from 'react';
import api from './api/index';

const handleIncludeMovie = async () => {
    // await api.showUsers().then(res => {
    //   console.log("users are ...")
    // })
  // console.log("window.location.href",window.location.href)
  
  if(window.location.href.length >=24) {
    const username = window.location.href.split('?')[1].split("=")[1].split("&")[0]
    await api.createUser(username).then(res => {
      console.log("inserted")
    })
  }

//   if(window.location.href >=24) {
//     const username = window.location.href.split('?')[1].split("=")[1].split("&")[0]
//     await api.loginUser(username).then(res => {
//     console.log("login successfully");
//   })
// }
}

function App() {
  return (
    <div className="App">
      <form action="/createUser" method="GET">
      <input type="text" placeholder="name" name="name"/>
      <input type="text" placeholder="quote" name="quote"/>
      <button type="submit" onClick={handleIncludeMovie()}>Submit</button>
    </form>
    </div>
  );
}

export default App;
