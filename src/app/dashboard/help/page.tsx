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
                <span className="px-4 py-2">{faq.response}</span>
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
