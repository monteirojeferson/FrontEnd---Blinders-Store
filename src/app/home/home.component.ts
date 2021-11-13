// import { AlertasService } from './../service/alertas.service';
// import { AuthService } from './../service/auth.service';
// import { User } from './../model/User';
// import { Tema } from './../model/Tema';
// import { TemaService } from './../service/tema.service';
// import { PostagemService } from '../service/produtos.service';
// import { Postagem } from '../model/Produto';
// import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor() { }

  ngOnInit() {
    window.scroll(0,0)

  }
}