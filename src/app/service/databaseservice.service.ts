import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Produtos } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseserviceService {

  readonly API = 'http://localhost:3000/lista/';

  HttpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };

  constructor(private http: HttpClient) { }

  //capturar dados
  getProduto(){
    return this.http.get<Produtos[]>(this.API);
  }

  //metodo para trazer um unicoo item
  getOneItem(id: number){
    return this.http.get(this.API + id);
  }

  postProduto(produto: any){
    return this.http.post(this.API, JSON.stringify(produto), this.HttpOptions).subscribe();
  }

  delProduto(id: number){
    return this.http.delete(this.API + id).subscribe();
  }

  //METODO DE ALTERAÇÃO DO STATUS
  statusItem(products: Produtos){
    return this.http.put(this.API + products.id, JSON.stringify(products), this.HttpOptions).subscribe();
  }

  atualizarItem(produto: Produtos){
    return this.http.put(this.API + produto.id + produto.produto + produto.quantidade,  JSON.stringify(produto), this.HttpOptions).subscribe();
  }
}
