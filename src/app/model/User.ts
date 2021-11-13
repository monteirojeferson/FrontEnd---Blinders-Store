import { Endereco } from './Endereco';
import { Produto } from './Produto';

export class User{
  public id: number
  public nome: string
  public usuario: string
  public senha: string
  public foto: string
  public tipo: string
  public cpf: string;
  public email : string;
	// public endereco : string;
  // public bairro : string;
  // public cidade : string;
  // public estado : string;
  // public cep : string;
  // public numero : number;
  public endereco: Endereco
  public produto: Produto[]
}