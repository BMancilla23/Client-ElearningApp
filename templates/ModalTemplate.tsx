import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ModalTemplateProps {
  title: string;
  description?: string;
  className?: string;
  positionText?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalTemplate({
  title,
  description,
  className,
  children,
  isOpen,
  onClose,
}: ModalTemplateProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={`text-xl md:text-2xl  ${className}`}>
            {title}
          </DialogTitle>
          <DialogDescription className={`${className}`}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
