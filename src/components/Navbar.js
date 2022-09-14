import React from 'react'
import {Box,Button,Flex,Image,Link,Spacer,Heading,ButtonGroup} from  '@chakra-ui/react'
import Facebook from '../assets/social-media-icons/facebook_32x32.png'
import Twitter from '../assets/social-media-icons/twitter_32x32.png'
import Email from '../assets/social-media-icons/email_32x32.png'
const NavBar = ({accounts,setAccounts}) =>{

    return (
        <nav>
                <div>Facebook</div>
                <div>Twitter</div>
                <div>Email</div>
                <div>About Mint</div>
                <div>Team</div>
                
        </nav>
    )
}

export default NavBar