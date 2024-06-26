"use client";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "next/navigation";

interface ClipboardLinkProps {
  id: string;
}

const ClipboardLink: React.FC<ClipboardLinkProps> = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    const link = `http://localhost:3000/Form/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }, [id]);

  return (
    <div>
      <a href="#" onClick={(e) => { e.preventDefault(); copyToClipboard(); }}>
        Form Link
      </a>
      {copied && <span style={{ marginLeft: '10px', color: 'green' }}>Link copied to clipboard!</span>}
    </div>
  );
};




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

const FormPreview: React.FC = () => {
  const params = useParams();
  const formId = params.id;
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchForm = async () => {
      try {
        // Fetch form details
        const formResponse = await fetch(
          `${apiBaseUrl}/api/Form/SingleForm/${formId}`
        );
        if (!formResponse.ok) {
          throw new Error("Failed to fetch form data");
        }
        const formData = await formResponse.json();

        // Fetch form questions
        const questionsResponse = await fetch(
          `${apiBaseUrl}/api/FormQuestion/QuestionsByFormId/${formData.id}`
        );
        if (!questionsResponse.ok) {
          throw new Error("Failed to fetch form questions");
        }
        const questionsData = await questionsResponse.json();

        // Fetch form options for each question
        const questionsWithOptions = await Promise.all(
          questionsData.map(async (question: any) => {
            if (question.type === "select" || question.type === "radio") {
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

        // Construct the complete form object
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white mt-16 p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3">
        <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
        <p className="form-label text-gray-700 font-medium mb-2">{form.description} <ClipboardLink id={form.id}/></p>
        {form.fields.map((field, index) => (
          <div key={index} className="form-field space-y-4">
            <label className="form-box">
              <strong>{field.label}</strong>
              {field.required && <span style={{ color: "red" }}>*</span>}
            </label>
            <div>
              {field.type === "short-text" && <input type="text" disabled />}
              {field.type === "long-text" && <textarea disabled></textarea>}
              {field.type === "select" && (
                <select disabled className="border border-gray-300 px-3 py-2 rounded-md w-full">
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "radio" && (
                <div>
                  {field.options?.map((option, idx) => (
                    <div key={idx}>
                      <input type="radio" disabled className="mr-2" />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>
              )}
              {field.type === "file" && <input type="file" disabled />}
              {field.type === "date" && <input type="date" disabled />}
              {field.type === "time" && <input type="time" disabled />}
            </div>
            {field.includeComment && <p>{field.comment}</p>}
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default FormPreview;
