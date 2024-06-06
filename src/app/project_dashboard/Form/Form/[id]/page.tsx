"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type FormFieldType = 'short-text' | 'long-text' | 'select' | 'checkbox' | 'file' | 'date' | 'time';

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
                // Fetch form details
                const formResponse = await fetch(`${apiBaseUrl}/api/Form/SingleForm/${formId}`);
                if (!formResponse.ok) {
                    throw new Error('Failed to fetch form data');
                }
                const formData = await formResponse.json();

                // Fetch form questions
                const questionsResponse = await fetch(`${apiBaseUrl}/api/FormQuestion/QuestionsByFormId/${formData.id}`);
                if (!questionsResponse.ok) {
                    throw new Error('Failed to fetch form questions');
                }
                const questionsData = await questionsResponse.json();

                // Fetch form options for each question
                const questionsWithOptions = await Promise.all(
                    questionsData.map(async (question: any) => {
                        if (question.type === 'select' || question.type === 'checkbox') {
                            const optionsResponse = await fetch(`${apiBaseUrl}/api/FormOption/OptionsByQuestionId/${question.id}`);
                            if (!optionsResponse.ok) {
                                throw new Error('Failed to fetch form options');
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
                console.error('Error fetching form:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [formId]);

    const handleChange = (fieldId: string, value: any) => {
        setFormData(prevState => ({ ...prevState, [fieldId]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formResponse = {
            formId: form?.id,
            answers: form?.fields.map(field => ({
                formQuestionId: field.id,
                response: formData[field.id]
            }))
        };

        try {
            const response = await fetch(`${apiBaseUrl}/api/FormResponse/SubmitForm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formResponse)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            alert('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!form) {
        return <div>Form not found</div>;
    }

    return (
        <div>
            <h1>{form.title}</h1>
            <p>{form.description}</p>
            <form onSubmit={handleSubmit}>
                {form.fields.map((field, index) => (
                    <div key={index} className="form-field">
                        <label>
                            <strong>{field.label}</strong>
                            {field.required && <span style={{ color: 'red' }}>*</span>}
                        </label>
                        <div>
                            {field.type === 'short-text' && (
                                <input
                                    type="text"
                                    required={field.required}
                                    maxLength={field.maxLength}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                />
                            )}
                            {field.type === 'long-text' && (
                                <textarea
                                    required={field.required}
                                    maxLength={field.maxLength}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                ></textarea>
                            )}
                            {field.type === 'select' && (
                                <select
                                    required={field.required}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                >
                                    {field.options?.map((option, idx) => (
                                        <option key={idx} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {field.type === 'checkbox' && (
                                <div>
                                    {field.options?.map((option, idx) => (
                                        <div key={idx}>
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    handleChange(field.id, e.target.checked ? option : null)
                                                }
                                            />
                                            <label>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {field.type === 'file' && (
                                <input
                                    type="file"
                                    required={field.required}
                                    onChange={(e) => handleChange(field.id, e.target.files)}
                                />
                            )}
                            {field.type === 'date' && (
                                <input
                                    type="date"
                                    required={field.required}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                />
                            )}
                            {field.type === 'time' && (
                                <input
                                    type="time"
                                    required={field.required}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                />
                            )}
                        </div>
                        {field.includeComment && <p>{field.comment}</p>}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormPage;
