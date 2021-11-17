import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../service/carrinho.service';
import { Carrinho } from '../model/carrinho';
import { Scroll } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertasService } from '../service/alertas.service';
import { Endereco } from '../model/Endereco';
import { environment } from 'src/environments/environment.prod';
import { EnderecoService } from '../service/endereco.service';


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
  

  constructor(private carrinhoService: CarrinhoService,
              private alertService: AlertasService,
              private enderecoService: EnderecoService) { }

  

  ngOnInit(): void {
    this.totalCarrinho();
    this.getAllEnderecos()
    //this.findByIdEndereco();
    window.scroll(0,0)

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
    location.assign('/home')
    
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
