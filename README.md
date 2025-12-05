# 💝 Heartify- Personalized Love Message App

A beautiful, personalized love message application built with React, TypeScript, and Supabase. Send your special someone a unique daily love note with animations and confetti!

![Love Message App](https://img.shields.io/badge/Made%20with-Love-ff69b4)

## ✨ Features

- 🔐 **Password Protected** - Each user has their own secret code
- 💌 **Daily Love Quotes** - Unique quotes fetched from database by date
- 👤 **Personalized Greeting** - Users are greeted by their name
- 🎭 **Animated Characters** - Shuffled and rotating character images
- 🎉 **Confetti Celebration** - Beautiful confetti on successful login
- 📱 **Mobile Responsive** - Looks great on all devices

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase Account](https://supabase.com/) (free tier works!)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/l-message.git
   cd l-message
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Supabase**

   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for your project to be ready
   - Go to **Settings → API** and copy your:
     - Project URL
     - Anon/Public key

4. **Create environment variables**

   Create a `.env` file in the project root:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Set up the database**

   Go to your Supabase project → **SQL Editor** and run:

   ```sql
   -- Create users table (stores password and name)
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     password VARCHAR(255) UNIQUE NOT NULL,
     name VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Create quotes table (stores daily love quotes)
   CREATE TABLE quotes (
     id SERIAL PRIMARY KEY,
     quote TEXT NOT NULL,
     date DATE UNIQUE NOT NULL
   );

   -- Enable Row Level Security (recommended)
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

   -- Create policies to allow read access
   CREATE POLICY "Allow read access to users" ON users FOR SELECT USING (true);
   CREATE POLICY "Allow read access to quotes" ON quotes FOR SELECT USING (true);
   ```

6. **Add sample data**

   ```sql
   -- Add users (customize these!)
   INSERT INTO users (password, name) VALUES
   ('iloveyou', 'Baby'),
   ('sweetheart', 'My Love'),
   ('princess', 'Beautiful'),
   ('myqueen', 'Gorgeous');

   -- Add daily quotes (add more for each day!)
   INSERT INTO quotes (quote, date) VALUES
   ('You are the reason I smile every day 💕', '2025-12-05'),
   ('Every moment with you is a treasure 💖', '2025-12-06'),
   ('You make my heart skip a beat 💗', '2025-12-07'),
   ('I fall for you more every single day 💘', '2025-12-08'),
   ('Being with you feels like home 🏠💕', '2025-12-09'),
   ('You are my today and all of my tomorrows 🌅💕', '2025-12-10'),
   ('Loving you is the best decision I ever made 💖', '2025-12-11'),
   ('You are my favorite notification 📱❤️', '2025-12-12'),
   ('My heart beats your name 💓', '2025-12-13'),
   ('You are the missing piece to my puzzle 🧩❤️', '2025-12-14');
   ```

7. **Start the development server**

   ```bash
   npm run dev
   ```

8. **Open your browser**

   Visit `http://localhost:5173` and enter one of your secret codes!

## 📁 Project Structure

```
l-message/
├── public/
│   └── character/          # Character images
│       ├── one.png
│       ├── two.png
│       ├── three.png
│       ├── four.png
│       ├── five.png
│       ├── six.png
│       └── seven.png
├── src/
│   ├── lib/
│   │   └── supabase.ts     # Supabase client
│   ├── App.tsx             # Main application
│   ├── main.tsx            # Entry point
│   ├── index.css           # Tailwind CSS styles
│   └── vite-env.d.ts       # TypeScript declarations
├── .env                    # Environment variables (create this!)
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Customization

### Adding Your Own Character Images

1. Add your images to `public/character/`
2. Update the `characterImages` array in `App.tsx`:

   ```typescript
   const characterImages = [
     "/character/your-image-1.png",
     "/character/your-image-2.png",
     // Add more...
   ];
   ```

### Changing Colors

Update the color in `App.tsx` and `src/index.css`:

```css
/* src/index.css */
body {
  background-color: #ffc5d3; /* Change this to your color */
}
```

### Adding More Users

In Supabase SQL Editor:

```sql
INSERT INTO users (password, name) VALUES ('secretcode', 'Their Name');
```

### Adding More Quotes

In Supabase SQL Editor:

```sql
INSERT INTO quotes (quote, date) VALUES
('Your love quote here 💕', '2025-12-15');
```

## 🗃️ Database Structure

### Users Table

| Column     | Type         | Description         |
| ---------- | ------------ | ------------------- |
| id         | SERIAL       | Primary key         |
| password   | VARCHAR(255) | Unique secret code  |
| name       | VARCHAR(255) | User's display name |
| created_at | TIMESTAMP    | Creation timestamp  |

### Quotes Table

| Column     | Type      | Description              |
| ---------- | --------- | ------------------------ |
| id         | SERIAL    | Primary key              |
| user_id    | INTEGER   | Reference to users table |
| quote      | TEXT      | The love message         |
| date       | DATE      | Date for this quote      |
| created_at | TIMESTAMP | Creation timestamp       |

### Adding a New User with Quotes

```sql
-- Add a new user
INSERT INTO users (password, name) VALUES ('newpassword', 'Darling');

-- Get the user's ID (check in Supabase Table Editor or use)
-- Then add their personalized quotes
INSERT INTO quotes (user_id, quote, date) VALUES
(4, 'Your first personalized message 💕', '2025-12-05'),
(4, 'Your second personalized message 💖', '2025-12-06'),
(4, 'Your third personalized message 💗', '2025-12-07');
```

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Build Tool:** Vite
- **Effects:** react-confetti, react-use

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "framer-motion": "^11.x",
  "react-confetti": "^6.x",
  "react-use": "^17.x",
  "@supabase/supabase-js": "^2.x",
  "tailwindcss": "^4.x"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and import your repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard
6. Deploy!

## ⚠️ Important Notes

- **Never commit your `.env` file** - It contains sensitive keys
- **Add `.env` to `.gitignore`** - Already done in this template
- **Supabase Row Level Security** - Make sure policies are set correctly
- **HTTPS required** - Use HTTPS in production for security

## 📝 License

MIT License - Feel free to use this for your loved ones! 💕

## 💖 Made with Love

Created to spread love and happiness. Share it with someone special!

---

**Questions?** Open an issue or reach out!
