import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Endereco } from '../model/Endereco';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { EnderecoService } from '../service/endereco.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string
  
  listaEndereco: Endereco[]
  idEndereco: number
  idUser = environment.id
  endereco: Endereco = new Endereco()
  
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService,
    private enderecoService: EnderecoService,
    ) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.getAllEnderecos()
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.endereco.id = this.idEndereco
    this.user.id = this.idUser
    this.user.endereco = this.endereco
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('A senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      })
    }

  }
  getAllEnderecos(){
    this.enderecoService.getAllEndereco().subscribe((resp: Endereco[]) => {
      this.listaEndereco = resp
    })
  }

  findByIdEndereco(){
    this.enderecoService.getByIdEndereco(this.idEndereco).subscribe((resp: Endereco) =>{
      this.endereco = resp
    })
  }

}
