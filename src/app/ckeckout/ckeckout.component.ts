import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produtos.service';

@Component({
  selector: 'app-ckeckout',
  templateUrl: './ckeckout.component.html',
  styleUrls: ['./ckeckout.component.css']
})
export class CkeckoutComponent implements OnInit {

  listaProdutos: Produto[];
  produto: Produto = new Produto;
  id:number;

  constructor(private ProdutoService : ProdutoService, private router: Router) { }

  ngOnInit(): void {
    
    this.findallProdutos()
    window.scroll(0,0)
  }

  findallProdutos(){
    this.ProdutoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }

  findByIdProduto(id: number){
    this.ProdutoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;
    }, err => {alert("Opa, parece que não conseguimos encontrar esse item"), console.log(err)})
  }


}