import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../service/carrinho.service';
import { Carrinho } from '../model/carrinho';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertasService } from '../service/alertas.service';
import { Endereco } from '../model/Endereco';
import { environment } from 'src/environments/environment.prod';
import { EnderecoService } from '../service/endereco.service';
import { User } from '../model/User';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produtos.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  carrinho: Carrinho[] = []

  totalDoCarrinho: number = 0
  
  precoTotal: number = 0
  
  qtdTotal: number = 0
  
  exibirAlerta: boolean =false
  listaEndereco: Endereco[]
  idEndereco: number
  idUser = environment.id
  endereco: Endereco = new Endereco()
  
  idCliente: string = localStorage.getItem('idCliente')
  idClienteNumber = parseInt(this.idCliente);
  usuario: User = new User;
  produto:Produto = new Produto;

  constructor(private carrinhoService: CarrinhoService,
    private alertService: AlertasService,
    private enderecoService: EnderecoService,
    private produtoService: ProdutoService, private route: ActivatedRoute, private router: Router, private usuarioService: AuthService) { }

  

  ngOnInit(): void {
    this.totalCarrinho();
    this.getAllEnderecos()
    this.getAllCarrinho()
    //this.findByIdEndereco();
    window.scroll(0,0)
    let id = this.route.snapshot.params['id']
    this.findById(id)
    this.findUsuarioById(this.idUser)
   
    let token = localStorage.getItem('token');


  }
  getAllCarrinho(){
    this.carrinhoService.getAllCompra().subscribe((resp: Carrinho[]) => {
      this.carrinho = resp
    })
  }
  totalCarrinho() {
    this.carrinho = this.carrinhoService.carrinho
    this.carrinhoService.precoTotal.subscribe(data => this.totalDoCarrinho = data)

    this.carrinhoService.quantidadeTotal.subscribe(data => this.qtdTotal = data)

    this.carrinhoService.calcularTotal()
  }

  adicionarQuantidade(carrinho: Carrinho) {
    this.carrinhoService.adicionarItemCarrinho(carrinho)
  }

  diminuirQuantidade(carrinho: Carrinho) {
    this.carrinhoService.diminuirDoCarrinho(carrinho)
  }

  remover(carrinho: Carrinho) {
    this.carrinhoService.remover(carrinho)
  }

exibirMensagem(){
    this.alertService.showAlertSuccess("Compra realizada com sucesso!")
    location.assign('/checkout')
    
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
  findUsuarioById(idClienteNumber:number) {
    this.usuarioService.getByIdUser(idClienteNumber).subscribe((resp: User) => {
      this.usuario = resp;

    })
  }

  findById(id:number){
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto = resp
    }, err =>{
      console.log(`Erro: ${err.status}, não conseguimos pegar o id`)
    })
  }
}







          
       