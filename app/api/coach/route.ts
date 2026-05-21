import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { messages, system } = await request.json();

  // Kimi API (OpenAI-compatible)
  const res = await fetch("https://api.moonshot.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.KIMI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "moonshot-v1-8k",
      max_tokens: 400,
      messages: [
        { role: "system", content: system },
        ...messages,
      ],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error?.message || "API error" },
      { status: res.status }
    );
  }

  // Normalize to Anthropic-style response so CoachScreen doesn't need changes
  return NextResponse.json({
    content: [{ text: data.choices?.[0]?.message?.content || "No response" }],
  });
}
