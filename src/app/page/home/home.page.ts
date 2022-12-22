import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { Produtos } from 'src/app/model/produto.model';
import { DatabaseService } from 'src/app/servico/database.service';
import { UtilityService } from 'src/app/servico/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  image = "https://static.wixstatic.com/media/9ec495_abf8683a19354fe39ac3a1644a68f217~mv2_d_2658_1772_s_2.jpg/v1/fill/w_560,h_372,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Bolo%20Kit%20Kat%20Brigadeiro%20Morango.jpg";

  listaProdutos: Produtos[] = [];

  constructor(
    //Nosso serviço de banco de dados
    private DataBase: DatabaseService,    
    //ActionSheet
    private actionSheet: ActionSheetController,
    //Serviço de utilidades 
    private utilidades: UtilityService,
    private router: Router 
  ) {}

  ngOnInit(){
    //Carrega o metodo no inicio da pagina
    this.utilidades.carregando("Aguarde...", 2000);
    this.DataBase.getItem().subscribe(results => this.listaProdutos = results);
  }   

  //Metodo do botao excluir
  deletar(id: number){

    try{
      this.DataBase.delItem(id);  
    }catch(err){
      console.log(err);
    }finally{
      //Chama a menssagem 
      this.utilidades.toastando("Bolo Excluido", "bottom", 2000, "danger"); 
     
    }  
  } 

  //Metodo do actionsheet
  async actionMetod(item: Produtos){
    const action = this.actionSheet.create({
      mode: 'ios',
      header: 'Selecione um Opção:',
      buttons: [
        {
          text: "Ver receita",
          handler: () => {
            this.router.navigate(['/receita', item.id]);
          },
          
        },
        {
          text: item.status ? 'Desmarcar receita' : 'Marcar receita',
          icon: item.status ? 'radio-button-off' : 'checkmark-circle',

          handler: () => {
            item.status = !item.status;
            this.DataBase.statusItem(item);
          }
        },        
        {
          text: "Cancelar",
          handler: () => {
            this.utilidades.toastando('Bolo cancelado', "middle", 2000, "secondary");
          }
        }
      ]
    }); (await action).present();
  }


  
}
