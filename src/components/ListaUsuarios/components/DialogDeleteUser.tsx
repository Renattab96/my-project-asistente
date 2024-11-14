import { Button } from "@components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";

interface DialogDeleteUserProps {
    open: boolean;
    onClose: () => void; // Función para cerrar el diálogo
    deleteUser: () => void;
}

export const DialogDeleteUser = ({ open, onClose, deleteUser }: DialogDeleteUserProps) => {

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Eliminar Usuario</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que deseas eliminar este usuario de forma permanente?"
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex gap-4 justify-end">
                        <Button
                            className="bg-blue-500 hover:bg-blue-700 text-slate-100"
                            type="button"
                            onClick={onClose}
                        >
                            CERRAR
                        </Button>
                        <Button
                            className="bg-red-500 hover:bg-red-700 text-slate-100"
                            type="button"
                            onClick={deleteUser}
                        >
                            ELIMINAR
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
