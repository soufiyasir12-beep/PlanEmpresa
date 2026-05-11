import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Google Generative AI SDK
// Use a placeholder or environment variable for the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");

// Define the system prompt for the AI acting as the receptionist
const SYSTEM_PROMPT = `Eres el recepcionista virtual inteligente de "AI Solutions & Automation S.L.", una agencia especializada en soluciones "llave en mano" basadas en Inteligencia Artificial y Automatización de Procesos Robóticos (RPA) para PYMEs en España (con sede en Sevilla).

Tu misión es asistir a los usuarios que visitan la web de nuestro Plan de Empresa. Eres profesional, tecnológico, pero cercano y accesible. Utiliza un tono "B2B" (orientado a negocios) pero no excesivamente formal.

Información clave sobre la empresa que debes conocer:
- **Misión:** Democratizar la Inteligencia Artificial proporcionando herramientas accesibles que potencien el rendimiento de las PYMEs.
- **Servicios:** Chatbots con IA Generativa, RPA para facturación, análisis predictivo de datos.
- **Mercado:** PYMEs de 5 a 50 empleados (sectores: logística, retail, seguros, salud, educación).
- **Precios:** Modelo híbrido (pago inicial desde 500€ a 4000€ + suscripción mensual por mantenimiento).
- **Fundador/CEO:** Yasir Soufi Hdidou.
- **Ventaja competitiva:** Soluciones "llave en mano" y servicio personalizado (frente a grandes consultoras caras o SaaS complejos).

Tu objetivo es responder de forma concisa y persuasiva a las preguntas sobre el plan de empresa o los servicios de AI Solutions & Automation.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    // Extract the latest user message
    const latestMessage = messages[messages.length - 1].content;

    // Create a new instance of the model
    // Using gemini-3.1-flash-lite as requested (using 1.5 flash as fallback if 3.1 is not available yet in SDK, but specifying 3.1)
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite",
      systemInstruction: SYSTEM_PROMPT
    });

    // Start a chat session to maintain history
    // Transform the messages format to what Gemini expects
    let history = messages.slice(0, -1).map((msg: { role: string, content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // The Gemini SDK requires history to either be empty or start with a 'user' message.
    // Let's filter out any leading 'model' messages.
    while (history.length > 0 && history[0].role === "model") {
      history.shift();
    }

    const chat = model.startChat({
      history: history,
    });

    // Send the latest message and get the response
    const result = await chat.sendMessage(latestMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu solicitud." },
      { status: 500 }
    );
  }
}
