import { ejercicio, entrenamiento, tableNames, sql } from "./models/const";
import type { Training } from "./models/interfaces";
import type { APIRoute } from "astro";
import { badRequest, okRequest } from "./models/answers";


export async function GET() {
  const response = await sql(`SELECT * FROM ${tableNames.ENTRENAMIENTO}`);
  console.log(response)
  return new Response(
    JSON.stringify({ data: response, response: "OK" }), okRequest
  );
};


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

/* Nuevo entrenamiento */
export const PUT: APIRoute = async ({ request }) => {
  let training = {} as Training;
  let body
  try {
    /* Obtencion de datos */
    body = await request.json()
    training.fecha = body.fecha;
    training.training_time = body.training_time;
    training.calorias = body.calorias;

    /* Verificar que los datos llegaron correctamente */
    if (training.fecha === null)
      return new Response(JSON.stringify({ error: 'Falta la fecha o los datos estan mal formateados' }), badRequest);

    /* Actualizacion de datos */
    const response = await sql(`INSERT INTO "${tableNames.ENTRENAMIENTO}"("${entrenamiento.fecha}","${entrenamiento.duracion}","${entrenamiento.calorias}") VALUES('${training.fecha}','${training.training_time}','${training.calorias}');`);

    /* Respuesta */
    return new Response(JSON.stringify({ data: response, response: "OK" }), okRequest);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid or empty request body' }), badRequest
    );
  }
};

/* Modificar entrenamiento */
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
    const response = await sql(`UPDATE "${tableNames.ENTRENAMIENTO}" SET "fecha"='${training.fecha}' "training_time"='${training.training_time}', "calorias"='${training.calorias}' WHERE "${entrenamiento.id}"='${id}';`);

    /* Respuesta */
    return new Response(JSON.stringify({ data: response, response: "OK" }), okRequest);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid or empty request body' }), badRequest
    );
  }
}