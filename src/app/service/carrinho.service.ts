import { Injectable } from '@angular/core';
import { Carrinho } from '../model/Carrinho';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

carrinho: Carrinho[] = []

precoTotal: Subject<number> = new Subject<number>();

quantidadeTotal: Subject<number> = new Subject<number>();

todosProdutos: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }


  // getCompra(itemCarrinho: Carrinho){
  //   this.adicionarItemCarrinho(itemCarrinho);
  // }
  getAllCompra(): Observable<Carrinho[]>{
    return this.http.get<Carrinho[]>('http://localhost:8080/carrinho')
  }
  adicionarItemCarrinho(itemCarrinho: Carrinho) {
    let ContemNoCarrinho: boolean = false;
    let carrinhoCriado: Carrinho = undefined;
    

    if (this.carrinho.length > 0) {

      for (let i of this.carrinho) {
        if (i.idProduto === itemCarrinho.idProduto) {
          carrinhoCriado = i;
          break;
        }
      }
      ContemNoCarrinho = (carrinhoCriado != undefined);
    }

    if (ContemNoCarrinho) {
       carrinhoCriado.quantidade++;
        
    }
    else {
      this.carrinho.push(itemCarrinho);
    }
    this.calcularTotal();
  }


  calcularTotal() {

    let valorTotalCarrinho: number = 0;
    let quantidadeTotalCarrinho: number = 0;
    let produtos: string = '';

    for (let item of this.carrinho) {
      valorTotalCarrinho += item.quantidade * item.preco;
      quantidadeTotalCarrinho += item.quantidade;
      produtos +=item.nomeProduto;
    }

    this.precoTotal.next(valorTotalCarrinho);
    this.quantidadeTotal.next(quantidadeTotalCarrinho);
    this.todosProdutos.next(produtos);

    this.detalheCarrinho(valorTotalCarrinho, quantidadeTotalCarrinho,produtos);
  }


  detalheCarrinho(valorTotalCarrinho: number, quantidadeTotalCarrinho: number, produtos:string) {

    console.log('Contém no carrinho');

    for (let i of this.carrinho) {
      const subPrecoTotal = i.quantidade * i.preco;
      let listaProd = i.nomeProduto;

      console.log(`nome: ${listaProd}, quantidade=${i.quantidade}, preço=${i.preco}, total=${subPrecoTotal}`);
    }

    console.log(`PrecoTotal: ${valorTotalCarrinho.toFixed(2)}, QuantidadeTotal: ${quantidadeTotalCarrinho}`);
    console.log('----');
  }

  diminuirDoCarrinho(carrinho: Carrinho) {

    carrinho.quantidade--;

    if (carrinho.quantidade === 0) {
      this.remover(carrinho);
    }
    else {
      this.calcularTotal();
    }
  }

  remover(carrinho: Carrinho) {

    const itemIndex = this.carrinho.findIndex(i => i.idProduto === carrinho.idProduto);

    if (itemIndex > -1) {
      this.carrinho.splice(itemIndex, 1);

      this.calcularTotal();
    }
  }

}
