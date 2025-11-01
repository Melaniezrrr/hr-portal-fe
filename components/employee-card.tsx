import { User } from "@/app/src/types/user.type";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type EmployeeCardProps = {
    user: User;
}
export const EmployeeCard = (props: EmployeeCardProps) => {
    const { user } = props;
    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>{user.firstName} {user.lastName}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </CardContent>
        </Card>
    )
}