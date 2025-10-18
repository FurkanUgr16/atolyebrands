"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const Home = () => {
  const [count, setCount] = useState(0)
  const increment = () =>{
    setCount(count + 1)
  }

  const decrement = () =>{
    setCount(count - 1)
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center text-center text-4xl '>
      <div>
        {count}
      </div>

      <div>
      <Button
      className='mr-4'
        onClick={increment}
      >Increment</Button>

      <Button
      variant="secondary"
      className='ml-4'
        onClick={decrement}
      >Decrement</Button>
      </div>
    </div>
  )
}

export default Home