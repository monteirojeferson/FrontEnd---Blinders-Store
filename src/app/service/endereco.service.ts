import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Endereco } from '../model/Endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllEndereco(): Observable<Endereco[]>{
    return this.http.get<Endereco[]>('http://localhost:8080/endereco', this.token)
  }

  getByIdEndereco(id: number): Observable<Endereco>{
    return this.http.get<Endereco>(`http://localhost:8080/endereco/${id}`, this.token)
  }

  getByNomeEndereco(nome: string): Observable<Endereco[]>{
    return this.http.get<Endereco[]>(`http://localhost:8080/endereco/nome/${nome}`, this.token)
  }

  postEndereco(Endereco: Endereco): Observable<Endereco>{
    return this.http.post<Endereco>('http://localhost:8080/endereco', Endereco, this.token)
  }

  putEndereco(Endereco: Endereco): Observable<Endereco>{
    return this.http.put<Endereco>('http://localhost:8080/endereco', Endereco, this.token)
  }

  deleteEndereco(id: number) {
    return this.http.delete(`http://localhost:8080/endereco/${id}`)
  }
  consultaCEP(cep: string) {

    console.log(cep);

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
      }
    }

    return of({});
  }
}
