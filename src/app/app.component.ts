import { Component, OnInit } from '@angular/core';
import { Web3Service } from './services/web3.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ejemplo Ethereum';
  estado = 'Conectando ...';
  
  constructor(public web3s: Web3Service){
    console.log(web3s.contrato);
    
  }
  ngOnInit(): void {
    this.web3s.web3.eth.net.isListening()
      .then(() => this.estado = 'Conectado.')
      .catch(e => this.estado = 'Error en conexion');
  }
}
