"use client";
import { Application } from "pixi.js";
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import "./quiz-game.css";
import {
  addMountains,
  addSun,
  addTrain,
  addSmokes,
  addGround,
  createCelebrationEffect,
} from "./helper";
import {
  useLazyGetQuestionsQuery,
  useCheckAnswerMutation,
} from "../../redux/quizApi";
import Image from "next/image";

export default function page() {
  const router = useRouter();
  const containerRef = useRef(null);
  const trainRef = useRef(null);
  const appRef = useRef(null);
  const trainTargetX = useRef(0);
  const [quizState, setQuizState] = useState("ready"); // 'ready', 'playing', 'finished'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSelectedAnswerCorrect, setIsSelectedAnswerCorrect] = useState(null);

  // Animation control refs
  const groundAnimationRef = useRef(null);
  const trainAnimationRef = useRef(null);
  const smokesRef = useRef(null);
  const smokeCleanupRef = useRef(null);
  const celebrationRef = useRef(null);

  // Sound refs
  const trainSoundRef = useRef(null);
  const celebrationSoundRef = useRef(null);
  const audioContextRef = useRef(null);

  // 1. Add hardcoded categories
  const categories = ["الأرقام", "الألوان", "الحيوانات", "الفواكه", "الوظائف"];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [
    triggerGetQuestions,
    {
      data: questionsData,
      isLoading: questionsLoading,
      isError: questionsError,
    },
  ] = useLazyGetQuestionsQuery();
  const [checkAnswer, { isLoading: checkAnswerLoading }] =
    useCheckAnswerMutation();
  const [questions, setQuestions] = useState([]);

  const threshold = 3; // Minimum correct answers to pass

  const questionText = () => {
    switch (selectedCategory) {
      case "الأرقام":
        return "ما الرقم اللذي في الصورة";
      case "الألوان":
        return "ما اللون اللذي في الصورة";
      case "الحيوانات":
        return "ما الحيوان اللذي في الصورة";
      case "الفواكه":
        return "ما الفاكهة اللتي في الصورة";
      case "الوظائف":
        return "ما الوظيفة اللتي في الصورة";
      default:
        return "ما السؤال اللذي في الصورة";
    }
  };

  // Initialize audio context and train sound
  useEffect(() => {
    // Initialize audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    // Create train whistle sound using custom audio file
    const createTrainBeep = () => {
      if (!soundEnabled) return;

      const audio = new Audio("/assets/train-whistle.mp3");
      audio.volume = 0.3; // 30% volume
      audio.play().catch((error) => {
        console.log("Audio play failed:", error);
        // Fallback to generated sound if custom sound fails
        if (audioContextRef.current) {
          const audioContext = audioContextRef.current;
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          // Train horn sound (two tones)
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(
            300,
            audioContext.currentTime + 0.1
          );
          oscillator.frequency.setValueAtTime(
            400,
            audioContext.currentTime + 0.2
          );

          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.5
          );

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
        }
      });
    };

    // Create celebration sound
    const createCelebrationSound = () => {
      if (!soundEnabled || !audioContextRef.current) return;

      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Play a celebratory chord (C major: C, E, G)
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      const currentTime = audioContext.currentTime;

      frequencies.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.setValueAtTime(freq, currentTime);
        gain.gain.setValueAtTime(0.1, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, currentTime + 1.5);

        osc.start(currentTime + index * 0.1);
        osc.stop(currentTime + 1.5);
      });
    };

    trainSoundRef.current = createTrainBeep;
    celebrationSoundRef.current = createCelebrationSound;
  }, [soundEnabled]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (quizState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (quizState === "playing" && timeLeft === 0) {
      // Time's up - show correct answer
      setShowCorrectAnswer(true);
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [quizState, timeLeft]);

  // Fetch questions when category is selected
  useEffect(() => {
    if (selectedCategory) {
      triggerGetQuestions({ size: 10, category: selectedCategory });
    }
  }, [selectedCategory, triggerGetQuestions]);

  // Update questions state when questionsData changes
  useEffect(() => {
    if (questionsData && questionsData.data) {
      setQuestions(
        questionsData.data.map((q) => ({
          ...q,
          id: q._id,
          choices: q.options || [],
        }))
      );
    }
  }, [questionsData]);

  const startQuiz = () => {
    if (!questions || questions.length === 0) return;
    setQuizState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setCorrectCount(0);
    setShouldAnimate(false);
    trainTargetX.current = 0;
    if (trainRef.current) trainRef.current.x = 0;

    // Play train sound when quiz starts
    if (trainSoundRef.current && soundEnabled) {
      trainSoundRef.current();
    }

    // Stop all animations
    if (groundAnimationRef.current) {
      groundAnimationRef.current.stopGroundAnimation();
    }
    if (trainAnimationRef.current) {
      trainAnimationRef.current.stopTrainAnimation();
      trainAnimationRef.current.stopWheelAnimation();
    }

    // Don't clean up smokes when starting quiz - they should stay visible
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  // 3. Update answer checking to use API
  const handleAnswerSelect = async (answerIndex) => {
    if (selectedAnswer !== null || showCorrectAnswer) return;
    setSelectedAnswer(answerIndex);
    const question = questions[currentQuestion];
    try {
      const data = await checkAnswer({
        questionId: question.id,
        answer: question.choices[answerIndex],
      }).unwrap();
      const isCorrect = data.correct || false;
      setIsSelectedAnswerCorrect(isCorrect);
      setShowCorrectAnswer(true);
      if (isCorrect) {
        setScore((prev) => prev + 1);
        setCorrectCount((prev) => {
          const newCount = prev + 1;
          moveTrain(newCount);
          return newCount;
        });
        setShouldAnimate(true);
        if (trainSoundRef.current) trainSoundRef.current();
        if (groundAnimationRef.current) {
          groundAnimationRef.current.startGroundAnimation();
        }
        if (trainAnimationRef.current) {
          trainAnimationRef.current.startTrainAnimation();
          trainAnimationRef.current.startWheelAnimation();
        }
      }
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    } catch (err) {
      setIsSelectedAnswerCorrect(false);
      setShowCorrectAnswer(true);
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      setIsSelectedAnswerCorrect(null);
      // Stop animations for next question
      setShouldAnimate(false);

      // Stop ground and train animations
      if (groundAnimationRef.current) {
        groundAnimationRef.current.stopGroundAnimation();
      }
      if (trainAnimationRef.current) {
        trainAnimationRef.current.stopTrainAnimation();
        trainAnimationRef.current.stopWheelAnimation();
      }
    } else {
      // Quiz finished - move train outside window regardless of score
      setQuizState("finished");
      setShouldAnimate(false);

      // Play longer train sound when game ends
      if (trainSoundRef.current && soundEnabled) {
        // Play the sound twice for a longer effect
        trainSoundRef.current();
        setTimeout(() => {
          if (soundEnabled) trainSoundRef.current();
        }, 600);
      }

      // Trigger celebration effect if user passed the quiz
      if (score >= threshold && appRef.current) {
        celebrationRef.current = createCelebrationEffect(appRef.current);
        // Play celebration sound
        if (celebrationSoundRef.current) {
          celebrationSoundRef.current();
        }
      }

      // Move train outside the window
      if (trainRef.current && appRef.current) {
        const train = trainRef.current;
        const trainWidth = train.width * train.scale.x;
        const appWidth = appRef.current.screen.width;
        trainTargetX.current = appWidth + trainWidth;
      }

      // Stop all animations
      if (groundAnimationRef.current) {
        groundAnimationRef.current.stopGroundAnimation();
      }
      if (trainAnimationRef.current) {
        trainAnimationRef.current.stopTrainAnimation();
        trainAnimationRef.current.stopWheelAnimation();
      }
    }
  };

  const resetQuiz = () => {
    setQuizState("ready");
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
    setCorrectCount(0);
    setShouldAnimate(false);
    setIsSelectedAnswerCorrect(null);
    setSelectedCategory(null);
    trainTargetX.current = 0;
    if (trainRef.current) trainRef.current.x = 0;

    // Stop all animations
    if (groundAnimationRef.current) {
      groundAnimationRef.current.stopGroundAnimation();
    }
    if (trainAnimationRef.current) {
      trainAnimationRef.current.stopTrainAnimation();
      trainAnimationRef.current.stopWheelAnimation();
    }

    // Clean up celebration effect
    if (celebrationRef.current) {
      celebrationRef.current.cleanupCelebration();
      celebrationRef.current = null;
    }

    // Don't clean up smokes when resetting - they should stay visible
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const headerHeight = 60;
    const availableHeight = viewportHeight - headerHeight;

    const app = new Application();
    let sunGraphics = null;
    let mountainGroups = [];

    (async () => {
      await app.init({
        background: "#ffffff",
        width: viewportWidth,
        height: availableHeight,
        resolution: 1,
        autoDensity: false,
        antialias: true,
      });

      app.canvas.style.width = `${viewportWidth}px`;
      app.canvas.style.height = `${availableHeight}px`;
      app.canvas.style.maxWidth = "100%";
      app.canvas.style.maxHeight = "100%";
      app.canvas.style.display = "block";
      app.canvas.style.position = "absolute";
      app.canvas.style.top = "0";
      app.canvas.style.left = "0";
      app.canvas.style.zIndex = "-1";

      container.appendChild(app.canvas);
      mountainGroups = addMountains(app);
      sunGraphics = await addSun(app);
      groundAnimationRef.current = addGround(app);
      trainAnimationRef.current = addTrain(app);
      trainRef.current = trainAnimationRef.current.container;

      // Add a small delay to ensure train is properly positioned before creating smokes
      setTimeout(() => {
        console.log("Creating initial smokes...");
        const smokeResult = addSmokes(app, trainRef.current);
        smokesRef.current = smokeResult.groups;
        smokeCleanupRef.current = smokeResult.cleanupSmokes;
        console.log("Smokes created:", smokesRef.current);
      }, 100);

      app.ticker.add(() => {
        if (trainRef.current) {
          // Smoothly move train.x toward trainTargetX.current
          const speed = 0.01; // 0 < speed <= 1, higher is faster - made slower
          trainRef.current.x +=
            (trainTargetX.current - trainRef.current.x) * speed;
          // Optionally, snap to target if very close
          if (Math.abs(trainRef.current.x - trainTargetX.current) < 1) {
            trainRef.current.x = trainTargetX.current;
          }
        }
      });

      const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const newAvailableHeight = newHeight - headerHeight;

        app.renderer.resize(newWidth, newAvailableHeight);
        app.canvas.style.width = `${newWidth}px`;
        app.canvas.style.height = `${newAvailableHeight}px`;

        // Remove old mountains
        mountainGroups.forEach((group) => {
          if (group && group.parent) {
            group.parent.removeChild(group);
          }
        });

        // Clear the stage and recreate everything in proper order
        app.stage.removeChildren();

        // Add elements back in proper layering order (back to front)
        mountainGroups = addMountains(app);

        // Recreate sun (async)
        (async () => {
          sunGraphics = await addSun(app);
        })();

        // Recreate ground
        groundAnimationRef.current = addGround(app);

        // Recreate train
        trainAnimationRef.current = addTrain(app);
        trainRef.current = trainAnimationRef.current.container;

        // Recreate smokes with delay to ensure proper positioning
        setTimeout(() => {
          const smokeResult = addSmokes(app, trainRef.current);
          smokesRef.current = smokeResult.groups;
          smokeCleanupRef.current = smokeResult.cleanupSmokes;
        }, 100);

        // Recalculate train target position for new screen size
        if (correctCount > 0) {
          moveTrain(correctCount);
        }
      };

      window.addEventListener("resize", handleResize);

      appRef.current = app;

      return () => {
        window.removeEventListener("resize", handleResize);
        if (app) {
          // Clean up smokes before destroying app
          if (smokeCleanupRef.current) {
            smokeCleanupRef.current();
          }
          // Clean up celebration effect
          if (celebrationRef.current) {
            celebrationRef.current.cleanupCelebration();
          }
          app.destroy(true);
        }
      };
    })();
  }, []);

  const memoizedImage = useMemo(() => {
    if (!questions.length) return null;
    const question = questions[currentQuestion];
    return (
      <Image
        key={question._id}
        src={question.image}
        alt="صورة السؤال"
        width={300}
        height={200}
        placeholder="blur"
        blurDataURL="/assets/images/placeholder.png"
        objectFit="contain"
        onError={(e) => {
          e.target.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='150' y='100' text-anchor='middle' fill='%23999' font-size='16'%3Eصورة السؤال%3C/text%3E%3C/svg%3E";
        }}
      />
    );
  }, [questions, currentQuestion]);

  const renderQuizContent = () => {
    // Sound control button (always visible)
    const soundButton = (
      <button
        className="sound-button"
        onClick={toggleSound}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: soundEnabled ? "#4CAF50" : "#f44336",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        {soundEnabled ? "🔊" : "🔇"}
      </button>
    );

    if (quizState === "ready") {
      if (!selectedCategory) {
        // Improved category selection UI
        const categoryIcons = {
          الأرقام: "🔢",
          الألوان: "🎨",
          الحيوانات: "🐾",
          الفواكه: "🍎",
          الوظائف: "💼",
        };
        return (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#f7f7fa",
            }}
          >
            <h2
              style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 8 }}
            >
              اختر الفئة لبدء اللعبة
            </h2>
            <p style={{ color: "#666", marginBottom: 32 }}>
              يرجى اختيار نوع الأسئلة التي تود اللعب بها
            </p>
            <div className="categories-container">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: "#fff",
                    border: "2px solid #e0e0e0",
                    borderRadius: 16,
                    padding: "32px 8px",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "box-shadow 0.2s, border 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.border = "2px solid #a0a0ff")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.border = "2px solid #e0e0e0")
                  }
                >
                  <span style={{ fontSize: "2.5rem", marginBottom: 12 }}>
                    {categoryIcons[cat]}
                  </span>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        );
      }
      if (questionsLoading) {
        // Modern spinner loading UI
        return (
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <style>{`
              .quiz-spinner {
                border: 6px solid #f3f3f3;
                border-top: 6px solid #6c63ff;
                border-radius: 50%;
                width: 56px;
                height: 56px;
                animation: spin 1s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <div className="quiz-spinner" style={{ marginBottom: 24 }}></div>
            <div style={{ fontSize: "1.2rem", color: "#555", fontWeight: 500 }}>
              جاري تحميل الأسئلة، يرجى الانتظار...
            </div>
          </div>
        );
      }
      if (questionsError) {
        return <div>فشل تحميل الأسئلة. حاول مرة أخرى.</div>;
      }
      if (questions.length === 0) {
        return <div>لا توجد أسئلة متاحة لهذه الفئة.</div>;
      }
      return (
        <div className="quiz-overlay">
          {soundButton}
          <div className="quiz-container">
            <h1 className="quiz-title">لعبة الأسئلة</h1>
            <p className="quiz-description">
              اختبر معلوماتك! ستحصل على 30 ثانية لكل سؤال
            </p>
            <div className="button-group">
              <button className="start-button" onClick={startQuiz}>
                ابدأ اللعبة
              </button>
              <button
                className="return-home-button"
                onClick={() => router.push("./Quiz-Game-Landing")}
              >
                الرجوع
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (quizState === "playing") {
      const question = questions[currentQuestion];
      return (
        <div className="quiz-overlay">
          {soundButton}
          <div className="quiz-container">
            <div className="quiz-header">
              <div className="question-counter">
                السؤال {currentQuestion + 1} من {questions.length}
              </div>
              <div className={`timer ${timeLeft <= 10 ? "warning" : "normal"}`}>
                الوقت المتبقي: {timeLeft} ثانية
              </div>
            </div>

            <div className="question-image">
              <div className="question-image-container">{memoizedImage}</div>
            </div>

            <div className="question-text">{questionText()}</div>

            <div className="choices-container">
              {Array.isArray(question.choices) ? (
                question.choices.map((choice, index) => (
                  <button
                    key={index}
                    className={`choice-button ${
                      selectedAnswer === index
                        ? isSelectedAnswerCorrect === null
                          ? ""
                          : isSelectedAnswerCorrect
                          ? "correct"
                          : "incorrect"
                        : ""
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    {choice}
                  </button>
                ))
              ) : (
                <div
                  style={{ color: "#c00", fontWeight: 500, margin: "16px 0" }}
                >
                  لا توجد اختيارات متاحة لهذا السؤال.
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (quizState === "finished") {
      const isSuccess = score >= threshold;
      return (
        <div className="quiz-overlay">
          {soundButton}
          <div className="quiz-container">
            <h1 className="quiz-title">انتهت اللعبة!</h1>
            <div className="score-display">
              <p>
                النتيجة: {score} من {questions.length}
              </p>
              <p className={isSuccess ? "success" : "failure"}>
                {isSuccess ? "مبروك! لقد نجحت!" : "حاول مرة أخرى"}
              </p>
            </div>
            <div className="button-group">
              <button className="restart-button" onClick={resetQuiz}>
                اختر فئة جديدة
              </button>
              <button
                className="return-home-button"
                onClick={() => router.push("./Quiz-Game-Landing")}
              >
                الرجوع
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  function moveTrain(correctCount) {
    if (!trainRef.current || !appRef.current) return;
    const train = trainRef.current;
    const numQuestions = questions.length;
    const trainWidth = train.width * train.scale.x;
    const appWidth = appRef.current.screen.width;

    // If all questions are answered correctly, move train outside the window
    if (correctCount === numQuestions) {
      trainTargetX.current = appWidth + trainWidth;
    } else {
      // Calculate step size for normal progression
      const maxX = appWidth - trainWidth;
      const step = maxX / (numQuestions - 1);
      trainTargetX.current = step * correctCount; // Remove the -1 to start moving on first correct answer
    }
  }

  // function recreateSmokes() {
  //   if (!appRef.current || !trainRef.current) return;

  //   // Clean up old smokes
  //   if (smokeCleanupRef.current) {
  //     smokeCleanupRef.current();
  //   }

  //   // Create new smokes with delay to ensure proper positioning
  //   setTimeout(() => {
  //     const smokeResult = addSmokes(appRef.current, trainRef.current);
  //     smokesRef.current = smokeResult.groups;
  //     smokeCleanupRef.current = smokeResult.cleanupSmokes;
  //   }, 100);
  // }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "calc(100vh - 60px)",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        position: "absolute",
        top: "60px",
        left: 0,
        right: 0,
        bottom: 0,
        display: "block",
        maxWidth: "100vw",
        maxHeight: "calc(100vh - 60px)",
      }}
    >
      {renderQuizContent()}
    </div>
  );
}
