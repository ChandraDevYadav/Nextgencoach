import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateAIPrepReport = async (questionnaire) => {
  try {
    const prompt = `As an experienced coaching assistant, analyze the following questionnaire responses and generate a preparation report for the coach.
    
Questionnaire Type: ${questionnaire.type}
Title: ${questionnaire.title}

Client Responses:
${questionnaire.questions
  .map((q) => `- ${q.questionText}: ${q.answer}`)
  .join("\n")}

Please provide:
1. 10 suggested questions the coach could ask based on these responses
2. 3 key focus themes that emerge from the responses
3. Any noticeable patterns or areas to explore further

Format the response in markdown with clear headings for each section.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert coaching assistant that helps coaches prepare for sessions by analyzing questionnaire responses.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI prep report:", error);
    throw error;
  }
};

const generateSessionSummary = async (session) => {
  try {
    const prompt = `As a coaching assistant, analyze the following session details and generate a comprehensive summary for the client.

Session Title: ${session.title}
Session Date: ${session.date}
Session Duration: ${session.duration} minutes

Session Notes:
${session.notes || "No detailed notes provided"}

Transcript Excerpt:
${
  session.transcript
    ? session.transcript.substring(0, 2000) + "..."
    : "No transcript available"
}

Please provide a structured summary including:
1. Key breakthroughs or insights from the session
2. Main topics covered during the conversation
3. Action items or commitments the client made
4. 3-5 reflective questions for the client to consider before the next session

Format the response in markdown with clear headings and bullet points where appropriate.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert coaching assistant that creates clear, actionable session summaries for clients.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 1500,
    });

    return {
      keyBreakthroughs: extractSection(
        response.choices[0].message.content,
        "Key breakthroughs"
      ),
      topicsCovered: extractSection(
        response.choices[0].message.content,
        "Main topics"
      ),
      clientCommitments: extractSection(
        response.choices[0].message.content,
        "Action items"
      ),
      reflectiveQuestions: extractSection(
        response.choices[0].message.content,
        "reflective questions"
      ),
    };
  } catch (error) {
    console.error("Error generating session summary:", error);
    throw error;
  }
};

const generateCoachFeedback = async (session) => {
  try {
    const prompt = `As a senior coaching supervisor, analyze the following session details and provide constructive feedback for the coach.

Session Title: ${session.title}
Session Date: ${session.date}
Client: ${session.client.name}

Session Notes:
${session.notes || "No detailed notes provided"}

Transcript Excerpt:
${
  session.transcript
    ? session.transcript.substring(0, 2000) + "..."
    : "No transcript available"
}

AI Suggestions During Session:
${
  session.aiSuggestions.length > 0
    ? session.aiSuggestions
        .map(
          (s) =>
            `- Suggested Questions: ${s.suggestedQuestions.join(
              ", "
            )}\n  Focus Themes: ${s.focusThemes.join(", ")}`
        )
        .join("\n")
    : "No AI suggestions recorded"
}

Please provide feedback in these areas:
1. Coaching strengths demonstrated in the session
2. Potential missed opportunities or areas for improvement
3. Specific suggestions for enhancing coaching effectiveness
4. Recommended resources or approaches for future sessions

Format the response in markdown with clear headings.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an experienced coaching supervisor providing balanced, constructive feedback to help coaches improve.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });

    return {
      strengths: extractSection(
        response.choices[0].message.content,
        "Coaching strengths"
      ),
      missedOpportunities: extractSection(
        response.choices[0].message.content,
        "Potential missed opportunities"
      ),
      improvementSuggestions: extractSection(
        response.choices[0].message.content,
        "Specific suggestions"
      ),
      recommendedResources: extractSection(
        response.choices[0].message.content,
        "Recommended resources"
      ),
    };
  } catch (error) {
    console.error("Error generating coach feedback:", error);
    throw error;
  }
};

const generateSkillBuilderFeedback = async (session) => {
  try {
    const prompt = `As a master coach trainer, analyze this practice coaching session and provide detailed feedback.

Practice Session Details:
Date: ${session.createdAt}
Duration: ${Math.floor((new Date() - session.createdAt) / 60000)} minutes
Avatar Settings: ${JSON.stringify(session.avatarSettings, null, 2)}

Conversation Transcript:
${session.conversation.map((msg) => `${msg.role}: ${msg.content}`).join("\n")}

Please provide:
1. 3-5 strengths demonstrated in the coaching approach
2. 3-5 areas for improvement with specific examples
3. Suggested alternative approaches or questions
4. An overall rating (1-10) with justification
5. Recommended resources for skill development

Format the response in markdown with clear headings.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a master coach trainer providing detailed, actionable feedback on practice coaching sessions.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;

    return {
      strengths: extractSection(content, "strengths"),
      areasForImprovement: extractSection(content, "areas for improvement"),
      suggestedApproaches: extractSection(
        content,
        "Suggested alternative approaches"
      ),
      overallRating: extractSection(content, "overall rating"),
      recommendedResources: extractSection(content, "Recommended resources"),
    };
  } catch (error) {
    console.error("Error generating skill builder feedback:", error);
    throw error;
  }
};

const generateRealTimeSuggestions = async (transcript) => {
  try {
    const prompt = `As a real-time coaching assistant, analyze the ongoing conversation and provide suggestions.

Current Conversation:
${transcript}

Based on the conversation so far, please provide:
1. 3-5 potential questions the coach could ask next
2. 2-3 emerging themes or patterns
3. Any potential blind spots or areas not yet explored

Format as a JSON object with these keys: suggestedQuestions, focusThemes, areasToExplore.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a real-time coaching assistant that provides subtle, context-aware suggestions during live sessions.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error generating real-time suggestions:", error);
    throw error;
  }
};

const extractSection = (content, sectionTitle) => {
  const regex = new RegExp(
    `##?\\s*${sectionTitle}[\\s\\S]*?(?=##?\\s*|$)`,
    "i"
  );
  const match = content.match(regex);
  return match ? match[0].replace(`## ${sectionTitle}`, "").trim() : "";
};

export {
  generateAIPrepReport,
  generateSessionSummary,
  generateCoachFeedback,
  generateSkillBuilderFeedback,
  generateRealTimeSuggestions,
};
