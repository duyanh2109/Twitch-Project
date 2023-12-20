import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import React from "react";

const Actions = async () => {

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
     <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary" asChild>
      <Link className="h-5 w-5 mr-2" href="/">Exit</Link>
     </Button>
     <UserButton afterSignOutUrl="/"/>
    </div>
  );
};

export default Actions;
