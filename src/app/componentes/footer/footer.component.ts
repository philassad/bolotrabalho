import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/servico/database.service';
import { UtilityService } from 'src/app/servico/utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
     //Nosso serviço de banco de dados
     private DataBase: DatabaseService,
     //alertController - Ferramente que cria um alert
     private alertCtrl: AlertController,
      //Serviço de utilidades 
    private utilidades: UtilityService   
  ) { }

  ngOnInit() {}


  //Método do alertando 
  async alertando(){
    const alert = this.alertCtrl.create({
      mode:'ios',
      header: 'Cadastro de Bolos',
      inputs:[
        {
          name: 'produto',
          type: 'text',
          placeholder: 'Informe o Bolo'
        },
        {
          name: 'ingredientes',
          type: 'text',
          placeholder: 'Informe o Ingredientes'
        },
        {
          name: 'preparo',
          type: 'text',
          placeholder: 'Informe o Modo de Preparo'
        },
        {
          name:'quantidade',
          type: 'text',
          placeholder: 'Informe a Quantas pessoas servem'
        },
        {
          name: 'imagem',
          type: 'text',
          placeholder: 'Imagem do bolo'
        }
      ],
      buttons: [

        //Botão de cancelar
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.utilidades.toastando('Cancelado!', "middle",2000 ,"secondary" );
          }
        },

        //Botão de cadastrar
        {
          text: 'Cadastrar',
          handler: (form) => {
            //Objeto que irá forma nosso item da lista
            let item = {
              produto: form.produto,
              ingredientes: form.ingredientes,
              preparo: form.preparo, 
              quantidade: form.quantidade, 
              imagem: form.imagem,
              

              //Vai ser a variavel de controle do ngIf
              status: false     
            };
            try{
              this.DataBase.postItem(item);
            }catch(err){
              console.log(err)
            }finally{
              this.utilidades.toastando("Item Cadastrado", "top", 2000,"success");                           
            } 
          }
        }
      ]
    });

    (await alert).present();
  }

}
