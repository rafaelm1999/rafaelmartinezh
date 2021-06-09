import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Web3Service } from './services/web3.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Ejemplo Ethereum';
  estado = 'No Conectado.';
  count = 0;
  resultado = '';

  blockHash = '';
  blockNumber = '';
  from = '';
  transactionHash = '';

  elementos: any = [];
  cabeceras = ['Transaction Hash', 'Block Number','Valor'];

  constructor(public web3s: Web3Service){
  }

  ngAfterViewInit(): void {
    this.web3s.connectAccount().then((r)=>{ 
                                    this.estado = "Conectado.";
                                    this.subscribeToEvents();
                                  });
  }

  getCount(): void {
    this.web3s.contrato.methods.getCount().call().then((response: any) => {
                                this.count = response;
                                                       });
  }

  increment(): void {
    this.web3s.contrato.methods.increment().send({from: this.web3s.accounts[0]})
                                           .then((response:any) => {
                                              this.resultado = "Transacción realizada!";
                                              
                                              this.blockHash = response.blockHash;
                                              this.blockNumber = response.blockNumber;
                                              this.from = response.from;
                                              this.transactionHash = response.transactionHash;
                                           })
                                           .catch((error: any) => {
                                              console.log(error);
                                              this.resultado = "Error en la transacción!";
                                           });
  }

  subscribeToEvents() {
    // Subscribe to pending transactions
    const self = this;
    this.web3s.contrato.events.ValueChanged({
                                              fromBlock: 0
                                            },
                                            (error: any, event: any) => {
                                              if (!error){                                                        
                                                this.elementos.push(
                                                  { blockHash: event.blockHash,
                                                    transactionHash: event.transactionHash,
                                                    blockNumber:event.blockNumber,                                             
                                                    valor: event.returnValues.newValue
                                                  }
                                                );                                                
                                              }                                              
                                            });

  }
}
