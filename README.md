# Ice Breaker BluePrint

A professional web application that helps users build meaningful connections by generating personalized ice breakers and conversation strategies based on the F.O.R.D. framework (Family, Occupation, Recreation, Dreams).

## Features

- **AI-Powered Ice Breakers**: Generate personalized conversation starters using OpenAI
- **F.O.R.D. Framework**: Based on proven conversation techniques
- **Multiple Scenarios**: Support for networking, sales, dating, and social contexts
- **Professional Design**: Clean, corporate-friendly interface with navy, gray, and white color scheme
- **Real-time Generation**: Instant blueprint creation with actionable recommendations
- **Value-Add Suggestions**: Concrete actions to deepen relationships

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Supabase for data storage
- **AI**: OpenAI GPT-4 for content generation
- **Icons**: React Icons (Feather Icons)
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Supabase URL and anon key
   - Add your OpenAI API key

4. Set up Supabase tables:
   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     full_name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Blueprints table
   CREATE TABLE blueprints (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES users(id),
     user_info TEXT NOT NULL,
     target_info TEXT NOT NULL,
     scenario TEXT NOT NULL,
     blueprint JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Landing Page**: Users sign up with name and email
2. **Dashboard**: Input personal information, target person details, and select scenario
3. **Blueprint Generation**: AI analyzes data and generates personalized strategies
4. **Results**: View ice breakers, discovery questions, and value-add suggestions

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

## Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.jsx
│   ├── BlueprintResults.jsx
│   ├── Dashboard.jsx
│   ├── InfoTooltip.jsx
│   ├── LandingPage.jsx
│   └── SignupModal.jsx
├── config/
│   ├── openai.js
│   └── supabase.js
├── services/
│   └── aiService.js
├── common/
│   └── SafeIcon.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.