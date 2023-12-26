"use client";
import { createIngress } from "@/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";

import { AlertTriangle } from "lucide-react";
import React, { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);
type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal = () => {
  const CloseRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [IngressTypes, SetIngressTypes] = useState<IngressType>(RTMP);
  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(IngressTypes))
        .then(() => {
          toast.success("Ingress created successfully");
          CloseRef?.current?.click();
        })
        .catch(() => {
          toast.error("Somthing went wrong");
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generete connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={IngressTypes}
          onValueChange={(value) => SetIngressTypes(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will will reset all active streams using the current
            connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose  ref={CloseRef} asChild>
            <Button variant="ghost">cancel</Button>
          </DialogClose>
          <Button variant="primary" onClick={onSubmit} disabled={isPending}>
            generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModal;
