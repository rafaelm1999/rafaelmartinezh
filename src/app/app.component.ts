import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Web3Service } from './services/web3.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  cantidad = '';
  direccion = '';
  title = 'FUTCO';
  estado = 'No Conectado.';
  count = 0;
  resultado = '';
  blockHash = '';
  blockNumber = '';
  to = '';
  transactionHash = '';

  elementos: any = [];
  cabeceras = ['Enviado a','Unidades','Transaction Hash', 'Block Number'];

  constructor(public web3s: Web3Service){
  }

  ngAfterViewInit(): void {
    this.web3s.connectAccount().then((r)=>{ 
                                    this.estado = "Conectado.";
                                    this.subscribeToEvents();
                                  });
  }

  balanceOf(): void {
    this.web3s.contrato.methods.balanceOf(this.web3s.accounts[0]).call().then((response: any) => {
                                this.count = response;
                                                       });
  }

  transfer(): void {
    this.web3s.contrato.methods.transfer(this.direccion,this.cantidad).send({from: this.web3s.accounts[0]})
                                           .then((response:any) => {
                                              this.resultado = "Envío completado";
                                              this.blockHash = response.blockHash;
                                              this.blockNumber = response.blockNumber;
                                              this.transactionHash = response.transactionHash;
                                           })
                                           .catch((error: any) => {
                                              console.log(error);
                                              this.resultado = "Error";
                                           });
  }

  subscribeToEvents() {
    // Subscribe to pending transactions
    const self = this;
    this.web3s.contrato.events.Transfer({
                                              fromBlock: 0
                                            },
                                            (error: any, event: any) => {
                                              if (!error){                                                        
                                                this.elementos.push(
                                                  { blockHash: event.blockHash,
                                                    blockNumber:event.blockNumber,
                                                    transactionHash: event.transactionHash,                                 
                                                    to: event.returnValues.to,
                                                    cant: event.returnValues.tokens
                                                  }
                                                );                                                
                                              }                                              
                                            });

  }
}
