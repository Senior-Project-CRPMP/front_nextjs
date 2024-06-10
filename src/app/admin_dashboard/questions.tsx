'use client'
import React, { useEffect, useState } from "react";

interface Question {
  id: number;
  content: string;
}

interface FAQ {
  id: number;
  question: string;
  response: string;
}

function QuestionComponent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [response, setResponse] = useState<string>("");
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Question`);
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/FAQ`);
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
    fetchFaqs();
  }, []);

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
    setResponse("");
  };

  const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.target.value);
  };

  const fetchFaqs = async () => { // Define fetchFaqs outside of useEffect
    try {
      const res = await fetch(`${apiBaseUrl}/api/FAQ`);
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (selectedQuestion) {
      const faq: Omit<FAQ, 'id'> = {
        question: selectedQuestion.content,
        response: response
      };

      try {
        const res = await fetch(`${apiBaseUrl}/api/FAQ`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(faq),
        });

        if (res.ok) {
          console.log("FAQ saved successfully");
          setSelectedQuestion(null);
          setResponse("");
          // Update the FAQ list
          fetchFaqs();
        } else {
          console.error("Failed to save FAQ");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/Question/${questionId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        console.log("Question deleted successfully");
        // Update the question list
        setQuestions(questions.filter(q => q.id !== questionId));
      } else {
        console.error("Failed to delete question");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-gray-100 my-2">
      <div className="px-4 sm:px-8 pt-4">
        <h1 className="font-bold mb-4">Questions</h1>
        <div className="border border-gray-200 rounded overflow-hidden shadow-md">
          {questions.map((q) => {
            const faq = faqs.find(f => f.question === q.content);
            return (
              <div
                key={q.id}
                className="w-full px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => handleQuestionClick(q)}
              >
                <div className="flex justify-between items-center">
                  <div>{q.content}</div>
                  {faq && (
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-all duration-300 ease-in-out"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the question click handler
                        handleDeleteQuestion(q.id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedQuestion && (
        <div className="px-4 sm:px-8 pt-4">
          <h2 className="font-bold mb-2">Respond to: {selectedQuestion.content}</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-2"
            rows={4}
            value={response}
            onChange={handleResponseChange}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionComponent;
