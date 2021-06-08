import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Web3Service } from './services/web3.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Ejemplo Ethereum';
  estado = 'Conectando ...';

  constructor(public web3s: Web3Service){
    console.log(web3s.contrato);
    
  }
  ngAfterViewInit(): void {
    this.subscribeToEvents();
  }
  ngOnInit(): void {
    this.web3s.web3.eth.net.isListening()
      .then(() => this.estado = 'Conectado.')
      .catch(e => this.estado = 'Error en conexion');
  }
  
  subscribeToEvents() {
    // Subscribe to pending transactions
    const self = this;
    this.web3s.contrato.events.ValueChanged({
                                              fromBlock: 0
                                            },
                                            (error: any, event: any) => {
                                              console.log(error);
                                              console.log(event);
                                            });

  }
}
