import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const track = async () => {
  console.log("Tracked!");
};

// Array of love messages (acts as our "API")
const loveMessages = [
  "You are the reason I smile every day 💕",
  "Every moment with you is a treasure 💖",
  "You make my heart skip a beat 💗",
  "I fall for you more every single day 💘",
  "You're my favorite notification 📱❤️",
  "Being with you feels like home 🏠💕",
  "You're the missing piece to my puzzle 🧩❤️",
  "My heart beats your name 💓",
  "You're my today and all of my tomorrows 🌅💕",
  "Loving you is the best decision I ever made 💖",
];

// Get a "daily" message based on the date
const getDailyLoveMessage = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return loveMessages[dayOfYear % loveMessages.length];
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");
  const [dailyMessage, setDailyMessage] = useState("");
  const [showMainContent, setShowMainContent] = useState(false);

  const secretCode = import.meta.env.VITE_SECRET_CODE;

  const handleCodeSubmit = () => {
    if (codeInput.toLowerCase() === secretCode.toLowerCase()) {
      setIsAuthenticated(true);
      setDailyMessage(getDailyLoveMessage());
      setError("");
    } else {
      setError("Wrong code, try again cutie! 😘");
    }
  };

  const steps = [
    {
      content: "Heyyyyy, pretty girl.",
      image: "/character/one.png",
    },
    {
      content: `Hey , recently, we met.
      And somehow, you've been on my mind ever since.
      `,
      image: "/character/two.png",
    },
    {
      content: `Then we went on our first date And I realized—yep, I want this girl.
      `,
      image: "/character/three.png",
    },
    {
      content: `You're beautiful, you're smart, you're fun,
and you make spending time together feel too short.`,
      image: "/character/four.png",
    },
    {
      content: `I look forward to when I'll see you again,
hold your hands, and look into your pretty eyes ❤.`,
      image: "/character/five.png",
    },
    {
      content: "So now I've got a question for you…",
      image: "/character/six.png",
    },
    {
      content: "Will you be my Valentine?",
      image: "/character/seven.png",
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [sheWantsToBeMyValentine, setSheWantsToBeMyValentine] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const imagePaths = [
      ...steps.map((step) => step.image),
      "/character/yayyyy.png",
    ];

    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, []);

  // Password Entry Screen
  if (!isAuthenticated) {
    return (
      <div className="bg-[#FFC5D3] min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-2">🔐</h1>
          <h2 className="text-2xl font-bold mb-6">Enter the secret code</h2>
          <input
            type="password"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCodeSubmit()}
            placeholder="Type the magic word..."
            className="w-full py-3 px-4 rounded-xl text-[#FFC5D3] text-center text-lg outline-none mb-4"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white mb-4"
            >
              {error}
            </motion.p>
          )}
          <button
            onClick={handleCodeSubmit}
            className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full font-semibold"
          >
            Enter 💕
          </button>
        </motion.div>
      </div>
    );
  }

  // Daily Love Message Screen
  if (!showMainContent) {
    return (
      <div className="bg-[#FFC5D3] min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl mb-4">💌</h1>
          <h2 className="text-xl font-bold mb-2">Today's Love Note</h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold mb-8 px-4"
          >
            {dailyMessage}
          </motion.p>
          <button
            onClick={() => setShowMainContent(true)}
            className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full font-semibold"
          >
            Continue 💖
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {sheWantsToBeMyValentine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti width={width} height={height} />
          <div className="fixed top-0 left-0 w-full h-full bg-[#FFC5D3] flex flex-col items-center justify-center">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-4xl font-bold"
            >
              Yayyyyyyy!!!!!
            </motion.h1>
            <img
              src="/character/yayyyy.png"
              alt=""
              className="w-40 animate-bounce"
            />
          </div>
        </motion.div>
      )}
      <div className="bg-[#FFC5D3] min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
        <motion.img
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={steps[currentStep].image}
          alt=""
          className="w-40"
        />
        <motion.div
          key={currentStep + "-text"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-josefin text-4xl font-bold"
        >
          {steps[currentStep].content}
        </motion.div>

        {currentStep < 6 && (
          <>
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Next
            </button>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold opacity-90"
              >
                Back
              </button>
            )}
          </>
        )}
        {currentStep === 6 && (
          <>
            <button
              onClick={async () => {
                setSheWantsToBeMyValentine(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Yes
            </button>

            <button
              onClick={async () => {
                setSheWantsToBeMyValentine(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold"
            >
              Yes
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
