import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { map} from 'rxjs/operators';
import { auth } from 'firebase/app';
import { stringify } from 'querystring';
import { promise } from 'protractor';

import {AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {UserInterface} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {     // en esta clase tengo todo lo relacionado con los usuarios

  user: UserInterface={roles:null
  };

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string , pass: string){
    return new Promise ((resolve,reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user)
      }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass:string ){
    return new Promise((resolve,reject)=>{
      this.afsAuth.auth.signInWithEmailAndPassword(email,pass).then(userData => resolve(userData),
      err => reject(err));
    });
  }
  
  loginFacebookUser(){
    return this.afsAuth.auth.signInWithPopup ( new auth.FacebookAuthProvider())
    .then(credential => this.updateUserData(credential.user))
  }

  loginGoogleUser(){
   return this.afsAuth.auth.signInWithPopup ( new auth.GoogleAuthProvider()) // esto va a abrir una ventana de logueo de google
   .then(credential => this.updateUserData(credential.user))
  }

  logOutUser(){ 
    return this.afsAuth.auth.signOut();
  }
  isAuth(){
    return this.afsAuth.authState.pipe(map(auth=>auth));
  }

   updateUserData(user){
    const userRef :AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface ={
      id: user.uid,
      email: user.email,
      roles:{
        admin: true
      },
      photoUrl:user.photoUrl
    }
    return userRef.set(data, {merge:true})
  }

  isUserAdmin(userUid){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
}
