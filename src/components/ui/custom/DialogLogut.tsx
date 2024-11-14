import { Button } from "@components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import { useLogout } from "src/hooks/useLogout";

interface DialogLogoutProps {
    open: boolean;
    onClose: () => void; // Función para cerrar el diálogo
}

export const DialogLogout = ({ open, onClose }: DialogLogoutProps) => {
    const { handleLogout } = useLogout();

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Cerrar Sesión</DialogTitle>
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
                            onClick={handleLogout}
                        >
                            SALIR
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
