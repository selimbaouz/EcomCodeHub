import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
  
type ConfirmModalProps = {
  isOpen: boolean;
  onClose?: (value: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

const ConfirmModal = ({ isOpen, onClose, title, children, description }: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent page className={cn("min-h-auto md:h-auto max-w-sm p-6 rounded-2xl lg:max-w-lg")}>
        <DialogHeader className='text-left z-10 space-y-6'>
          <DialogTitle className={cn("text-lg font-semibold flex items-center gap-2")}>
            {title}
          </DialogTitle>
          <DialogDescription className='pb-4 break-words whitespace-pre-line text-center'>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;