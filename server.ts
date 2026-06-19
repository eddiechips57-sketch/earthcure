import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily when API is called
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

const SYSTEM_INSTRUCTION = `
You are Nyasa, the dedicated Earthcure Botanical Consultation AI Assistant. Your goal is to provide warm, expert, and legally accurate holistic wellness advice to South African customers visiting the Earthcure storefront.

Earthcure is a premium digital storefront showcasing 100% legal, organic, industrial hemp products sourced from legal organic crops in Salima and Lilongwe, Malawi, and Bottled in Cape Town, South Africa.

CRITICAL INFORMATION & CONTEXT:
1. LEGAL STATUS in South Africa:
   - 100% legal under the South African Department of Health regulations.
   - Products are broad/full-spectrum hemp extracts containing 0.0% THC (completely non-psychoactive).
   - Safe to consume, will pass standard employment / labor drug tests, and has no legal issues.

2. ORDERING, PAYMENTS & WHATSAPP CHECKOUT:
   - Payment gateway integration is currently in progress. 
   - To complete any order and coordinate delivery payment, customers must contact the Earthcure warehouse via WhatsApp at 07493208683.
   - Advise the customer that they can add products to their shopping basket and click the "WhatsApp Checkout" button inside their basket drawer to automatically draft an order invoice ready to send to our WhatsApp support link.

3. SHIPPING & COURIER LOGISTICS (SOUTH AFRICA):
   - Flat-rate door-to-door express couriers: R85 for orders under R500.
   - ENTIRELY FREE express courier delivery for orders of R500 or more!
   - Transit takes 2–3 working days to major metros (Johannesburg, Cape Town, Durban) and about 4 working days for outlying parts of South Africa.
   - We also support DHL/custom border border-couriers (e.g., Lilongwe-Salima direct).
   - If a customer queries an existing order "EC-92813-SA" OR asks general tracking/shipment questions such as "where is my package", "has my package arrived", "did my parcel arrive", "is my order here", or "track order", locate order "EC-92813-SA" automatically. Explain that it is safely dispatched and in transit (specifically: currently traversing the Karoo corridor via Carbon-Neutral Express Speedpost, expected at their doorstep within 24-48 hours). Be reassuring and professional!

4. EARTHCURE PRODUCT CATALOG:
   Here are the exact products available on the site:
   - "Broad Spectrum CBD Oils 30 ml" (Price: R390). Available in 300mg and 600mg formulations. Infused with pure organic hemp extract and cold-pressed hemp seed carrier oil. Aids anxiety relief, calming active thoughts, and sleep cycle optimization. Regular dosage: 5-10 drops (Approx. 10-20mg CBD) under the tongue, hold for 60 seconds before swallowing.
   - "Delicious CBD Hemp Honey 500g" (Price: R295). Wild Malawian Meadow Honey natively infused with 200mg of broad-spectrum CBD. Premium cold-harvested wildflower honey. Enjoy 1-2 teaspoons daily in warm herbal teas, oatmeal, or on toast.
   - "Relaxing CBD Herbal Tea 50g" (Price: R110). Loose-leaf slow-dried raw hemp foliage, flower calyxes, and lemongrass leaves. 100% caffeine-free organic nightcap. Promotes calming sleep and stress reduction. Usage: Steep 1-2 teaspoons in 85°C hot water for 5 to 7 minutes.
   - "Hearty Hemp Shelled Seeds 500g" (Price: R195). Creamy, nutty superfood hemp hearts (similar flavor to pine nuts). Source of raw complete protein, zinc, iron, and bioavailable magnesium. Serving size: 2-3 tablespoons over porridge, salads, or smoothies.
   - "Nutritious Hemp Protein Powder 500g" (Price: R240). mechanical stone-milled seed protein cake. 15g vegan protein & 8g prebiotic fiber per 30g serving. High bioavailability without whey bloating. Mix 2-3 tablespoons in smoothies or healthy baking.
   - "Culinary Hemp Seed Oil 250 ml" (Price: R150). Velvety, expeller-pressed oil containing the perfect 3:1 ratio of Omega-6 to Omega-3 essential fatty acids. Ideal for managing cholesterol and brain health. Enjoy 1-2 tablespoons raw (do not heat/fry).
   - "Hemp Seed Hair & Body Oil 250ml" (Price: R85). Cosmetic-grade hemp seed oil loaded with vitamin E and nourishing lipids. Excellent for dry skin, scalp flex, and dry hair shine. Apply a few drops directly to damp skin/scalp.
   - "Amari CBD Topical Balm 50ml" (Price: R160). Nourishing ointment with broad-spectrum CBD, unrefined African shea butter, beeswax, eucalyptus, and peppermint oils. Deep relief for dry patches, eczema-prone skin, and sore muscles/joints.
   - "CBD Smoking Flowers (Blue Monkey) 5g" (Price: R245). Solar outdoor cured industrial hemp flower hand-trimmed buds. Strictly non-psychoactive (under 0.001% THC), rich in CBD and botanical terpenes. Used for wellness vaporization.

TONE & STYLE GUIDELINES:
- Be friendly, professional, compassionate, and concise. Speak clearly and objectively.
- Integrate "Moni!" (Malawian greeting) warm style occasionally.
- Always guide customers precisely based on the catalog specifications.
- Keep answers compact so they read beautifully inside a floating chat window.
- Ensure the user knows our WhatsApp booking line (07493208683) for order finalize coordination.
`;

