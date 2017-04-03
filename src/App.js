import React, { Component } from 'react';
import FileUpload from './components/FileUpload';
import logo from './logo.svg';
import firebase from 'firebase';
import './App.css';

class App extends Component {


constructor()
{
   super();

   this.state = {
     user: null
   }
    //hacer un bindeo de las funciones para que entiendan a que
    //contexto pertenecen
   this.handleAuth = this.handleAuth.bind(this);
   this.handleLogout = this.handleLogout.bind(this);
   this.renderLoginButton = this.renderLoginButton.bind(this);
}

componentWillMount(){
   firebase.auth().onAuthStateChanged(user => {
     this.setState({ user });     
   })
 }


 handleAuth(){
   const provider = new firebase.auth.GoogleAuthProvider();

   firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado session`))
    .catch(error => console.log(`error ${error.code}: ${error.message}`));

 }

 handleLogout(){
   firebase.auth().signOut()
   .then(result => console.log(`${result.user.email} ha cerrado session`))
   .catch(error => console.log(`error ${error.code}: ${error.message}`));
 }

 renderLoginButton(){

    if(this.state.user){
      return(<div>
              <img src={this.state.user.photoURL} 
               alt={this.state.user.displayName} 
               style={{width:"64px",
                       height:"64px",
                       borderRadius:"50%",
                       marginTop:"10px"
                     }}
              />
              <p>Hola {this.state.user.displayName}</p>
               <button onClick={this.handleLogout}>
                cerrar sesión 
               </button>             
              </div>
            );
    }
    else{
       return( 
              <div>
                <button onClick={this.handleAuth}>
                 Login con google 
               </button>             
              </div> 
             );
    }
 }

 
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>PseudoGram</h2>
        </div>
       {this.renderLoginButton()}
       <FileUpload />
      </div>
    );
  }
}

export default App;
