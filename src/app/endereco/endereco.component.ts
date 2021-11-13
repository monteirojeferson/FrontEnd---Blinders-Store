import { Component, OnInit } from '@angular/core';
import { Form, NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CEPError } from '@brunoc/ngx-viacep';
import { environment } from 'src/environments/environment.prod';
import { Endereco } from '../model/Endereco';
import { AlertasService } from '../service/alertas.service';
import { EnderecoService } from '../service/endereco.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  endereco: Endereco = new Endereco()
  listaEndereco: Endereco[]

  constructor(private router: Router,
    private enderecoService: EnderecoService,
    private alertas: AlertasService
   ) { }

  ngOnInit(): void {
  
    this.findAllEndereco()
  }

  findAllEndereco(){
    this.enderecoService.getAllEndereco().subscribe((resp: Endereco[]) => {
      this.listaEndereco = resp
    })
  }

  cadastrar(){
     this.enderecoService.postEndereco(this.endereco).subscribe((resp: Endereco)=>{
       this.endereco = resp
       this.alertas.showAlertSuccess('Endereço cadastrado com sucesso!')
       this.findAllEndereco()
       this.endereco = new Endereco()
     })
  }

  ConsultaCep(valor:any, form:Form){
    this.enderecoService.consultaCEP(valor).subscribe((dados)=>{
      this.populaForm(dados,form)
    })
  
  }
  populaForm(dados:any, form:Form){
        form.updateModel.bind({
      cep: dados.cep,
      cidade:dados.cidade,
      bairro:dados.bairro
    })
  }

}
