import { NextResponse } from "next/server";
import { sendOpenAi } from "@/libs/gpt";

// This route is used to store the leads that are generated from the landing page.
// The API call is initiated by <ButtonLead /> component
// Duplicate emails just return 200 OK
export async function POST(req) {
  const body = await req.json();

  if (!body.messages) {
    return NextResponse.json({ error: "messages is required" }, { status: 400 });
  }

  try {
    // Add a first message prompt gpt to provide financial advice
    body.messages.unshift({ role: "system", content: "I need help with my finances" });
    const response = await sendOpenAi(body.messages, body.userId);

    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
