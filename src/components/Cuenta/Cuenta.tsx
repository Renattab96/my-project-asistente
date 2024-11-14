import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Button } from "@components/ui/Button";
import userIcon from "../../assets/img/user-icon.png";
import { User } from "./models/user";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { getUserInfo } from "./services/getUserInfo.services";
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"

import { Input } from "@components/ui/Input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Switch } from "@components/ui/Switch";
import { updateUserInfo } from "./services/updateUserInfo.services";
import { UpdateUSer } from "./models/updateUser";
import { getPhoto } from "./services/getPhoto.services";
import { updatePhoto } from "./services/updatePhoto.services";
import { Loader2 } from "lucide-react"
import { deletePhoto } from "./services/deletePhoto";
import { DialogChangePassword } from "@components/Cuenta/DialogChangePassword";
import NavbarAdmin from "@components/NavbarAdmin/NavbarAdmin";

const formSchema = z.object({
  cargo: z.string()
    .optional()
    .refine((val) => val === undefined || val.length >= 3, {
      message: "El cargo debe tener al menos 3 caracteres.",
    }),
  direccion: z.string()
    .optional()
    .refine((val) => val === undefined || val.length >= 4, {
      message: "La dirección debe tener al menos 4 caracteres.",
    }),
  email: z.string()
    .optional()
    .refine((val) => val === undefined || /^\S+@\S+\.\S+$/.test(val), {
      message: "Debe ser un correo electrónico válido.",
    }),
  telefono: z.string()
    .optional()
    .refine((val) => val === undefined || (/^\d{8,}$/.test(val)), {
      message: "El teléfono debe tener al menos 8 caracteres y solo números.",
    }),
  notificacion: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Cuenta = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [textButtonChangeImage, setTextButtonChangeImage] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [btnDeleteLoading, setBtnDeleteLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const id = useSelector((state: RootState) => state.userAuth.id);
  const role = useSelector((state: RootState) => state.auth.role);
  const fetchDataUserInfo = async () => {
    if (!id) {
      toast.error('Error al cargar los datos del usuario!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      try {
        const response = await getUserInfo(id);
        setUser(response);
        resetForm(response);
      }
      catch {
        toast.error('Error al cargar los datos del usuario!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }
  const fetchPhoto = async () => {
    if (!id) {
      toast.error('Error al cargar la imagen de usuario!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      setBtnLoading(true);
      try {
        const responsePhoto = await getPhoto(id);
        setProfilePicture(responsePhoto === "" ? null : responsePhoto);
        setTextButtonChangeImage(responsePhoto === "" ? false : true);
      }
      catch {
        toast.error('Error al cargar la imagen de usuario!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      finally {
        setBtnLoading(false);
      }
    }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo: "",
      direccion: "",
      email: "",
      telefono: "",
      notificacion: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    const params: UpdateUSer = {
      email: data.email ?? undefined,
      jobTitle: data.cargo ?? undefined,
      address: data.direccion ?? undefined,
      phoneNumber: data.telefono ?? undefined,
      notificationsEnabled: data.notificacion ?? undefined
    }
    const response = await updateUserInfo(
      params
    )
    setUser(response);
    resetForm(response);
  }

  const { isDirty } = useFormState({ control: form.control }); // Detecta cambios
  const [isChanged, setIsChanged] = useState(false);
  const initialValues = form.getValues();

  const resetForm = (response: User) => {
    form.reset({
      cargo: response.additionalInfo?.jobTitle || "",
      direccion: response.additionalInfo?.address || "",
      email: response.email || "",
      telefono: response.additionalInfo?.phoneNumber || "",
      notificacion: response.notificationsEnabled || false,
    });
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result as string); // Guarda la imagen en base64 en el estado independiente
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error al cargar la imagen", error);
        toast.error("Error al cargar la imagen, inténtalo de nuevo.");
      }
    }
  };

  const openFileSelector = () => {
    const fileInput = document.getElementById("upload-image") as HTMLInputElement;
    fileInput.click();
  };

  const handleDeletePhoto = async () => {
    if (!id) {
      toast.error('Error al eliminar la foto de perfil!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      try {
        setBtnDeleteLoading(true);
        const responsePhoto = await deletePhoto(id);
        setProfilePicture(responsePhoto === "" ? null : responsePhoto);
        setTextButtonChangeImage(false);
        toast.success('Se ha eliminado correctamente la foto de perfil!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      catch {
        toast.error('Error al eliminar la foto de perfil!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      finally {
        setBtnDeleteLoading(false);
      }
    }
  }

  const funtionUpdatePhoto = async (profilePicture: string) => {
    if (user) {
      await updatePhoto(user._id, profilePicture)
      toast.success('Se ha actualizado correctamente la foto de perfil!', {
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

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetchDataUserInfo();
    fetchPhoto();
  }, []);

  useEffect(() => {
    const subscription = form.watch((currentValues) => {
      const hasChanges = Object.keys(currentValues).some(
        (key) => currentValues[key as keyof FormValues] !== initialValues[key as keyof FormValues]
      );
      setIsChanged(hasChanges);
    });
    return () => subscription.unsubscribe();
  }, [form, initialValues]);

  useEffect(() => {
    if (profilePicture) setInitialLoad(true)
  }, [profilePicture]);

  useEffect(() => {
    if (profilePicture && initialLoad) {
      try {
        setBtnLoading(true)
        funtionUpdatePhoto(profilePicture)
        setTextButtonChangeImage(true)
      }
      finally {
        setBtnLoading(false)
      }
    }
  }, [profilePicture])

  return (
    <>
     {role === "admin" ?
     <NavbarAdmin />
     :
     <Navbar />}
      <div className="container mx-auto my-10 p-5">
        <h1 className="text-3xl font-bold mb-6 border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">
          Datos de la Cuenta
        </h1>
        <div className="flex -mx-2">
          <div className="w-1/2 px-2">
            <div className="flex flex-col items-center justify-center mx-5 lg:mx-10">
              <h2 className="text-2xl font-semibold mb-4">Hola, {user ? user.username : 'Cargando...'}</h2>
              <div className="bg-white shadow-md rounded-lg p-6 w-full">
                <div className="flex items-center justify-center mb-6">

                  {btnLoading ?
                    <Loader2 className="animate-spin" />
                    : <img
                      className="w-96 rounded-full h-96"
                      src={profilePicture ? profilePicture : userIcon}
                      alt="Avatar"
                    />}
                </div>
                <div className="mb-4 text-left">
                  <h3 className="text-xl font-bold">Datos Personales</h3>
                  <p>
                    <strong>Nombre:</strong> {user ? user.username : 'Cargando...'}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {user ? user.lastname : 'Cargando...'}
                  </p>
                 {(user && user.additionalInfo?.phoneNumber) ? <p>
                    <strong>Nro. Teléfono:</strong> {(user && user.additionalInfo?.phoneNumber) ? user.additionalInfo.phoneNumber  : 'Cargando...'}
                  </p> : null}
                  <p>
                    <strong>Correo Electrónico:</strong> {user ? user.email : 'Cargando...'}
                  </p>
                 {(user && user.additionalInfo?.jobTitle) ? <p>
                    <strong>Cargo:</strong> {(user && user.additionalInfo?.jobTitle) ? user.additionalInfo.jobTitle : 'Cargando...'}
                  </p> : null}
                 {(user && user.additionalInfo?.address) ? <p>
                    <strong>Dirección:</strong> {(user && user.additionalInfo?.address) ? user.additionalInfo.address : 'Cargando...'}
                  </p> : null
                  }
                </div>
                <div className="flex gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="upload-image"
                    onChange={handleImageChange}
                  />
                  <Button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4 w-28"
                    onClick={openFileSelector}
                  >
                    {
                      btnLoading ?
                        <Loader2 className="animate-spin" />
                        :
                        textButtonChangeImage ? "Editar Foto" : profilePicture ? "Guardar Foto" : "Cargar Foto"
                    }
                  </Button>
                  {textButtonChangeImage && profilePicture &&
                    <Button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mt-4 w-28"
                      onClick={handleDeletePhoto}
                    >
                      {
                        btnDeleteLoading ?
                          <Loader2 className="animate-spin" />
                          :
                          "Eliminar Foto"
                      }
                    </Button>
                  }
                </div>

              </div>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white shadow-md rounded-lg p-6 w-full">
                <h3 className="text-xl font-bold mb-4">Datos Adicionales</h3>
                <FormField
                  control={form.control}
                  name="cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input className="rounded-xl" placeholder="Cargo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input className="rounded-xl" placeholder="Dirección" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input className="rounded-xl" placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nro de Teléfono</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl"
                          placeholder="Nro de Teléfono"
                          {...field}
                          inputMode="numeric"        // Sugiere teclado numérico en dispositivos móviles
                          pattern="[0-9]*"           // Acepta solo caracteres numéricos
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/\D/g, ''); // Filtra solo números
                            field.onChange(numericValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notificacion"
                  render={({ field }) => (
                    <FormItem className="flex items-center ">
                      <FormLabel className="mr-2 mt-2">Notificación</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value} // Asigna el valor inicial
                          onCheckedChange={field.onChange} // Usa onCheckedChange en lugar de onChange
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  disabled={!isChanged || !isDirty}
                  type="submit"
                  className="w-full bg-orange-500 text-white rounded hover:bg-orange-700"
                >
                  Guardar
                </Button>
                <Button
                  type="button"
                  className="w-full bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={onOpen}
                >
                  Cambiar Contraseña
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <DialogChangePassword open={open} onClose={onClose}/>
    </>
  );
};

export default Cuenta;


