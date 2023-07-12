import React, { useEffect,useState } from 'react';
import { Text, Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers} from 'ethers'
import {ERC721ABI as abi} from 'abi/erc721abi'
import { Contract } from "ethers"

interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function Withdraw(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount

  async function Withdraw(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const erc721:Contract = new ethers.Contract(addressContract, abi, signer)

    erc721.withdrawBalance()
    .then((result:string)=>{
    })
    .catch('error', console.error)
  }

  return (
    <form onSubmit={Withdraw}>
    <FormControl>
        <br></br>
        <Button type="submit" isDisabled ={currentAccount !== '0x09D23b6726c940d53864C5F11b12e12813e26b45'}>Withdraw</Button>
    </FormControl>
    </form>
  )
}