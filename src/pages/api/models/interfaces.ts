/* Interfaces */
export interface Training {
    id: string;
    fecha: string;
    training_time: string | null;
    calorias: string | null;
}

export interface Exercise {
    id: string;
    trainingng_id: string;
    name: string;
}