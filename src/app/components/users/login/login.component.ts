import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { auth} from 'firebase/app'
import { Router} from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string='';
  public password: string='';


  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
   
  ngOnInit() {
  }
  onLogin():void{
    this.authService.loginEmailUser(this.email, this.password)
    .then( (res)=> {
      this.onLoginRedirect();
    }).catch(err=> console.log('err',err.message));
  }
  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then((res)=> {      //aca se usa then y catch porque el metodo devuelve una promesa
      this.onLoginRedirect();
    }).catch(err => console.log('err',err));
  }

  onLoginFacebook(){
    this.authService.loginFacebookUser()
    .then((res)=>{    //aca se usa then y catch porque el metodo devuelve una promesa
      this.onLoginRedirect();  
    }).catch(err => console.log('err',err));
  }

  onLogOut(){
    this.afAuth.auth.signOut();
  }
   onLoginRedirect():void{
    this.router.navigate(['admin/list-books']);
   }
}
