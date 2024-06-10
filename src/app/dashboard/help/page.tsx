'use client'
import React from "react";
import { useState, useEffect } from "react";
import Image from 'next/image'

interface FAQ {
  id: number;
  question: string;
  response: string;
}

const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [success, setSuccess] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/Question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: question
          }),
        });

        if (res.ok) {
          console.log("FAQ saved successfully");
          setSuccess(true);
        } else {
          console.error("Failed to save Question");
          console.log(question)
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(()=>{
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/FAQ`);
        const data = await res.json();
        setFaqs(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchFaqs()
  },[])

 return (
  <section className="text-gray-600 body-font">
    <div className="container px-2 mx-auto">
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        <div className="text-center mb-4 pt-8">
          <h1 className="text-2xl font-medium  text-gray-900 mb-2">Frequently Asked Questions</h1>
          <p className="leading-relaxed lg:w-3/4 mx-auto">Find answers to commonly asked questions about CRPMP.</p>
        </div>
        <div className="flex justify-center mb-4 px-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-1/2 px-4 py-2 border rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-8 pb-8">
          {filteredFaqs.map((faq, index) => (
            <div key={index}>
              <details className="mb-4">
                <summary className="font-semibold bg-gray-200 rounded-md py-2 px-4">{faq.question}</summary>
                <span className="px-4 py-2">{faq.response}</span>
              </details>
            </div>
          ))}
        </div>
        <div className="text-center mb-8 mt-4 px-8">
          <Image
            src="/assets/questionWoman.jpg"
            alt="Woman asking a question"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h2 className="text-2xl font-medium title-font text-gray-900 mb-3 mt-1">Ask a Question</h2>
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              Your question is submitted successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 mx-auto">
            <div className="mb-1">
              <input
                type="text"
                placeholder="Your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <button type="submit" className="inline-flex text-white bg-indigo-500 border-0 mt-2 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);};


export default FAQ;
