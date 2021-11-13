import { Produto } from './Produto';
import { User } from './User';

export class Endereco{
  public id: number
  public endereco : string;
  public bairro : string;
  public cidade : string;
  public estado : string;
  public cep : string;
  public numero : number;
	
  public produto: Produto[]
  public user: User[]
}