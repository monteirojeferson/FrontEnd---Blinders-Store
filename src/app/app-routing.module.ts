import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { EnderecoDeleteComponent } from './delete/endereco-delete/endereco-delete.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';

import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { EnderecoEditComponent } from './edit/endereco-edit/endereco-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { EntrarComponent } from './entrar/entrar.component';
import { HomeComponent } from './home/home.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { TemaComponent } from './tema/tema.component';


const routes: Routes = [
  {path: '', redirectTo: 'produtos', pathMatch: 'full'},
  {path:'entrar',component: EntrarComponent},
  {path:'cadastrar',component: CadastrarComponent},
  {path:'home',component: HomeComponent},
  {path:'tema', component:TemaComponent},

  {path:'tema-edit/:id', component:TemaEditComponent},
  {path:'tema-delete/:id', component:TemaDeleteComponent},

  {path:'produto-edit/:id', component:ProdutoEditComponent},
  {path:'produto-delete/:id', component:ProdutoDeleteComponent},

  {path:'user-edit/:id', component:UserEditComponent},
  {path:'produtos', component:ProdutosComponent},
  {path:'endereco', component:EnderecoComponent},
  {path:'endereco-edit/:id', component:EnderecoEditComponent},
  {path:'endereco-delete/:id', component:EnderecoDeleteComponent},
  {path:'carrinho', component:CarrinhoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
