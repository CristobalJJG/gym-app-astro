import { neon } from "@neondatabase/serverless";
import { names } from "./models/const";
import type { APIRoute } from "astro";

const sql = neon(import.meta.env.DATABASE_URL);

const goodAnwser = {
  status: 200,
  headers: {
    "Content-Type": "application/json"
  }
}

export async function GET() {
  const response = await sql(`SELECT * FROM ${names.ENTRENAMIENTO}`);
  console.log(response)
  return new Response(
    JSON.stringify({
      data: response
    }), okRequest
  );
};
interface Training {
  fecha: string;
  training_time: string;
  calorias: string;
}

export const POST: APIRoute = async ({ request }) => {
  let training = {} as Training;
  let body
  try {
    body = (await request.formData())
    training.fecha = body.get("fecha") as string;
    training.training_time = body.get("training_time") as string;
    training.calorias = body.get("calorias") as string;
    const response = await sql(`INSERT INTO "entrenamiento"("fecha","training_time","calorias") VALUES('${training.fecha}','${training.training_time}','${training.calorias}');`);
    return new Response(
      JSON.stringify({ data: response }),
      goodAnwser
    );
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new Response(
      JSON.stringify({ error: 'Invalid or empty request body' }), badRequest
    );
  }
};