"use client"
import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import { login } from '@/app/auth/action'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { LoginState } from '@/types/LoginState'

const initialState: LoginState = {
  error: null,
  fieldErrors: undefined
}


const SubmitButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' className='w-full mt-6' disabled={pending}>
      {pending ? "Giriş yapılıyor" : "Giriş yap"}
    </Button>
  )
}

export default function LoginForm(){
     const [state, formAction] = useActionState(login, initialState)
    return(
          <form action={formAction}>
                        <div className='flex flex-col gap-6'>
                          <div className='grid gap-2'>
                            <Label htmlFor='email'>E-posta</Label>
                            <Input
                              id='email'
                              type='email'
                              name='email'
                              placeholder='ornek@example.com'
                              required
                            />
                            {state.fieldErrors?.email && (
                              <p className='text-sm text-red-500'>{state.fieldErrors.email.join(", ")}</p>
                            )}
                          </div>
                          <div className='grid gap-2'>
                            <Label htmlFor='password'>Şifre</Label>
                            <Input
                              id='password'
                              type='password'
                              name='password'
                              required
                            />
                            {state.fieldErrors?.password && (
                              <p className='text-sm text-red-500'>{state.fieldErrors.password.join(", ")}</p>
                            )}
                          </div>
                        </div>
                        {state.error && (
                          <p className='text-red-500 text-sm mt-4'>{state.error}</p>
                        )}
                        <SubmitButton />
       </form>
    )
}