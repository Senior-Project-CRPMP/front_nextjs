"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { create } from "domain";

type FormFieldType =
  | "short-text"
  | "long-text"
  | "select"
  | "radio"
  | "file"
  | "date"
  | "time";

type FormField = {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options?: { id: string; label: string }[];
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

const SubmitForm: React.FC = () => {
  const params = useParams();
  const formId = params.id;
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<{ [key: string]: any }>({});
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formResponse = await fetch(`${apiBaseUrl}/api/Form/SingleForm/${formId}`);
        if (!formResponse.ok) {
          throw new Error("Failed to fetch form data");
        }
        const formData = await formResponse.json();

        const questionsResponse = await fetch(`${apiBaseUrl}/api/FormQuestion/QuestionsByFormId/${formData.id}`);
        if (!questionsResponse.ok) {
          throw new Error("Failed to fetch form questions");
        }
        const questionsData = await questionsResponse.json();

        const questionsWithOptions = await Promise.all(
          questionsData.map(async (question: any) => {
            if (question.type === "select" || question.type === "radio") {
              const optionsResponse = await fetch(`${apiBaseUrl}/api/FormOption/OptionsByQuestionId/${question.id}`);
              if (!optionsResponse.ok) {
                throw new Error("Failed to fetch form options");
              }
              const optionsData = await optionsResponse.json();
              question.options = optionsData.map((option: any) => ({
                id: option.id,
                label: option.label,
              }));
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
    setResponses({ ...responses, [fieldId]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form) {
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/FormResponse/CreateFormResponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create form response");
      }

      const { formResponseId } = await response.json();

      console.log("createFormResponse: ", formResponseId);

      const formAnswers = await Promise.all(
        form.fields.map(async (field) => {
          const responseValue = responses[field.id];
          const formAnswer = {
            formResponseId,
            formQuestionId: field.id,
            formOptionId: null,
            response: null,
          };

          if (field.type === "radio" || field.type === "select") {
            formAnswer.formOptionId = responseValue;
          } else {
            formAnswer.response = responseValue;
          }

          if (field.type === "file" && responseValue) {
            const formData = new FormData();
            formData.append("formResponseId", formResponseId.toString());
            formData.append("formQuestionId", field.id);
            formData.append("file", responseValue);

            const fileUploadResponse = await fetch(`${apiBaseUrl}/api/FormAnswer/UploadFileAnswer`, {
              method: "POST",
              body: formData,
            });

            if (!fileUploadResponse.ok) {
              const errorText = await fileUploadResponse.text();
              console.error("Failed to upload file answer:", errorText);
              throw new Error("Failed to upload file answer");
            }

            return;
          }

          const createFormAnswer = await fetch(`${apiBaseUrl}/api/FormAnswer/CreateFormAnswer`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formAnswer),
          });

          if (!createFormAnswer.ok) {
            const errorText = await createFormAnswer.text();
            console.error("Failed to create form answer:", errorText);
            throw new Error("Failed to create form answer");
          }
        })
      );

      alert("Form submitted successfully");
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
    <div className="flex justify-center items-center">
      <form className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
        <p className="form-label text-gray-700 font-medium mb-2">{form.description}</p>
        {form.fields.map((field, index) => (
          <div key={index} className="form-field space-y-4">
            <label className="form-box">
              <strong>{field.label}</strong>
              {field.required && <span style={{ color: "red" }}>*</span>}
            </label>
            <div>
              {field.type === "short-text" && (
                <input
                  type="text"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {field.type === "long-text" && (
                <textarea
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                ></textarea>
              )}
              {field.type === "select" && (
                <select
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                >
                  {field.options?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "radio" && (
                <div>
                  {field.options?.map((option) => (
                    <div key={option.id}>
                      <input
                        type="radio"
                        name={field.id}
                        value={option.id}
                        required={field.required}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="mr-2"
                      />
                      <label>{option.label}</label>
                    </div>
                  ))}
                </div>
              )}
              {field.type === "file" && (
                <input
                  type="file"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.files?.[0])}
                />
              )}
              {field.type === "date" && (
                <input
                  type="date"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
              {field.type === "time" && (
                <input
                  type="time"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                  required={field.required}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </div>
            {field.includeComment && <p>{field.comment}</p>}
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
