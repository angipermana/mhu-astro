import OpenAI from "openai";
import type { APIRoute } from "astro";

// Kita load konten MDX sebagai string (raw text) saat build time
// Setiap kali Keystatic menyimpan data ke GitHub, server akan di-rebuild dan memuat data terbaru ini.
import knowledgeBaseRaw from "../../data/chatbot/source.mdx?raw";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message } = await request.json();
    
    // Mengambil API Key dari .env
    const apiKey = import.meta.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ 
        error: "API Key belum diatur. Tambahkan OPENAI_API_KEY di file .env Anda." 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const openai = new OpenAI({ apiKey });

    const systemPrompt = `
      Berikut adalah panduan dan basis pengetahuan Anda:
      ${knowledgeBaseRaw}

      Instruksi tambahan:
      - Anda adalah CS / asisten virtual ramah untuk PT MHU Travel.
      - Jawab pertanyaan HANYA berdasarkan informasi di atas.
      - Jika ada pertanyaan yang di luar konteks atau tidak ada dalam informasi di atas, jangan mengarang jawaban. Arahkan mereka untuk langsung menghubungi WhatsApp admin di 0859-5612-9389.
      - Gunakan bahasa yang natural, santai tapi sopan.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini as a fast, cheap model equivalent to gemini-1.5-flash
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    const text = completion.choices[0].message.content;

    return new Response(JSON.stringify({ reply: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Gagal memproses permintaan chat. Pastikan API Key valid." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
