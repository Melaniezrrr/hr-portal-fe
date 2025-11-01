"use client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { UserForm } from "@/components/user-form";
import { useRouter } from "next/navigation";

/**
 * @description Page component for adding a new employee in the HR Dashboard.
 * @returns 
 */
export default function AddEmployeePage() {
    const router = useRouter();
    const redirectToDashboard = () => {
        router.push("/hr-dashboard");
    }

    const onSuccess = () => {
        console.log("Employee created successfully!");
        redirectToDashboard();
    }

    return (
        <>
            <h1>Add New Employee</h1>
            <Card>
                <CardContent>
                    <UserForm onSuccess={onSuccess} />
                </CardContent>
            </Card>
        </>
    );
}

