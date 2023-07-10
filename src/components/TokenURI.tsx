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

export default function ReadERC721(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  const [tokenId, setTokenId] = useState<string>('')
  const[tokenURI, setTokenURI] = useState<string>('')

  async function ViewtokenURI(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const erc721:Contract = new ethers.Contract(addressContract, abi, signer)

    erc721.tokenURI(tokenId)
    .then((result:string)=>{
        setTokenURI(result)
    })
    .catch('error', console.error)
  }

  const handleChange = (value:string) => setTokenId(value)

  return (
    <form onSubmit={ViewtokenURI}>
    <FormControl>
        <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
        <NumberInput placeholder='tokenID' defaultValue={tokenId} min={0} max={100} onChange={handleChange}>
        <NumberInputField />
        </NumberInput>
        <br></br>
        <Button type="submit" isDisabled ={!currentAccount}>View</Button>
        {/* <Text my = {4}>{tokenURI}</Text> */}
        <img src={`data:image/svg+xml;base64,${tokenURI}`} />
    </FormControl>
    </form>
  )
}