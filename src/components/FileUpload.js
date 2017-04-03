import React, { Component } from 'react';
import firebase from 'firebase';

export default class FileUpload extends Component{

    constructor()
    {
        super();

        this.state = {
            uploadValue : 0,
            picture: null
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event){
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed', snapshot => {
            //tasa de subida del archivo
            let percentage = (snapshot.bytesTransferred /  snapshot.totalBytes) * 100;
            
            this.setState({
            uploadValue: percentage
            })
        }, 
        error => {
            console.log(error.message)
        }, 
        () => { //subida con exito
            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL
            })
        })
   }

    render(){
        return(
            <div>
                <progress value={this.state.uploadValue} max='100'></progress>
                <br />
                <input type='file' onChange={this.props.fileUpload} />
                <br/>
                <img width="320" src={this.handleUpload} alt="" />
            </div>
        )
    }
}