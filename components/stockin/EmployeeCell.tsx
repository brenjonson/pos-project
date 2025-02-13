import { User } from "lucide-react";

export default function EmployeeCell({ id, fname ,lname}) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <p className="font-medium">ชื่อ {fname} {lname}</p>
          <p className="text-sm text-gray-500">รหัส {id}</p>
        </div>
      </div>
    );
  }