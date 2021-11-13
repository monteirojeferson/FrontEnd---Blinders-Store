import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AlertasComponent } from './alertas/alertas.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';
import { HomeComponent } from './home/home.component';
import { TemaComponent } from './tema/tema.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import {  ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import {  ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatAccordion} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { EnderecoComponent } from './endereco/endereco.component';
import { EnderecoEditComponent } from './edit/endereco-edit/endereco-edit.component';
import { EnderecoDeleteComponent } from './delete/endereco-delete/endereco-delete.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import {MatIconModule} from '@angular/material/icon';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    EntrarComponent,
    CadastrarComponent,
    AlertasComponent,
    HomeComponent,
    TemaComponent,
    TemaEditComponent,
    TemaDeleteComponent,
    ProdutoDeleteComponent,
    ProdutoEditComponent,
    UserEditComponent,
    ProdutosComponent,
    EnderecoComponent,
    EnderecoEditComponent,
    EnderecoDeleteComponent,
    CarrinhoComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    OrderModule,
    BrowserAnimationsModule,
   // MatAccordion,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule
    
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
