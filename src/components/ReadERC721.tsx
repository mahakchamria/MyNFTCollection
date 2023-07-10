import React, {useEffect, useState} from 'react'
import {Text} from '@chakra-ui/react'
import {ERC721ABI as abi} from 'abi/erc721abi'
import {ethers} from 'ethers'

interface Props{
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function ReadERC721(props: Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [balance, SetBalance] =useState<number|undefined>(undefined)

    useEffect( () => {
        if(!window.ethereum) return
    
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const erc721 = new ethers.Contract(addressContract, abi, provider);

      },[])
    
    useEffect(()=>{
        if(!window.ethereum) return
        if(!currentAccount) return
    
        queryTokenBalance(window)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const erc721 = new ethers.Contract(addressContract, abi, provider)

        // listen for changes on an Ethereum address
        console.log(`listening for Transfer...`)

        const fromMe = erc721.filters.Transfer(currentAccount, null)
        erc721.on(fromMe, (from, to, amount, event) => {
            console.log('Transfer|sent',  {from, to, amount, event} )
            queryTokenBalance(window)
        })

        const toMe = erc721.filters.Transfer(null, currentAccount)
        erc721.on(toMe, (from, to, amount, event) => {
            console.log('Transfer|received',  {from, to, amount, event} )
            queryTokenBalance(window)
        })

        return () => {
            erc721.removeAllListeners(toMe)
            erc721.removeAllListeners(fromMe)
        }    
    },[currentAccount])

    async function queryTokenBalance(window:any){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const erc721 = new ethers.Contract(addressContract, abi, provider);
    
        erc721.balanceOf(currentAccount)
        .then((result:string)=>{
            SetBalance(Number(result))
        })
        .catch('error', console.error)
    }

    return (
        <div>
            <Text><b>ERC721 Contract</b>: {addressContract}</Text>
            <Text my={4}><b>Minted NFTs in current account</b>: {balance} </Text>
        </div>
        
    )
}