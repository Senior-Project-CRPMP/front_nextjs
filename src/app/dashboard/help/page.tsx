'use client'
import React from "react";
import { useState } from "react";
import Image from 'next/image'

const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What is CRPMP?",
      answer: "CRPMP stands for Comprehensive Research and Project Management Platform. It's your ultimate research and project planning platform.",
    },
    {
      question: "How do I sign up?",
      answer: "To sign up, click the 'Get Started' button on the hero section and fill out the registration form.",
    },
    {
      question: "Can I manage multiple projects?",
      answer: "Yes, CRPMP allows you to manage multiple projects efficiently.",
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions.",
    },
    {
      question: "How can I contact support?",
      answer: "You can contact support via email at support@crpmp.com or through our contact form on the website.",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && answer) {
      setFaqs([...faqs, { question, answer }]);
      setQuestion("");
      setAnswer("");
    }
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Find answers to some of the most commonly asked questions about CRPMP.</p>
        </div>
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-1/2 px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="w-full lg:w-1/2 px-4 py-2">
              <details className="mb-4">
                <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4">{faq.question}</summary>
                <span className="px-4 py-2">{faq.answer}</span>
              </details>
            </div>
          ))}
        </div>
        <div className="text-center mb-12">
          <Image
            src="/assets/questionWoman.jpg"
            alt="Woman asking a question"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-medium title-font text-gray-900 mb-4">Ask a Question</h2>
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 mx-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <button type="submit" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};


export default FAQ;
