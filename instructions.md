# Cold Email AI Generator

## Overview
An AI-powered tool that generates personalized cold emails based on recipient information, company details, and desired tone.

## Features
- Generate personalized cold emails
- Customize tone (Professional, Friendly, Casual, Formal)
- Industry-specific targeting
- Clean and responsive UI
- One-click copy to clipboard

## Files Structure
```
coldemail-ai/
├── index.html           # Main HTML interface
├── style.css            # Styling and animations
├── instructions.md      # This file
├── vercel.json          # Vercel configuration
└── api/
    └── generate-email.js # Serverless function for AI generation
```

## Setup Instructions

### 1. Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Import the `coldemail-ai` repository
3. Configure environment variables
4. Deploy

### 2. Environment Variables
Add the following to your Vercel project settings:

```
OPENAI_API_KEY=your_openai_api_key_here
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

### 3. Local Development
To test locally:
```bash
npm install -g vercel
vercel dev
```

## Usage
1. Fill in the recipient's name
2. Enter the company name
3. Specify the industry (optional)
4. Describe the purpose of your email
5. Select the desired tone
6. Click "Generate Email"
7. Copy and use the generated email

## API Endpoint
- **POST** `/api/generate-email`
- **Body**: JSON object with:
  - `recipientName`: string
  - `company`: string
  - `industry`: string (optional)
  - `purpose`: string
  - `tone`: string

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript
- Vercel Serverless Functions
- OpenAI GPT API

## Security Notes
- Never commit your OpenAI API key to the repository
- Use environment variables for sensitive data
- API calls are made server-side to protect your key

## Customization
- Modify `style.css` to change the appearance
- Edit prompts in `api/generate-email.js` to adjust AI behavior
- Add more tone options in both `index.html` and the API function

## Troubleshooting
- If emails aren't generating, check your OpenAI API key
- Ensure you have billing enabled on your OpenAI account
- Check Vercel deployment logs for errors

## License
MIT License - Feel free to use and modify
