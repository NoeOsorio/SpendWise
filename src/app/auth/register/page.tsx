"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const currencies = [
  { label: "Peso Mexicano", value: "MXN" },
  { label: "Dólar Estadounidense", value: "USD" },
  { label: "Euro", value: "EUR" },
]

export default function RegisterPage() {
  const { signUp, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    username: "",
    currency: "MXN",
    language: "es",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    monthly_budget: null as number | null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signUp(formData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            FinanzApp
          </h1>
          <p className="text-sm text-muted-foreground">
            La mejor manera de gestionar tus finanzas
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Crear una cuenta</CardTitle>
            <CardDescription>
              Ingresa tus datos para registrarte
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="usuario123"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full_name">Nombre completo</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="Juan Pérez"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly_budget">Presupuesto mensual (opcional)</Label>
                <Input
                  id="monthly_budget"
                  name="monthly_budget"
                  type="number"
                  placeholder="5000"
                  value={formData.monthly_budget || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    monthly_budget: e.target.value ? Number(e.target.value) : null
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Moneda principal</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className="w-full" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  'Registrarse'
                )}
              </Button>
              {isLoading && (
                <p className="text-sm text-muted-foreground text-center">
                  Esto puede tomar unos segundos...
                </p>
              )}
              <p className="text-sm text-muted-foreground text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link 
                  href="/auth/login" 
                  className="text-primary hover:underline"
                  tabIndex={isLoading ? -1 : 0}
                >
                  Inicia sesión
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Al continuar, aceptas nuestros{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            términos y condiciones
          </Link>{" "}
          y{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            política de privacidad
          </Link>
          .
        </p>
      </div>
    </div>
  )
} 