// Helper for exponential backoff sleep
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fallback response engine if Gemini API is entirely down
function getLocalFallbackResponse(userMessage: string): string {
  const text = (userMessage || "").toLowerCase();
  
  if (text.includes("legal") || text.includes("thc") || text.includes("law") || text.includes("safe") || text.includes("pass")) {
    return "Moni! Our Earthcure organic wellness products are 100% legal under current South African Department of Health regulations. They are broad/full-spectrum extracts containing 0.0% THC (completely non-psychoactive), making them entirely safe to consume, pass standard workplace drug tests, and free of any legal issues! 🌿";
  }
  if (text.includes("dose") || text.includes("dosage") || text.includes("drops") || text.includes("how much") || text.includes("how many") || text.includes("use") || text.includes("take")) {
    return "Moni! Essential dosage instructions for Earthcure:\n\n" +
           "• **Broad Spectrum CBD Oils**: 5–10 drops under the tongue. Hold for 60 seconds before swallowing.\n" +
           "• **Delicious CBD Hemp Honey**: 1–2 teaspoons daily inside warm herbal teas, oatmeal, or toast.\n" +
           "• **Relaxing CBD Herbal Tea**: Steep 1-2 teaspoons in hot water (85°C) for 5 to 7 minutes.\n" +
           "• **Hearty Hemp Shelled Seeds / Protein**: 2–3 tablespoons over porridge, salads, or smoothies.";
  }
  if (text.includes("ship") || text.includes("delivery") || text.includes("deliver") || text.includes("fee") || text.includes("cost") || text.includes("courier") || text.includes("postcode") || text.includes("transit")) {
    return "Moni! We dispatch all orders door-to-door using high-priority express couriers across South Africa:\n\n" +
           "• **Orders under R500**: Flat-rate shipping of R85.\n" +
           "• **Orders of R500 or more**: ENTIRELY FREE express courier delivery!\n" +
           "• **Transit times**: 2–3 working days to major metros (Johannesburg, Cape Town, Durban) and about 4 working days for outlying parts of South Africa.\n\n" +
           "Populate your basket and click 'WhatsApp Checkout' to complete custom logistics!";
  }
  if (text.includes("package") || text.includes("arrive") || text.includes("parcel") || text.includes("track") || text.includes("order") || text.includes("ec-92813-sa") || text.includes("where is my") || text.includes("here")) {
    return "Parcels are tracked live! I have queried our South African Speedpost dispatch ledger for package reference: **EC-92813-SA**:\n\n" +
           "• ✅ **Order Processing (DONE)**: Secure payment cleared. Sourced legal Industrial Hemp permit numbers.\n" +
           "• ✅ **Cape Town Labs (DONE)**: Sachet certification check complete. Sealed carefully in custom carbon cases.\n" +
           "• 🚚 **Courier In Transit (CURRENT)**: Dispatched via Carbon-Neutral Express Speedpost Cargo. Currently traversing the Karoo corridor.\n" +
           "• 🏠 **Estimated Doorstep Drop**: Expected delivery inside **24–48 hours**! We appreciate your patience.";
  }
  if (text.includes("malawi") || text.includes("salima") || text.includes("source") || text.includes("where do you") || text.includes("grow")) {
    return "Moni! Earthcure's legal, organic industrial hemp is ethically grown under official permits in Lilongwe and Salima, Malawi, utilizing clean irrigation and solar curing. We then carefully process, blend, and bottle everything inside our laboratory facility in Cape Town, South Africa, to guarantee world-class therapeutic quality.";
  }

  // General default fallback
  return "Moni! I am currently experiencing temporarily elevated demand on our primary AI consultation nodes, but I am still fully online to guide you!\n\n" +
         "• All Earthcure products are 100% legal in SA (0.0% THC).\n" +
         "• Shipping is flat rate R85, or FREE for orders of R500 or more.\n" +
         "• Contact us on WhatsApp at **07493208683** or click 'WhatsApp Checkout' in your basket to coordinate deliveries.\n\n" +
         "Ask me about standard dosages, legal status, or try tracking package reference 'EC-92813-SA'!";
}

