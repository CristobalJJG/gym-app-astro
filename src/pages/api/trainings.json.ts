import { neon } from "@neondatabase/serverless";
import { ejercicio, entrenamiento, names } from "./models/const";
import type { APIRoute } from "astro";
import { badRequest, okRequest } from "./models/answers";

const sql = neon(import.meta.env.DATABASE_URL);


export async function GET() {
  const response = await sql(`SELECT * FROM ${names.ENTRENAMIENTO}`);
  console.log(response)
  return new Response(
    JSON.stringify({ data: response, response: "OK" }), okRequest
  );
};
interface Training {
  id: string;
  fecha: string;
  training_time: string;
  calorias: string;
}

export const POST: APIRoute = async ({ request }) => {
  let training = {} as Training;
  let body
  try {
    /* Obtencion de datos */
    body = (await request.formData())
    training.id = body.get("id") as string;

    /* Verificar que los datos llegaron correctamente */
    if (training.id === null)
      return new Response(JSON.stringify({ error: 'Faltan datos o los datos estan mal formateados' }), badRequest);

    /* Insercion de datos */
    const response = await sql(`SELECT * FROM ${names.EJERCICIO} WHERE "${ejercicio.entrenamineto_id}"='${training.id}';`);

    /* Respuesta */
    return new Response(JSON.stringify({ data: response, response: "OK" }), okRequest);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid or empty request body' }), badRequest
    );
  }
};

export const PUT: APIRoute = async ({ request }) => {
  let training = {} as Training;
  let body
  try {
    body = (await request.formData())
    training.fecha = body.get("fecha") as string;
    training.training_time = body.get("training_time") as string;
    training.calorias = body.get("calorias") as string;

    /* Verificar que los datos llegaron correctamente */
    if (training.id === null || training.calorias === null || training.fecha === null)
      return new Response(JSON.stringify({ error: 'Faltan datos o los datos estan mal formateados' }), badRequest);

    /* Actualizacion de datos */
    const response = await sql(`INSERT INTO "entrenamiento"("${training.fecha}","${training.training_time}","${training.calorias}") VALUES('${training.fecha}','${training.training_time}','${training.calorias}');`);

    /* Respuesta */
    return new Response(JSON.stringify({ data: response, response: "OK" }), okRequest);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid or empty request body' }), badRequest
    );
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  let training = {} as Training;
  let body
  try {
    /* Obtencion de datos */
    body = (await request.formData())
    let id = body.get("id") as string;
    training.fecha = body.get("fecha") as string;
    training.training_time = body.get("training_time") as string;
    training.calorias = body.get("calorias") as string;

    /* Verificar que los datos llegaron correctamente */
    if (training.id === null || training.training_time === null || training.calorias === null || training.fecha === null)
      return new Response(JSON.stringify({ error: 'Faltan datos o los datos estan mal formateados' }), badRequest);

    /* Actualizacion de datos */
    const response = await sql(`UPDATE "${names.ENTRENAMIENTO}" SET "fecha"='${training.fecha}' "training_time"='${training.training_time}', "calorias"='${training.calorias}' WHERE "${entrenamiento.id}"='${id}';`);

    /* Respuesta */
    return new Response(JSON.stringify({ data: response, response: "OK" }), okRequest);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid or empty request body' }), badRequest
    );
  }
}