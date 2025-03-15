"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
import { FC } from "react";

interface PlansModalProps {
    isOpen: boolean;
    onClose?: (value: boolean) => void;
    children?: React.ReactNode;
}
const PlansModal: FC<PlansModalProps> = ({ isOpen, onClose, children }) => {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent page className={cn("h-full min-w-full px-4 pt-20 lg:p-20 mx-auto text-center overscroll-y-auto overflow-scroll")}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default PlansModal;
