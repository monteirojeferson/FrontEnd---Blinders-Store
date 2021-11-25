
import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { ProdutoService } from '../service/produtos.service';
import { Produto } from '../model/Produto';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../service/carrinho.service';
import { Carrinho } from '../model/Carrinho';
// import { Console } from 'console';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  
  
  idCliente: string = localStorage.getItem('idCliente')
  idClienteNumber = parseInt(this.idCliente);
  usuario: User = new User;
  produto:Produto = new Produto;

  postagem: Produto = new Produto()
  produtoSelecionado: Produto = new Produto()
  listaProdutos: Produto[]

  listaProdutosResetada: Produto[]

  //produto: Produto = new Produto;
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  idProduto: number
  nomeTema: string

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse = true
  nome = environment.nome
  // modal:any;

  

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService,
    private _activeRoute: ActivatedRoute,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    // if(environment.token == ''){
    //   this.router.navigate(['/entrar'])
    // }
 // toda mudança de url cai nesse método
 this._activeRoute.queryParams.subscribe(params=>
  {
    console.log('Mudou a rota');
    let parametroCategoria = null;
    if(params.idCategoria)
    {
      parametroCategoria = parseInt(params.idCategoria);
    }
    //se não tiver o id na url ele busca por categoria
    // if(parametroCategoria)
    // {
    //   this.buscaProdutosPeloCategoriaId(parametroCategoria);
    // }
    //se não tiver 
    else
    {
      this.findAllProdutos();
    }
    
  });
    this.getAllTemas();
    this.getAllProdutos();
    // this.findAllProdutos();
    
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  findByIdProduto(){
    this.produtoService.getByIdProduto(this.idProduto).subscribe((resp: Produto) =>{
      this.postagem = resp
    })
  }

  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }
  findAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp;
      
    })
  }
  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.postagem.idProduto = this.idProduto

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.produtoService.postProduto(this.postagem).subscribe((resp: Produto) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Produto realizada com sucesso!')
      this.postagem = new Produto()
      this.getAllProdutos()
    })
  }

  findByTituloProduto(){
    if(this.tituloPost == ''){
      this.getAllProdutos()
    } else {
      this.produtoService.getByNomeProduto(this.tituloPost).subscribe((resp: Produto[]) => {
        this.listaProdutos = resp
      })
    }
  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.getAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

  selecionarProduto(item:any){
    
    this.produtoSelecionado = item;
    
  }

  //Adicionar item no carrinho
  adicionarAoCarrinho(produto: Produto) {
    
    const carrinho = new Carrinho(produto)
    this.carrinhoService.adicionarItemCarrinho(carrinho)
    this.alertas.showAlertInfo("Item adicionado ao carrinho")
  }
  listarTodos()
  {
    this.router.navigate(['/produtos']);
  }

}