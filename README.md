# Movie Engine 🎬🤖

**Movie Engine** is a powerful Chrome extension that helps you find your next favorite film and provides deep, AI-powered insights using Google's Gemini API.

## Features

- **Personalized Recommendations**: Input your top 3 favorite movies and rate suggestions to train the engine on your tastes.
- **Ask Movie Engine**: Powered by **Gemini 1.5 Flash**, you can ask specific questions about any recommended movie directly within the extension.
- **Persistent AI Context**: The extension remembers your conversations for each movie during your session.
- **Dynamic Model Selection**: Choose from various Gemini models (Flash, Pro, etc.) based on your API key's availability.
- **Sleek Dark UI**: A modern, premium interface designed for high-quality user experience.

## Installation

1.  Clone this repository or download the source code.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** (top-right toggle).
4.  Click **Load unpacked** and select the `movie-rec-extension` folder.

## Configuration

To use the full features of Movie Engine, you need to provide your API keys in the extension settings:

1.  **TMDB API Key**: Get a free v3 API key from [themoviedb.org](https://www.themoviedb.org/settings/api).
2.  **Gemini API Key**: Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Troubleshooting
- If the AI responses aren't loading, ensure your Gemini API key is valid and has access to the selected model.
- Error messages from the API will be displayed directly in the "Ask Movie Engine" box to help you diagnose issues.

## Technology Stack

- **HTML/CSS/JavaScript**: Core extension logic and UI.
- **Chrome Storage API**: Persisting user sessions and API keys locally.
- **Gemini API**: Generative AI for movie-related queries.
- **TMDB API**: Movie metadata and recommendation engine.

## License

This project is open-source and available under the MIT License.
