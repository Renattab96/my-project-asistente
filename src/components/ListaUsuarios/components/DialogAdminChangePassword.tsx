import { Button } from "@components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import { Input } from "@components/ui/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { changeAdmminPassword } from "../services/changeAdminPassword.services";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

// Esquema de validación con zod
const passwordSchema = z.object({
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
    newPassword: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres." }),
}).refine((data) => data.password === data.newPassword, {
    message: "Las contraseñas deben ser iguales",
    path: ["newPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface DialogAdmingChangePasswordProps {
    open: boolean;
    onClose: () => void; // Función para cerrar el diálogo
}

export const DialogAdmingChangePassword = ({ open, onClose }: DialogAdmingChangePasswordProps) => {

    const id = useSelector((state: RootState) => state.userAuth.id)

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = async (data: PasswordFormValues) => {
        try {
            await changeAdmminPassword(data.password, id ?? "");
            toast.success('Se ha actualizado la contraseña!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            onClose(); // Cierra el diálogo después de enviar el formulario
        }
        catch {
            toast.error('Error al actualizar la contraseña!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    };

    useEffect(() => {
        form.reset({
            password: "",
            newPassword: ""
        })
    }, [open])

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Cambio de Contraseña</DialogTitle>
                    <DialogDescription>
                        Cambia tu contraseña, dando click al botón CONFIRMAR una vez completes los campos.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Contraseña" {...field} maxLength={30} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirmar Contraseña" {...field} maxLength={30} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                className="bg-blue-500 hover:bg-blue-700 text-slate-100"
                                type="submit"
                            >
                                CONFIRMAR
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
