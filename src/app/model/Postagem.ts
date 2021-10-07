import { Tema } from './Tema';
import { User } from './User';

export class Postagem{
  public id: number
  public nome: string
  public  ativo:string;
	
	public  alterar:string;
	
	public preco: number;
  public qtd: number;
	public  vizualizar:string;
  public imagem: string;
  // public titulo: string
  // public texto: string
  public data: Date
  public usuario: User
  public tema: Tema
}