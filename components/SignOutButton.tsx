"use client"
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'


const SignOutButton = () => {
    const router = useRouter()
    
  const handleSignOut = async() =>{
    const supabase =  createClient()
    try {
        const { error }= await supabase.auth.signOut()

        if (error) {
            console.error("error: signing out",error)

        }else{
            router.refresh()
            router.replace("/")

        }
    } catch (error) {
        console.error(error)
    }
  }

  return (

    <Button variant="destructive" onClick={handleSignOut}>
        Çıkış yap
    </Button>
  )
}

export default SignOutButton