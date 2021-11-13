import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from 'src/app/model/Endereco';
import { AlertasService } from 'src/app/service/alertas.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-endereco-edit',
  templateUrl: './endereco-edit.component.html',
  styleUrls: ['./endereco-edit.component.css']
})
export class EnderecoEditComponent implements OnInit {

  endereco: Endereco = new Endereco()

  constructor(
    private enderecoService: EnderecoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
    ) { }

    ngOnInit() {
 
      let id = this.route.snapshot.params['id']
      this.findByIdEndereco(id)
    }
  
    findByIdEndereco(id: number){
      this.enderecoService.getByIdEndereco(id).subscribe((resp: Endereco) => {
        this.endereco = resp
      })
    }
  
    atualizar(){
      this.enderecoService.putEndereco(this.endereco).subscribe((resp: Endereco)=>{
        this.endereco = resp
        this.alertas.showAlertSuccess('Atualizado com sucesso!')
        this.router.navigate(['/endereco'])
      })
    }

}
