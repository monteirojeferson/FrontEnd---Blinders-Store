import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>('http://localhost:8080/produtos', this.token)
  }

  getByIdProduto(id: number): Observable<Produto>{
    return this.http.get<Produto>(`http://localhost:8080/produtos/${id}`, this.token)
  }

  getByNomeProduto(nome: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`http://localhost:8080/produtos/nome/${nome}`, this.token)
  }

  postProduto(postagem: Produto) : Observable<Produto>{
    return this.http.post<Produto>('http://localhost:8080/produtos', postagem, this.token)
  }

  putProduto(postagem: Produto): Observable<Produto>{
    return this.http.put<Produto>('http://localhost:8080/produtos', postagem, this.token)
  }

  deleteProduto(id: number){
    return this.http.delete(`http://localhost:8080/produtos/${id}`, this.token)
  }

}