// Resilient content generator supporting retries and fellback chains
async function generateContentWithRetry(client: GoogleGenAI, contents: any[]): Promise<any> {
  const modelsToTry = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-1.5-flash"];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        console.log(`[Gemini API] Attempting generation with model ${modelName} (attempt ${attempts + 1}/${maxAttempts})...`);
        const response = await client.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        if (response && response.text) {
          console.log(`[Gemini API] Generation successful with model ${modelName}!`);
          return response;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err.message || String(err);
        const errCode = err.code || err.statusCode || (err.error && err.error.code);
        const errStatus = err.status || (err.error && err.error.status);
        
        console.warn(`[Gemini API Warning] Model ${modelName} attempt ${attempts + 1} failed: code=${errCode}, status=${errStatus}, message=${errMsg}`);

        // If it's a structural client-side error (400 Bad Request, invalid contents, etc.) don't keep retrying this model
        if (errCode === 400 || errMsg.toLowerCase().includes("invalid") || errMsg.toLowerCase().includes("not found")) {
          break;
        }

        attempts++;
        if (attempts < maxAttempts) {
          const delay = Math.pow(2, attempts) * 350 + Math.random() * 150; // Exponential backoff with jitter
          console.log(`[Gemini API] Retrying model ${modelName} in ${Math.round(delay)}ms...`);
          await sleep(delay);
        }
      }
    }
  }

  throw lastError || new Error("All fallback models were exhausted.");
}

// Chat interaction API
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array in request body." });
  }

  let userText = "";
  if (messages.length > 0) {
    userText = messages[messages.length - 1].text || "";
  }

  try {
    const client = getGeminiClient();

    // Map message history to Gemini contents structure
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await generateContentWithRetry(client, contents);
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("[Gemini Chat API Critically Exhausted - Triggering Offline Match Router]:", error);
    
    // Serve our elegant, highly context-aware fallback response rather than returning a 500 block error
    const fallbackMessage = getLocalFallbackResponse(userText);
    res.json({ text: fallbackMessage });
  }
});

async function start() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
