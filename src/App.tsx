import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "./lib/supabase";

// Character images array for shuffling
const characterImages = [
  "/character/one.png",
  "/character/two.png",
  "/character/three.png",
  "/character/four.png",
  "/character/five.png",
  "/character/six.png",
  "/character/seven.png",
];

// Shuffle array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [dailyQuote, setDailyQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  const { width, height } = useWindowSize();

  // Shuffle images on mount
  useEffect(() => {
    setShuffledImages(shuffleArray(characterImages));
  }, []);

  // Preload images
  useEffect(() => {
    characterImages.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, []);

  // Auto-rotate images
  useEffect(() => {
    if (isAuthenticated && shuffledImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % shuffledImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, shuffledImages]);

  // Fetch daily quote from Supabase
  const fetchDailyQuote = async () => {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("quotes")
      .select("quote")
      .eq("date", today)
      .single();

    if (error || !data) {
      // Fallback: get a random quote if no quote for today
      const { data: randomQuote } = await supabase
        .from("quotes")
        .select("quote")
        .limit(1)
        .order("id", { ascending: false });

      return randomQuote?.[0]?.quote || "You are loved more than you know 💕";
    }

    return data.quote;
  };

  // Verify password against Supabase
  const handleCodeSubmit = async () => {
    if (!codeInput.trim()) {
      setError("Please enter a code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { data, error: dbError } = await supabase
        .from("users")
        .select("name")
        .eq("password", codeInput.toLowerCase())
        .single();

      if (dbError || !data) {
        setError("Wrong code, try again cutie you got this!! 😘");
        setIsLoading(false);
        return;
      }

      // Password valid - get user name and daily quote
      setUserName(data.name);
      const quote = await fetchDailyQuote();
      setDailyQuote(quote);
      setIsAuthenticated(true);
      setShowConfetti(true);

      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err) {
      setError("Something went wrong, try again! 💔");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Password Entry Screen
  if (!isAuthenticated) {
    return (
      <div className="bg-[#FFC5D3] min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full"
        >
          <motion.h1
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4"
          >
            💝
          </motion.h1>
          <h2 className="text-2xl font-bold mb-6">Enter the secret code</h2>
          <input
            type="password"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
            placeholder="Type the magic word ..."
            className="w-full py-3 px-4 rounded-xl bg-white text-pink-400 text-center text-lg outline-none mb-4"
            disabled={isLoading}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-white mb-4 font-semibold"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <button
            onClick={handleCodeSubmit}
            disabled={isLoading}
            className="bg-white text-[#FFC5D3] cursor-pointer py-3 text-xl rounded-xl w-full font-semibold disabled:opacity-70"
          >
            {isLoading ? "Checking... 💭" : "Enter 💕"}
          </button>
        </motion.div>

        {/* Footer - moved outside motion.div */}
        <footer className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
          Heartify - Made with 💖 by Peters Joshua
        </footer>
      </div>
    );
  }

  // Main Content - Greeting with Daily Quote
  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="bg-[#FFC5D3] max-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full"
        >
          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-2"
          >
            Hey {userName}! 💖
          </motion.h1>

          {/* Shuffled Character Image */}
          <AnimatePresence mode="wait">
            {shuffledImages.length > 0 && (
              <motion.img
                key={currentImageIndex}
                src={shuffledImages[currentImageIndex]}
                alt="Love character"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.5 }}
                className="w-48 mx-auto my-6"
              />
            )}
          </AnimatePresence>

          {/* Daily Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/20 rounded-2xl p-6 mb-6"
          >
            <h2 className="text-lg font-semibold mb-2">💌 Today's message</h2>
            <p className="text-2xl font-bold">{dailyQuote}</p>
          </motion.div>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/80"
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.p>
          <p className="text-white/80">
            Make sure you come back tommorrow to get a new message 😘
          </p>

          {/* Replay Confetti Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            onClick={() => setShowConfetti(true)}
            className="mt-6 bg-white text-[#FFC5D3] py-3 px-6 text-lg rounded-xl font-semibold"
          >
            More Confetti! 🎉
          </motion.button>
        </motion.div>

        {/* Footer - moved outside motion.div */}
        <footer className="absolute bottom-0 pt-4 mt-4 left-0 right-0 text-center text-black text-sm">
          Heartify - Made with 💖 by Peters Joshua
        </footer>
      </div>
    </>
  );
}

export default App;
