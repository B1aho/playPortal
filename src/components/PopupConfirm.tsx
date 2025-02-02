import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface PopupConfirmProps {
    title: string;
    desc: string;
    onConfirm: () => void;
}

export function PopupConfirm({ title, desc, onConfirm }: PopupConfirmProps) {
    const handleConfirm = () => {
        onConfirm();
    }
    return (
        <Dialog modal={true} defaultOpen={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {desc}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onPointerUp={handleConfirm} variant="destructive">Delete account!</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}