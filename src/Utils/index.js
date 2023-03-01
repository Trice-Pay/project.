
import React, { useEffect, useState } from 'react';
import { Wallet, utils } from 'ethers';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {TRICE_PAY_CONTRACT} from "../configs/tricepaycontract"
//import {abi} from '../../src/common/token.json';
//const provider = ethers.getDefaultProvider('rinkeby');
const provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/v1/20f15278a96284b49a7c487e414de7419515d496');
const maticProvider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/v1/cb75b7548c2e412612d0d7658c884a4b2df438d4');
const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

//const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com')   
export const generateMnemonics = () => {
  const Mnemonic = utils.entropyToMnemonic(utils.randomBytes(16)).split(' ')
  AsyncStorage.setItem('Mnemonic', JSON.stringify(Mnemonic))
}
 

console.log("abi---->",abi);

var walletMnemonic
export async function loadWalletFromMnemonics(mnemonics, walletName, walletPass, walletConfirmPass) {

  if (!(mnemonics instanceof Array) && typeof mnemonics !== 'string')
    throw new Error('invalid mnemonic');
  else if (mnemonics instanceof Array)
    mnemonics = mnemonics.join(' ');

  walletMnemonic = Wallet.fromMnemonic(mnemonics);
  let { address, privateKey } = walletMnemonic

  if (address && walletName) {
    const availableList = await AsyncStorage.getItem('walletInfoList');
    let updatedList = [];

    if (availableList) {
      updatedList = [...JSON.parse(availableList)];
    }
    updatedList.push({ address, walletName, walletPass, walletConfirmPass, privateKey });
    await AsyncStorage.setItem('walletInfoList', JSON.stringify(updatedList))
    let data = [];
    //Store Default Matic and Trice Pay contract
    let tempWallet = [];
        let x= JSON.parse(await AsyncStorage.getItem('Gen_token_user_data'))
        tempWallet = x;
        tempWallet?.map(item => {
            data.push(item);
        });
        const rpcData =JSON.parse( await AsyncStorage.getItem('trice_rpc_data'));
        data.push({network:rpcData.symbol, tokenAddress: 'NA', tokenSymbol:'MATIC',tokenDecimal:TRICE_PAY_CONTRACT.DECIMALS,walletAddress:address});
        data.push({network:rpcData.symbol, tokenAddress: TRICE_PAY_CONTRACT.CONTRACT, tokenSymbol:TRICE_PAY_CONTRACT.SYMBOL,tokenDecimal:TRICE_PAY_CONTRACT.DECIMALS,walletAddress:address});
        await AsyncStorage.setItem('Gen_token_user_data', JSON.stringify(data))
       console.log(data)

  }
  return true;
  // return new Wallet(address);
}


export const getBal = async (address) => {
  let bal
  if (address) {
    console.log("GETBAL----->",address)
    const checkRpcData=JSON.parse( await AsyncStorage.getItem('trice_rpc_data'));
    const provider = new ethers.providers.JsonRpcProvider(checkRpcData.rpcUrl);
   
    await provider.getBalance(address).then((balance) => {
      // convert a currency unit from wei to ether
      bal = ethers.utils.formatEther(balance)
      console.log("BALANCE TOKEN",bal)
    })
  }
  return bal
}


