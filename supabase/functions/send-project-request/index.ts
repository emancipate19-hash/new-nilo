// Supabase Edge Function: send-project-request
// Deploy command: supabase functions deploy send-project-request --no-verify-jwt

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ProjectRequestBody {
  name: string;
  email: string;
  projectType?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  clientType?: string;
  preferredContact?: string;
  message: string;
  attachments?: string[];
}

// Helper to escape HTML characters for Telegram HTML parse_mode
function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

Deno.serve(async (req: Request) => {
  // 1. Log "Function started" immediately when invoked
  console.log("Function started");
  console.log("Method:", req.method);

  // 2. Handle CORS preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    console.warn(`[send-project-request] Method ${req.method} not allowed.`);
    return new Response(
      JSON.stringify({ success: false, error: `Method ${req.method} not allowed. Use POST.` }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    // 3. Log whether TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID exist (NEVER log values)
    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

    const hasBotToken = Boolean(botToken && botToken.trim().length > 0);
    const hasChatId = Boolean(chatId && chatId.trim().length > 0);

    console.log("TELEGRAM_BOT_TOKEN exists:", hasBotToken);
    console.log("TELEGRAM_CHAT_ID exists:", hasChatId);

    // 4. Parse request body
    let bodyText = "";
    try {
      bodyText = await req.text();
    } catch (readErr: any) {
      console.error("[send-project-request] Failed to read request body text:", readErr);
    }

    if (!bodyText) {
      console.error("[send-project-request] Request body is empty.");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Request body is empty.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let body: ProjectRequestBody;
    try {
      body = JSON.parse(bodyText);
    } catch (parseErr: any) {
      console.error("[send-project-request] JSON parse error:", parseErr);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid JSON payload: ${parseErr?.message}`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Request received successfully");
    console.log("Payload summary:", {
      name: body.name,
      email: body.email,
      projectType: body.projectType,
      servicesCount: Array.isArray(body.services) ? body.services.length : 0,
      hasBudget: Boolean(body.budget),
      hasTimeline: Boolean(body.timeline),
      clientType: body.clientType,
      preferredContact: body.preferredContact,
      messageLength: body.message?.length || 0,
      attachmentsCount: Array.isArray(body.attachments) ? body.attachments.length : 0,
    });

    if (!body.name || !body.email || !body.message) {
      console.warn("[send-project-request] Missing required fields in body");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields (name, email, or message)",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify secrets are present in Supabase environment
    if (!hasBotToken || !hasChatId) {
      const missing = [];
      if (!hasBotToken) missing.push("TELEGRAM_BOT_TOKEN");
      if (!hasChatId) missing.push("TELEGRAM_CHAT_ID");
      const errMsg = `Missing required Supabase secret(s): ${missing.join(", ")}. Please configure them in Supabase Project Settings > Secrets.`;
      console.error("[send-project-request]", errMsg);
      return new Response(
        JSON.stringify({
          success: false,
          error: errMsg,
          details: {
            hasBotToken,
            hasChatId,
          },
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Format notification message using HTML
    const formattedServices = Array.isArray(body.services) && body.services.length > 0
      ? body.services.join(", ")
      : body.projectType || "General Architectural Inquiry";

    const formattedMessage = [
      `🏛 <b>NEW CLIENT PROJECT REQUEST</b>`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Client:</b> ${escapeHtml(body.name)}`,
      `📧 <b>Email:</b> ${escapeHtml(body.email)}`,
      `🏢 <b>Client Type:</b> ${escapeHtml(body.clientType || "Individual")}`,
      `🛠 <b>Services:</b> ${escapeHtml(formattedServices)}`,
      `💰 <b>Budget:</b> ${escapeHtml(body.budget || "Not specified")}`,
      `⏱ <b>Timeline:</b> ${escapeHtml(body.timeline || "Flexible")}`,
      `📞 <b>Preferred Contact:</b> ${escapeHtml(body.preferredContact || "Email")}`,
      ``,
      `📝 <b>Project Overview:</b>`,
      `${escapeHtml(body.message)}`,
      ...(body.attachments && body.attachments.length > 0
        ? [
            ``,
            `📎 <b>Attachments (${body.attachments.length}):</b> ${escapeHtml(body.attachments.join(", "))}`,
          ]
        : []),
      `━━━━━━━━━━━━━━━━━━━━━`,
      `⏰ <i>${new Date().toUTCString()}</i>`,
    ].join("\n");

    // 5. Send message to Telegram and await response
    const telegramEndpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;
    console.log("Sending message to Telegram...");

    const telegramRes = await fetch(telegramEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: "HTML",
      }),
    });

    console.log("Telegram HTTP status:", telegramRes.status);

    let telegramData: any = {};
    try {
      telegramData = await telegramRes.json();
    } catch (tJsonErr) {
      console.warn("[send-project-request] Could not parse Telegram response as JSON:", tJsonErr);
    }

    console.log("Telegram success:", Boolean(telegramData.ok));

    // Handle Telegram errors
    if (!telegramRes.ok || !telegramData.ok) {
      console.error("Telegram error response:", JSON.stringify(telegramData, null, 2));

      // If HTML entity parse failed, attempt a fallback plain-text delivery
      if (telegramData?.description?.includes("can't parse entities")) {
        console.log("[send-project-request] Retrying with plain text delivery...");
        const plainText = [
          `NEW CLIENT PROJECT REQUEST`,
          `Client: ${body.name}`,
          `Email: ${body.email}`,
          `Client Type: ${body.clientType || "Individual"}`,
          `Services: ${formattedServices}`,
          `Budget: ${body.budget || "Not specified"}`,
          `Timeline: ${body.timeline || "Flexible"}`,
          `Preferred Contact: ${body.preferredContact || "Email"}`,
          ``,
          `Message:`,
          body.message,
        ].join("\n");

        const retryRes = await fetch(telegramEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: plainText,
          }),
        });

        console.log("Fallback Telegram HTTP status:", retryRes.status);
        const retryData = await retryRes.json().catch(() => ({}));

        if (retryRes.ok && retryData.ok) {
          console.log("Telegram success:", true);
          console.log("Telegram message sent successfully");
          return new Response(
            JSON.stringify({
              success: true,
              message: "Project request sent successfully.",
              telegramMessageId: retryData.result?.message_id,
            }),
            {
              status: 200,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      }

      // Return the actual error details to the frontend as JSON
      return new Response(
        JSON.stringify({
          success: false,
          error: telegramData.description || `Telegram API returned HTTP ${telegramRes.status}`,
          telegramResponse: telegramData,
          httpStatus: telegramRes.status,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Telegram message sent successfully");

    // Return success JSON with CORS headers
    return new Response(
      JSON.stringify({
        success: true,
        message: "Project request sent successfully.",
        telegramMessageId: telegramData.result?.message_id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("[send-project-request] Unhandled error during execution:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err?.message || "Internal server error in Edge Function.",
        stack: err?.stack,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
