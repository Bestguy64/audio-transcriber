import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // File object hack for Groq SDK
    const fileLike = new File([buffer], file.name, { type: file.type });

    const transcription = await groq.audio.transcriptions.create({
      file: fileLike,
      model: "whisper-large-v3",
      response_format: "json",
    });

    return NextResponse.json({ text: transcription.text });

  } catch (error) {
    console.error("Transcription Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
