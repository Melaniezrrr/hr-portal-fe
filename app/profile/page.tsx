
"use client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { UserForm } from "@/components/user-form";

export default function UserProfile() {
  const onSuccess = () => {
    console.log("User updated successfully!");
    alert("Profile updated successfully!");
  }

  return (
    <>
      <h1>Update Your Profile</h1>
      <Card>
          <CardContent>
              <UserForm onSuccess={onSuccess} />
          </CardContent>
      </Card>
    </>
  );
}

