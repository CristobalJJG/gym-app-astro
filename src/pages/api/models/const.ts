import { neon } from "@neondatabase/serverless";

/* Formateo de la BBDD */
export const tableNames = {
    ENTRENAMIENTO: 'entrenamiento',
    EJERCICIO: 'entrenamiento',
    SERIE: 'entrenamiento',
}

export const entrenamiento = {
    id: "training_id",
    fecha: "fecha",
    duracion: "duracion",
    calorias: "calorias"
}

export const ejercicio = {
    id: "ejercicio_id",
    entrenamineto_id: "training_id",
    nombre: "nombre",
}

export const serie = {
    id: "serie_id",
    ejercicio_id: "ejercicio_id",
    peso: "peso",
    repeticiones: "repeticiones",
}

/* Variable general para acceder a la BBDD */
export const sql = neon(import.meta.env.DATABASE_URL);
