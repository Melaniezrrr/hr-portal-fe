"use client"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type LoginFormProps = React.ComponentProps<"div"> & {
  onSuccess: () => void;
}

export function LoginForm(props: LoginFormProps) {
  const { className, onSuccess } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleValidation = () => {
    // Add validation logic here
    console.log("Validating form");
    if (!email) {
      console.log("Email is required");
      setError("Email is required");
      return false;
    }
    if (!password) {
      console.log("Password is required");
      setError("Password is required");
      return false;
    }

    return true;
  }

  const authenticateUser = async (email: string, password: string) => {
    console.log("Authenticating user with email:", email);
    const baseUrl = 'https://my-json-server.typicode.com/Melaniezrrr/hr-portal-fe';
    const url = `${baseUrl}/users`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Response received:", response);
    if (!response.ok) {
      setError("Failed to authenticate user");
      return false;
    }

    const users = await response.json();
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
    if (!user) {
      setError("Invalid email or password");
      return false;
    }

    console.log("User authenticated successfully:", user);
    setError(null);
    return true;
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError(null);
    console.log("Form reset");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login form submitted", e);
    console.log("Email:", email);
    console.log("Password:", password);
    if (!handleValidation()) {
      return;
    }

    await authenticateUser(email, password);
    onSuccess();
    resetForm();
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log('Email changed to:', e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log('Password changed to:', e.target.value);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  formNoValidate
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" value={password} onChange={handlePasswordChange} formNoValidate />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
            <FieldGroup>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
