
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from './ui/card'
import LoginForm from './LoginForm'


const Login = () => {
  return (
    <div className='flex items-center min-h-screen justify-center p-4'>
      <Card className='text-center w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Giriş yap</CardTitle>
          <CardDescription>Devam etmek için e-posta ve şifreniz ile giriş yapın</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default Login