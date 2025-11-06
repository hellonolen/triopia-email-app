import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

/**
 * Summarize email content using AI
 */
export async function summarizeEmail(params: {
  subject: string;
  from: string;
  body: string;
}): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("[AI] OpenAI API key not configured - skipping summarization");
    return "";
  }

  try {
    const prompt = `Summarize this email in 1-2 concise sentences for an executive:

From: ${params.from}
Subject: ${params.subject}

${params.body.substring(0, 2000)}

Summary:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an executive assistant that summarizes emails concisely and professionally.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("[AI] Error summarizing email:", error);
    return "";
  }
}

/**
 * Categorize email based on content
 */
export async function categorizeEmail(params: {
  subject: string;
  from: string;
  body: string;
}): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return "general";
  }

  try {
    const prompt = `Categorize this email into ONE of these categories: urgent, action_required, opportunity, meeting, financial, personal, newsletter, spam, general

From: ${params.from}
Subject: ${params.subject}

${params.body.substring(0, 1000)}

Category (one word only):`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You categorize emails. Respond with only one word from the given categories.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 10,
      temperature: 0.1,
    });

    const category = completion.choices[0]?.message?.content?.trim().toLowerCase() || "general";
    return category;
  } catch (error) {
    console.error("[AI] Error categorizing email:", error);
    return "general";
  }
}

/**
 * Determine email priority using AI
 */
export async function prioritizeEmail(params: {
  subject: string;
  from: string;
  body: string;
}): Promise<"urgent" | "high" | "normal" | "low"> {
  if (!process.env.OPENAI_API_KEY) {
    return "normal";
  }

  try {
    const prompt = `Analyze this email and assign a priority level: urgent, high, normal, or low

From: ${params.from}
Subject: ${params.subject}

${params.body.substring(0, 1000)}

Priority (one word only):`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You assign priority levels to emails for busy executives. Respond with only: urgent, high, normal, or low.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 10,
      temperature: 0.1,
    });

    const priority = completion.choices[0]?.message?.content?.trim().toLowerCase() as any;
    
    if (["urgent", "high", "normal", "low"].includes(priority)) {
      return priority;
    }
    
    return "normal";
  } catch (error) {
    console.error("[AI] Error prioritizing email:", error);
    return "normal";
  }
}

/**
 * Generate quick reply suggestions with tone matching
 */
export async function generateQuickReplies(params: {
  subject: string;
  from: string;
  body: string;
  tone?: "formal" | "casual" | "friendly" | "professional";
}): Promise<string[]> {
  if (!process.env.OPENAI_API_KEY) {
    return [];
  }

  try {
    const tone = params.tone || "professional";
    const prompt = `Generate 3 brief email reply suggestions for this email. Use a ${tone} tone.

From: ${params.from}
Subject: ${params.subject}

${params.body.substring(0, 1500)}

Reply suggestions (numbered 1-3):`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You generate brief, ${tone} email reply suggestions for busy executives. Each reply should be 1-2 sentences.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || "";
    
    // Parse numbered replies
    const replies = content
      .split(/\d+\./)
      .slice(1)
      .map(r => r.trim())
      .filter(r => r.length > 0)
      .slice(0, 3);

    return replies;
  } catch (error) {
    console.error("[AI] Error generating quick replies:", error);
    return [];
  }
}

/**
 * Generate full email draft with tone matching
 */
export async function generateEmailDraft(params: {
  context: string;
  tone?: "formal" | "casual" | "friendly" | "professional";
  length?: "brief" | "medium" | "detailed";
}): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return "";
  }

  try {
    const tone = params.tone || "professional";
    const length = params.length || "medium";
    
    const lengthInstructions = {
      brief: "Keep it to 2-3 sentences.",
      medium: "Write 1-2 paragraphs.",
      detailed: "Write 3-4 paragraphs with details.",
    };

    const prompt = `Write an email based on this context. Use a ${tone} tone. ${lengthInstructions[length]}

Context: ${params.context}

Email:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You write ${tone} emails for executives. Be clear, concise, and professional.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("[AI] Error generating email draft:", error);
    return "";
  }
}

/**
 * Extract action items from email
 */
export async function extractActionItems(params: {
  subject: string;
  body: string;
}): Promise<string[]> {
  if (!process.env.OPENAI_API_KEY) {
    return [];
  }

  try {
    const prompt = `Extract action items from this email. List only clear, actionable tasks.

Subject: ${params.subject}

${params.body.substring(0, 2000)}

Action items (one per line, starting with "-"):`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You extract actionable tasks from emails. List only clear action items, one per line.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content || "";
    
    // Parse action items
    const items = content
      .split("\n")
      .map(line => line.replace(/^-\s*/, "").trim())
      .filter(line => line.length > 0);

    return items;
  } catch (error) {
    console.error("[AI] Error extracting action items:", error);
    return [];
  }
}

/**
 * Detect if email requires urgent attention
 */
export async function detectUrgency(params: {
  subject: string;
  from: string;
  body: string;
}): Promise<{
  isUrgent: boolean;
  reason: string;
}> {
  if (!process.env.OPENAI_API_KEY) {
    return { isUrgent: false, reason: "" };
  }

  try {
    const prompt = `Analyze if this email requires urgent attention. Respond in JSON format: {"isUrgent": true/false, "reason": "brief explanation"}

From: ${params.from}
Subject: ${params.subject}

${params.body.substring(0, 1000)}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You analyze emails for urgency. Respond only with valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 100,
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content || "{}";
    const result = JSON.parse(content);
    
    return {
      isUrgent: result.isUrgent || false,
      reason: result.reason || "",
    };
  } catch (error) {
    console.error("[AI] Error detecting urgency:", error);
    return { isUrgent: false, reason: "" };
  }
}

/**
 * Billionable Agent - Proactive email insights
 */
export async function getBillionableInsights(params: {
  subject: string;
  from: string;
  body: string;
}): Promise<{
  insight: string;
  suggestedAction: string;
  dealPotential?: "high" | "medium" | "low";
}> {
  if (!process.env.OPENAI_API_KEY) {
    return { insight: "", suggestedAction: "" };
  }

  try {
    const prompt = `As "Billionable", an AI agent for high-net-worth executives, analyze this email and provide insights. Respond in JSON format:
{
  "insight": "key insight about this email",
  "suggestedAction": "recommended action",
  "dealPotential": "high/medium/low" (if applicable)
}

From: ${params.from}
Subject: ${params.subject}

${params.body.substring(0, 1500)}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Billionable, an AI agent that helps executives identify opportunities, manage relationships, and prioritize high-value actions. Be strategic and concise.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content || "{}";
    const result = JSON.parse(content);
    
    return {
      insight: result.insight || "",
      suggestedAction: result.suggestedAction || "",
      dealPotential: result.dealPotential,
    };
  } catch (error) {
    console.error("[AI] Error getting Billionable insights:", error);
    return { insight: "", suggestedAction: "" };
  }
}
