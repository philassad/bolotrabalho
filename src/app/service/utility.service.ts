import { Injectable } from '@angular/core';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { Produtos } from '../model/produto.model';
import { DatabaseserviceService } from './databaseservice.service';



@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  result!: string;
  actionsheet: any;

  listaProdutos: Produtos[] = [];

  constructor(
    //Ferramenta do carregando
    private banco: DatabaseserviceService,

    private loading: LoadingController,

    private toast: ToastController,
    
   
  ) { }

    //Método do loading
    async carrengando(message: string, duration: number){
      const load = this.loading.create({
        mode: 'ios',
        message ,
        duration
      });

      (await load).present();
    }

    async toastando(header: string, position: "top" | "middle" | "bottom", color: string, duration: number){
      const toastei = this.toast.create({
        header,
        position,
        duration,
        color
    });
      (await toastei).present();
      location.reload();
    }

      
      }


