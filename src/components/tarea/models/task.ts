export interface Task {
    _id: string;
    accion: string;
    fechainicio: Date;
    fechavencimiento: Date;
    status: string;
    claseTarea: string;
    hora: string;
    descripcion: string;
}