import { GoogleGenerativeAI } from "@google/generative-ai";

const cleanJson = (text) =>
  text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

const buildFallbackAnalysis = (complaint) => {
  const text = `${complaint.title} ${complaint.description} ${complaint.category}`.toLowerCase();
  let priority = "Medium";
  let department = "General Administration";

  if (text.includes("electric") || text.includes("power") || text.includes("spark")) {
    priority = text.includes("danger") || text.includes("shock") ? "High" : "High";
    department = "Electrical Department";
  } else if (text.includes("water") || text.includes("leak") || text.includes("pipe")) {
    priority = text.includes("flood") || text.includes("sewage") ? "High" : "Medium";
    department = "Water Department";
  } else if (text.includes("garbage") || text.includes("waste") || text.includes("trash")) {
    priority = "Medium";
    department = "Sanitation Department";
  } else if (text.includes("road") || text.includes("pothole") || text.includes("damage")) {
    priority = text.includes("accident") ? "High" : "Medium";
    department = "Public Works Department";
  } else if (text.includes("internet") || text.includes("network") || text.includes("broadband")) {
    priority = "Low";
    department = "IT and Communications Department";
  }

  const summarySource = complaint.description || complaint.title;
  const summary =
    summarySource.length > 140 ? `${summarySource.slice(0, 137).trim()}...` : summarySource;

  return {
    priority,
    department,
    summary,
    autoResponse:
      "Your complaint has been registered successfully and forwarded to the concerned department."
  };
};

export const analyzeComplaint = async (complaint) => {
  if (!process.env.GEMINI_API_KEY) {
    return buildFallbackAnalysis(complaint);
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
Analyze this civic complaint and return JSON only.

Complaint:
Title: ${complaint.title}
Description: ${complaint.description}
Category: ${complaint.category}
Location: ${complaint.location}

Return exactly this JSON shape:
{
  "priority": "Low | Medium | High",
  "department": "Suggested department name",
  "summary": "Short summary under 35 words",
  "autoResponse": "Polite response confirming next action"
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(cleanJson(responseText));

    if (!parsed.priority || !parsed.department || !parsed.summary || !parsed.autoResponse) {
      return buildFallbackAnalysis(complaint);
    }

    return {
      priority: ["Low", "Medium", "High"].includes(parsed.priority)
        ? parsed.priority
        : "Medium",
      department: parsed.department,
      summary: parsed.summary,
      autoResponse: parsed.autoResponse
    };
  } catch (error) {
    console.warn(`Gemini analysis failed, using fallback: ${error.message}`);
    return buildFallbackAnalysis(complaint);
  }
};
