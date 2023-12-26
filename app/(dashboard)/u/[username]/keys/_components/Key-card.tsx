"use client";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import CopyButton from "./CopyButton";
import { Button } from "@/components/ui/button";

interface KeyCardProps {
  value: string | null;
}
const KeyCard = ({ value }: KeyCardProps) => {
  const [onShow, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input value={value || ""} disabled placeholder="Stream Key" type={onShow?"text":"password"}/>
            <CopyButton value={value || ""} />
            <Button
              onClick={() => {
                setShow(!onShow);
              }}
              size="sm"
              variant="link"
            >
              {onShow ? "Hide" : "Show"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
