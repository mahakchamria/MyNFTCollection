import React, { useEffect,useState } from 'react';
import { Text, Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {ERC721ABI as abi} from 'abi/erc721abi'
import { Contract } from "ethers"
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function ReadERC721(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const [contractError, setContractError] = useState('');

  async function Mint(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const erc721:Contract = new ethers.Contract(addressContract, abi, signer)
    const mintingPrice = ethers.utils.parseEther('1');
    const bal = await provider.getBalance(signer.getAddress());
    if(bal<mintingPrice){
      throw new Error('Insufficient ETH balance');
    }
    erc721.mint({value: mintingPrice})
      .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`)
        tr.wait().then((receipt:TransactionReceipt)=>{console.log("transfer receipt",receipt)})
      })
      .catch((e:Error)=>console.log(e));
  }

  return (
    <form onSubmit={Mint}>
    <FormControl>
      {/* <Button type="submit" isDisabled={currentAccount !== '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}>Mint</Button>  */}
      <Button type="submit" isDisabled={!currentAccount}>Mint</Button>
      {contractError && <p>Error: {contractError}</p>}
    </FormControl>
    </form>
  )
}