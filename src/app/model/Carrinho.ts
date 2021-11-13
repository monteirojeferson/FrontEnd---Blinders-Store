import { Produto } from './Produto';

export class Carrinho {

    public idProduto: number;
    public nomeProduto: string;
    public descricao: string;
    public preco: number;
    public quantidade: number;
    public imagem: string;


constructor(produto: Produto){
    this.idProduto = produto.id
    this.nomeProduto = produto.nome
    this.descricao = produto.descricao
    this.preco = produto.preco
    this.quantidade = produto.qtd
    this.imagem = produto.imagem
}
}


