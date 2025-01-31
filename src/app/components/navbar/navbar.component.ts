import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth ) { }
  public app_name: string = 'BookStore';
  public isLogged: boolean = false;
  public userName: string='';
  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth=>{
      if(auth){
        console.log('user logged');
        this.isLogged = true;
        this.userName = auth.email;
      } else {
        console.log('NOT user logged')
      }
    })
  }

  onLogOut(){
    this.afsAuth.auth.signOut();
  }

}
