import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/app/model/Endereco';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string
  listaUsuarios: User [];
  endereco: Endereco = new Endereco()
  listaEndereco: Endereco[]
  idEndereco: number

  key = 'data'
  reverse = true
  
  constructor(
    public enderecoSerivce: EnderecoService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService,
    
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
    this.getAllUsuarios()
    this.getAllEnderecos()
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('A senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/inicio'])
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }


  getAllUsuarios(){
    this.authService.getAllUsuarios().subscribe((resp: User[]) => {
      this.listaUsuarios = resp
    })
  }
  getAllEnderecos(){
    this.enderecoSerivce.getAllEndereco().subscribe((resp: Endereco[]) => {
      this.listaEndereco = resp
    })
  }

  findByIdEndereco(){
    this.enderecoSerivce.getByIdEndereco(this.idEndereco).subscribe((resp: Endereco) =>{
      this.endereco = resp
    })
  }
}
