# Gemini Integration Documentation

## Overview

The Prompt Master application now includes integration with Google's Gemini AI (Gemini 2.0 Flash) for automatic prompt enhancement. This feature helps users improve their prompts using advanced AI capabilities.

## Features

### Automatic Prompt Enhancement
- **Auto-enhancement**: Automatically enhances prompts when enabled
- **Manual enhancement**: Trigger enhancement manually with a single click
- **Real-time feedback**: Shows enhancement status and errors
- **Context-aware**: Considers role, tone, audience, and format settings

### Gemini Model Configuration
- **Model**: Gemini 2.5 Flash (latest version)
- **Temperature**: 0.3 (balanced for consistent enhancement)
- **Top P**: 0.8 (diverse but focused responses)
- **Safety Settings**: Disabled for maximum flexibility in prompt engineering

## Setup Instructions

### 1. API Key Configuration
Add your Gemini API key to the `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### 2. Get API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your `.env` file

### 3. Environment Variables
The application supports both `VITE_GEMINI_API_KEY` and `GEMINI_API_KEY` environment variables for compatibility.

## Usage

### Automatic Enhancement
1. Toggle the "Auto-enhance" switch in the Prompt Input panel
2. Start typing your prompt
3. The system will automatically enhance your prompt using Gemini AI
4. Enhanced prompts are marked with a purple "Enhanced" badge

### Manual Enhancement
1. Enter your prompt in the input field
2. Configure role, tone, audience, and format settings (optional)
3. Click the "Enhance with Gemini" button
4. Wait for the enhancement to complete
5. The enhanced prompt will be automatically applied

### Enhancement Status
- **Enhancing**: Shows a spinning icon and "Enhancing..." text
- **Enhanced**: Purple badge appears on the optimized prompt
- **Error**: Red error message with details

## System Prompt

The Gemini AI uses a specialized system prompt designed for prompt engineering:

```
You are an expert prompt engineering assistant specializing in enhancing and optimizing prompts for large language models. Your task is to analyze and improve user prompts to make them more effective, clear, and structured.

When enhancing prompts, follow these guidelines:
1. Maintain the original intent and meaning of the user's prompt
2. Add structure and clarity where needed
3. Suggest appropriate operators or formatting if beneficial
4. Keep the enhanced prompt concise but comprehensive
5. Ensure the prompt is well-organized and easy for an LLM to understand
6. Consider the context and purpose of the prompt
7. Add relevant context if it would improve the prompt's effectiveness

Return only the enhanced prompt without any additional explanation or commentary. Do not include any markdown formatting, just the plain enhanced prompt text.
```

## Error Handling

The system includes comprehensive error handling:

- **API Key Not Configured**: Shows error message when API key is missing
- **Network Errors**: Handles connection issues gracefully
- **Rate Limiting**: Displays appropriate error messages
- **Invalid Prompts**: Validates input before sending to API

## Performance Considerations

- **Debouncing**: Enhancement requests are debounced to prevent excessive API calls
- **Context Building**: Only relevant context is sent to the API
- **Error Recovery**: System continues to work even if enhancement fails

## Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Check your `.env` file
   - Ensure the API key is correctly formatted
   - Restart the application after making changes

2. **"Enhancement failed" error**
   - Check your internet connection
   - Verify API key has correct permissions
   - Try again after a few minutes

3. **No enhancement happening**
   - Ensure the "Auto-enhance" toggle is enabled
   - Check that you have entered a prompt
   - Verify the API key is properly configured

### Debug Mode

For development, you can enable debug logging by setting:
```env
REACT_APP_DEBUG=true
```

## Future Enhancements

- Support for multiple Gemini models
- Custom system prompts
- Enhancement history
- Batch enhancement capabilities
- Enhancement quality scoring