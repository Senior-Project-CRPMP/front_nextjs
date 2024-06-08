"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type FormFieldType =
  | "short-text"
  | "long-text"
  | "select"
  | "checkbox"
  | "file"
  | "date"
  | "time";

type FormField = {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options?: string[];
  includeComment?: boolean;
  comment?: string;
  maxLength?: number;
  maxUploadSize?: number;
  allowedTypes?: string[];
};

type Form = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
};

const FormPage: React.FC = () => {
  const params = useParams();
  const formId = params.id;
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formResponse = await fetch(
          `${apiBaseUrl}/api/Form/SingleForm/${formId}`
        );
        if (!formResponse.ok) {
          throw new Error("Failed to fetch form data");
        }
        const formData = await formResponse.json();

        const questionsResponse = await fetch(
          `${apiBaseUrl}/api/FormQuestion/QuestionsByFormId/${formData.id}`
        );
        if (!questionsResponse.ok) {
          throw new Error("Failed to fetch form questions");
        }
        const questionsData = await questionsResponse.json();

        const questionsWithOptions = await Promise.all(
          questionsData.map(async (question: any) => {
            if (
              question.type === "select" ||
              question.type === "checkbox" ||
              question.type === "radio"
            ) {
              const optionsResponse = await fetch(
                `${apiBaseUrl}/api/FormOption/OptionsByQuestionId/${question.id}`
              );
              if (!optionsResponse.ok) {
                throw new Error("Failed to fetch form options");
              }
              const optionsData = await optionsResponse.json();
              question.options = optionsData.map((option: any) => option.label);
            }
            return question;
          })
        );

        const formWithFields = {
          ...formData,
          fields: questionsWithOptions,
        };

        setForm(formWithFields);
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prevState) => ({ ...prevState, [fieldId]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formResponse = {
      formId: form?.id,
      answers: form?.fields.map((field) => ({
        formQuestionId: field.id,
        response: formData[field.id],
      })),
    };

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/FormResponse/SubmitForm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formResponse),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
        <p className="form-label text-gray-700 font-medium mb-2">{form.description}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {form.fields.map((field, index) => (
            <div key={index} className="form-field">
              <label className="form-box">
                <strong>{field.label}</strong>
                {field.required && <span style={{ color: "red" }}>*</span>}
              </label>
              <div>
                {field.type === "short-text" && (
                  <input
                    type="text"
                    required={field.required}
                    maxLength={field.maxLength}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
                {field.type === "long-text" && (
                  <textarea
                    required={field.required}
                    maxLength={field.maxLength}
                    onChange={(e) => handleChange(field.id, e.target.value)}
    className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"

                  ></textarea>
                )}
                {field.type === "select" && (
                  <select
                    required={field.required}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                     className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  >
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "checkbox" && (
                  <div>
                    {field.options?.map((option, idx) => (
                      <div key={idx}>
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleChange(
                              field.id,
                              e.target.checked ? option : null
                            )
                          }
                          className="mr-2 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"

                        />
                        <label className="form-box">{option}</label>
                      </div>
                    ))}
                  </div>
                )}
                {field.type === "file" && (
                  <input
                    type="file"
                    required={field.required}
                    onChange={(e) => handleChange(field.id, e.target.files)}
                    className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
                {field.type === "date" && (
                  <input
                    type="date"
                    required={field.required}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
                {field.type === "time" && (
                  <input
                    type="time"
                    required={field.required}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="form-input bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
              {field.includeComment && <p>{field.comment}</p>}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
