// api/generate-email.js
// Vercel Serverless Function for Cold Email Generation

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { recipientName, company, industry, purpose, tone } = req.body;

    // Validate required fields
    if (!recipientName || !company || !purpose) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Build the prompt for the AI
    const industryText = industry ? ` in the ${industry} industry` : '';
    const prompt = `Write a ${tone || 'professional'} cold email to ${recipientName} at ${company}${industryText}. The purpose of the email is: ${purpose}.

The email should:
- Be concise and to the point (150-200 words)
- Have a compelling subject line
- Include a clear value proposition
- End with a specific call-to-action
- Be personalized and engaging
- Use the ${tone || 'professional'} tone throughout

Format the response as:
Subject: [subject line]

[email body]

Do not include any placeholders like [Your Name] or [Your Company]. Write a complete, ready-to-send email.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert email copywriter specializing in cold outreach emails. You write compelling, personalized emails that get responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to generate email',
        details: errorData.error?.message || 'Unknown error'
      });
    }

    const data = await response.json();
    const generatedEmail = data.choices[0].message.content;

    // Return the generated email
    return res.status(200).json({ 
      email: generatedEmail,
      metadata: {
        recipientName,
        company,
        industry,
        tone
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
