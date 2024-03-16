import { ejercicio, tableNames, sql } from "./models/const";
import type { Exercise } from "./models/interfaces";
import type { APIRoute } from "astro";
import { badRequest, okRequest } from "./models/answers";

export const POST: APIRoute = async ({ request }) => {
    let training = {} as Exercise;
    let body
    try {
        /* Obtencion de datos */
        body = (await request.formData())
        training.id = body.get("id") as string;

        /* Verificar que los datos llegaron correctamente */
        if (training.id === null)
            return new Response(JSON.stringify({ error: 'Faltan datos o los datos estan mal formateados' }), badRequest);

        /* Insercion de datos */
        const response = await sql(`SELECT * FROM ${tableNames.EJERCICIO} WHERE "${ejercicio.entrenamineto_id}"='${training.id}';`);

        /* Respuesta */
        return new Response(JSON.stringify({ data: response, response: "OK" }), okRequest);
    } catch (error) {
        console.error('Error parsing request body:', error);
        return new Response(
            JSON.stringify({ error: 'Invalid or empty request body' }), badRequest
        );
    }
};