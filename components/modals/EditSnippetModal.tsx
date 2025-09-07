import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';

type EditSnippetModal = {
  isOpen: boolean;
  onClose?: (value: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const EditSnippetModal = ({ isOpen, onClose, title, children, description }: EditSnippetModal) => {
    return (
         <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent page className={cn("max-h-screen lg:max-h-[80vh] md:h-auto size-full p-6 lg:rounded-2xl lg:max-w-xl overflow-y-auto")}>
                <DialogHeader className='text-left z-10 space-y-6'>
                <DialogTitle className={cn("text-lg font-semibold flex items-center gap-2")}>
                    {title}
                </DialogTitle>
                <DialogDescription className='pb-4 break-words whitespace-pre-line text-left'>
                    {description}
                </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default EditSnippetModal;