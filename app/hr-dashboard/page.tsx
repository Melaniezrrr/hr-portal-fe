"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { EmployeeCard } from "@/components/employee-card";
    
export default function HRDashboard() {
  const [employees, setEmployees] = useState([]);
    const router = useRouter();

    const handleAddEmployee = () => {
        console.log("Add Employee button clicked");
        router.push("/hr-dashboard/add-employee");
    }

    const fetchEmployees = async () => {
        const baseUrl = 'https://my-json-server.typicode.com/Melaniezrrr/hr-portal-fe';
        const url = `${baseUrl}/users`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Failed to fetch employees");
            return [];
        }
        const data = await response.json();
        console.log("Fetched employees:", data);
        return data;
    }

    useEffect( () => {
      fetchEmployees().then(data => setEmployees(data));
    }, [])

  return (
    <>
      <h1>HR Dashboard</h1>
      <div className="mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Onboard New Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleAddEmployee}>Add Employee</Button>
          </CardContent>
        </Card>
      </div>
      <h2 className="mb-4">Employees</h2>
      <div>
        {employees.map((employee: any) => (
          <EmployeeCard key={employee.id} user={employee} />
        ))}
      </div>
    </>
  );
}

