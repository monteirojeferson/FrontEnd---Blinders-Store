import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/app/model/Endereco';
import { AlertasService } from 'src/app/service/alertas.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-endereco-delete',
  templateUrl: './endereco-delete.component.html',
  styleUrls: ['./endereco-delete.component.css']
})
export class EnderecoDeleteComponent implements OnInit {

  endereco: Endereco = new Endereco()
  idEndereco: number

  constructor(
    private enderecoService: EnderecoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
  
    this.idEndereco = this.route.snapshot.params['id']
    this.findByIdEndereco(this.idEndereco)

  }

  findByIdEndereco(id: number){
    this.enderecoService.getByIdEndereco(id).subscribe((resp: Endereco)=>{
      this.endereco = resp
    })
  }

  apagar(){
    this.enderecoService.deleteEndereco(this.idEndereco).subscribe(()=>{
      this.alertas.showAlertSuccess('Apagado com sucesso!')
      this.router.navigate(['/endereco'])
    })
  }

}