export const otherBalance = async (tokenAddress,contractAddress,decimals) => {
  let balance
  try{
    const checkRpcData=JSON.parse( await AsyncStorage.getItem('trice_rpc_data'));
    const provider = new ethers.providers.JsonRpcProvider(checkRpcData.rpcUrl);
    console.log('SEKE',tokenAddress)
    console.log('DECIMALS',decimals)
    console.log('CONTRACT',contractAddress)
    // const asyncData=async()=>{
    //   const availableList = await AsyncStorage.getItem('walletInfoList');
    //   setwalletdata(JSON.parse(availableList))
    //  }
    const availableList = await AsyncStorage.getItem('walletInfoList');
    
    let key = JSON.parse(availableList)
     let walletInfo= key.filter(item => 
       item.address === tokenAddress
   )
//   const filterWallet= key.filter(function(item){
//     return address==item.add;
//  }).map(function({tokenAddress, tokenSymbol, tokenDecimal}){
//      return {tokenAddress, tokenSymbol, tokenDecimal};
//  });
   console.log('AFTER FINDE',walletInfo)
    const sAddress = await AsyncStorage.getItem('selectedAddress')
    console.log(`WALLET FROM LIST`,sAddress)
     let walletKey = walletInfo[0].privateKey;
    // console.log(key)
     console.log(walletKey)
     const keyWallet = new ethers.Wallet(walletKey, provider)
     let wallet = await keyWallet?.connect(provider)
    //let addresCoin="0x65286eB78388C909153AA2CaC3a5499C007C400d";
    let contract = new ethers.Contract(contractAddress,abi,provider)
   
    // console.log(contract, "Contract m")
     balance =await contract.balanceOf(wallet.address);
   console.log(`balance ${contractAddress} -->`,Number(balance)/10**decimals);
   balance =Number(balance)/10**decimals; //ethers.utils.formatEther(Number(balance)/10**decimals)
   console.log('BALANCE-------->',balance)
  }catch(err){
    console.log(err)
  }
   return balance
}
//Send any ERC20 token
export const tokenTransfer = async (toAddress, amount,tokenAddress) => {
  console.log("toAddress----->",toAddress,amount,tokenAddress);
  try{
    const rpcData =JSON.parse( await AsyncStorage.getItem('trice_rpc_data'));
  const provider=  new ethers.providers.JsonRpcProvider(rpcData.rpcUrl);
    console.log("tokenTerasfer")
    const availableList =JSON.parse( await AsyncStorage.getItem('walletInfoList'));
    console.log("LIST",availableList)
    const sAddress =await  AsyncStorage.getItem('selectedAddress')
    console.log("SELECTED WALLET",sAddress)
    var _wallet=availableList.filter(x=>x.address==sAddress);
    console.log("SEARCHED",_wallet)
   // let key = JSON.parse(availableList)
    let walletKey = _wallet[0].privateKey;
    console.log("Wallet KEY",walletKey)
    let signer = provider.getSigner();
    const keyWallet = new ethers.Wallet(walletKey, provider)
    let wallet = await keyWallet?.connect(provider)
    console.log("DdDDDDDDDDDD",ethers.utils.parseEther(amount))
    let numberOfTokens= ethers.utils.parseUnits(amount, 18)
    let contract = new ethers.Contract(tokenAddress,abi,wallet)
    console.log(contract, "Contract m")
    let gas_limit = 1250000;//"0x013880"
    let maxFeePerGas = ethers.BigNumber.from(90000000000) // fallback to 40 gwei
let maxPriorityFeePerGas = ethers.BigNumber.from(90000000000)
    const options = {
  
     gasLimit:gas_limit,
     maxFeePerGas,
     maxPriorityFeePerGas
     
  
  };
  
  console.log("sendingTrassaction--->")
  
    let tx =await contract.transfer(toAddress,numberOfTokens,options).then((transferResult) => {
      console.log("Transaction REsult",transferResult)
     
    })
  
  console.log("Tx--->",tx);
  //  let receipt = await tx.wait()
  //  console.log(receipt)
   provider.waitForTransaction(tx.hash,1,1000)
  }catch(err){
    console.log("ERRROR",err)
  }

}
export const sendTrans = async (toAddress, amount) => {
  const checkRpcData=JSON.parse( await AsyncStorage.getItem('trice_rpc_data'));
  const provider = new ethers.providers.JsonRpcProvider(checkRpcData.rpcUrl);
  
  // const asyncData=async()=>{
  //   const availableList = await AsyncStorage.getItem('walletInfoList');
  //   setwalletdata(JSON.parse(availableList))
  //  }
  const availableList = await AsyncStorage.getItem('walletInfoList');
  const sAddress = await AsyncStorage.getItem('selectedAddress')
  console.log(`WALLET FROM LIST`,sAddress)
  let key = JSON.parse(availableList)
   let walletInfo= key.filter(item => 
     item.address === sAddress
 )
//   const filterWallet= key.filter(function(item){
//     return address==item.add;
//  }).map(function({tokenAddress, tokenSymbol, tokenDecimal}){
//      return {tokenAddress, tokenSymbol, tokenDecimal};
//  });
 console.log('AFTER FINDE',walletInfo)
  
var walletKey=walletInfo[0].privateKey;
  const keyWallet = new ethers.Wallet(walletKey, provider)


  let wallet = await keyWallet?.connect(provider)
  console.log(amount)
  let fee = Number(amount)*5/100;
  console.log(fee)
  let tx = {
    to: toAddress,
    value: utils.parseEther((amount - fee).toString())
  }
  // let tx2={
  //   to:"0xF87448a9a952dccF6aA15E3f3303FA703cf4d8A8",
  //   value:utils.parseEther(fee.toString())
  // }
  console.log(fee)
  let trans = await wallet?.sendTransaction(tx)
  //let trans2 =  wallet?.sendTransaction(tx2)
  return trans



}

export const getTrans = async (hash) => {
  const response = await provider.getTransactionReceipt(hash)
  console.log(response, 'get Trans ---/')
  const availableList = await AsyncStorage.getItem('get_Trans_List');
  let updatedList = [];

  if (availableList) {
    updatedList = [...JSON.parse(availableList)];
  }
  updatedList.push({ response });
  await AsyncStorage.setItem('get_Trans_List', JSON.stringify(updatedList))
}

export const waitTrans = async (hashid) => {
  let confirms
  const response = await provider.waitForTransaction(hashid, confirms = 1, [100])
  // if (res.transactionHash) {
  //   getTrans(res.transactionHash)
  // }
  return response
}


export function loadWalletFromPrivateKey(pk) {
  try {
    if (pk.indexOf('0x') !== 0) pk = `0x${pk}`;
    return new Wallet(pk, provider);
  } catch (e) {
    throw new Error('invalid private key');
  }
}

export const gasFee = async () => {
  let gasPrice = await provider.getGasPrice()
  // // ...often this gas price is easier to understand or
  // // display to the user in gwei
  let final = utils.formatUnits(gasPrice)
  return final
}

