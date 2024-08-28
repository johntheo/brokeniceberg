import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About This App</DialogTitle>
          <DialogDescription>
            This app provides random icebreaker questions to spark conversation.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;