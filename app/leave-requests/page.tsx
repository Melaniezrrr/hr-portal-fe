"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LeaveRequest } from "../src/types/leaveRequest.type";

export default function LeaveRequests() {
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState<string>(Date.now().toString());
  const [endDate, setEndDate] = useState<string>(Date.now().toString());
  const [error, setError] = useState<string | null>(null);

  const createLeaveRequest = async (leaveRequest: LeaveRequest) => {
    const baseUrl = 'https://my-json-server.typicode.com/Melaniezrrr/hr-portal-fe';
    const url = `${baseUrl}/leave-requests`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveRequest),
    });
    console.log("Response received:", response);
    if (!response.ok) {
        setError("Failed to create leave request");
        return false;
    }
    return true;
  }

  const resetForm = () => {
    setReason("");
    setStartDate(Date.now().toString());
    setEndDate(Date.now().toString());
    setError(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("Leave request submitted");

    const leaveRequest: LeaveRequest = {
      id: Math.random(), // Temporary ID generation
      userId: 1, // Placeholder user ID
      startDate,
      endDate,
      reason,
      status: 'pending',
    }

    const result = await createLeaveRequest(leaveRequest);
    if (!result || error) return;
    console.log("Leave Request Data:", leaveRequest);
    alert("Leave request submitted successfully!");
    resetForm();
  }

  return (
    <>
      <h1>Leave Requests</h1>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="reason">Reason for Leave</FieldLabel>
            <Input
              id="reason"
              type="text"
              placeholder="Medical, Vacation, etc."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              formNoValidate
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              formNoValidate
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="endDate">End Date</FieldLabel>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              formNoValidate
            />
          </Field>
          <Field>
            <Button type="submit">Submit</Button>
          </Field>
          <Field>
            <Button type="submit">Login</Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  )
}
