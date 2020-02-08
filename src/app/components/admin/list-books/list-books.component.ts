import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BookInterface } from '../../../models/book';
import { NgForm } from '@angular/forms';
import { DataApiService } from '../../../services/data-api.service';
import {UserInterface } from '../../../models/user';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService ,private AuthService: AuthService) { }

  private books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.AuthService.isAuth().subscribe(auth =>{
      if(auth){
        this.userUid = auth.uid;
        this.AuthService.isUserAdmin(this.userUid).subscribe(userRole =>{
          this.isAdmin = Object.assign({},userRole.roles).hasOwnProperty('admin');
          
          
          // otra forma de hacerlo en 2 lineas es no ponerlo arriba y poner abajo : this.isAdmin.hasOwnProperty('admin');
        })
      }
    })
  }

  getListBooks(){
    this.dataApi.getAllBooks().subscribe(books => {
      this.books = books                                   // REVISAR
    });
  }

  onDeleteBook(idBook: string){
    const confirmacion = confirm('Are you sure?');
    if(confirmacion){
      this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface){
    console.log('BOOK',book);
    this.dataApi.selectedBook = Object.assign({},book);
  }

}
