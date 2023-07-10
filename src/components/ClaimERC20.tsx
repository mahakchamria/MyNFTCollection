import React, { use, useEffect,useState } from 'react';
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
  const[reward, setReward] = useState<number>(0)
  const[error, setError] = useState<string>('');

  async function ClaimRewards(event:React.FormEvent) {
    event.preventDefault()
    if(!window.ethereum) return    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const erc721:Contract = new ethers.Contract(addressContract, abi, signer)

    erc721.claimReward(tokenId)
    .then((result: ethers.BigNumber)=>{
      const claimQty = result.toNumber();
        setReward(claimQty);
    })
    .catch((err: Error) => console.log(err));
  }

  const handleChange = (value:string) => setTokenId(value)

  return (
    <form onSubmit={ClaimRewards}>
    <FormControl>
        <FormLabel htmlFor='tokenId'>TokenId: </FormLabel>
        <NumberInput placeholder='tokenID' defaultValue={tokenId} min={0} max={100} onChange={handleChange}>
        <NumberInputField />
        </NumberInput>
        <br></br>
        <Button type="submit" isDisabled ={!currentAccount}>Claim</Button>
        
        {reward !== 0 ?(
          <Text my = {4}>{reward} MT tokens claimed successfully</Text> 
        ): error!== ''? (
          <Text></Text>
        ) : null
        }
    </FormControl>
    </form>
  )
}