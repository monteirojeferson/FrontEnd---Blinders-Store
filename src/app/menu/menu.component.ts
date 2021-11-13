import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  

 //nome = environment.nome
  foto = environment.foto
  id = environment.id

 // faShoppingCart = faShoppingCart
  mostrarLogin: boolean=false;
  mostrarCarrinho: boolean = false;
  nome: any = localStorage.getItem('nome')

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(){
  }

  
  sair(){
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }

  exibirCarrinho(){
    this.mostrarCarrinho = true;
  }

}