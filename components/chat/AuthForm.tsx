'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
interface Props {
  hidden: boolean
}
export default function AuthForm({ hidden }: Props) {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <Card className={`w-[350px] ${hidden ? "hidden" : ""}`}>
      <CardHeader>
        <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
        <CardDescription>
          {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="mode"
              name="mode"
              checked={!isLogin}
              onCheckedChange={() => setIsLogin(!isLogin)}
            />
            <Label htmlFor="mode">
              {isLogin ? 'Need an account?' : 'Already have an account?'}
            </Label>
          </div>
          <input type="hidden" name="mode" value={isLogin ? 'login' : 'signup'} />
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Button type="submit" className="w-full">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          {/*state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-green-500">{state.success}</p>
          )*/}
        </CardFooter>
      </form>
    </Card>
  )
}

