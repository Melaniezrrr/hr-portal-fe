"use client";
import { User } from "@/app/src/types/user.type";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * @description Page component for adding a new employee in the HR Dashboard.
 * @returns 
 */
export default function AddEmployeePage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const createEmployee = async (userData: User) => {
        console.log("Creating new employee with data:", userData);
        const baseUrl = 'https://my-json-server.typicode.com/Melaniezrrr/hr-portal-fe';
        const url = `${baseUrl}/users`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        console.log("Response received:", response);
        if (!response.ok) {
            setError("Failed to create employee");
            return false;
        }
        return true;
    }

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setError(null);
    }   

    const onSuccess = () => {
        console.log("Employee created successfully!");
        // Reset form fields
        resetForm();
        router.push("/hr-dashboard");
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");

        const userData: User = {
            id: Math.random(), // Temporary ID generation
            firstName,
            lastName,
            email,
            password,
            isActive: true,
            role: "employee",
        };
        
        console.log("New Employee Data:", userData);
        await createEmployee(userData);
        onSuccess();
    }

    return (
        <>
            <h1>Add New Employee</h1>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    formNoValidate
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    formNoValidate
                                />
                            </Field>
                        </FieldGroup>
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
        </>
    );
}

