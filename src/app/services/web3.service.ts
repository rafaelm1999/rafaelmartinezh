import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { bindNodeCallback, Observable } from 'rxjs';
import { AbiItem } from 'web3-utils';
import { Buffer } from 'buffer';
import Web3 from 'web3';

@Injectable({providedIn: 'root'})
export class Web3Service {
    public web3: Web3;
    public abi: any;
    public contractAddress: string;
    public sender: string;

    public contrato: any;

    constructor() {
        this.web3 = new Web3();

        this.web3.setProvider(
            new Web3.providers.WebsocketProvider('https://ropsten.infura.io/v3/c0c8c037208043debd3192efe93ed1d2:8546')
        );

        this.sender = '0xf65112fa0998477c990fb71722b067b7892f2160';
        this.web3.eth.defaultAccount = this.sender;
        // tslint:disable-next-line:max-line-length
        this.abi = JSON.parse('[{"constant":false,"inputs":[],"name":"increment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldValue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"ValueChanged","type":"event"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
        this.contractAddress = '0x99E5a41b66702D9d54428d48FE9C8dEE2DDc6CbC';

        this.contrato = new this.web3.eth.Contract(this.abi, this.contractAddress);
    }
}
