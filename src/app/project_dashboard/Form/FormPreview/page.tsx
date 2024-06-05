import { useEffect, useState } from 'react';

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

const FormPreview: React.FC<{ formId: string }> = ({ formId }) => {
    const [form, setForm] = useState<Form | null>(null);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchForm = async () => {
            try {
                // Fetch form details
                const formResponse = await fetch(`${apiBaseUrl}/api/Form/GetForm/${formId}`);
                if (!formResponse.ok) {
                    throw new Error('Failed to fetch form data');
                }
                const formData = await formResponse.json();

                // Fetch form questions
                const questionsResponse = await fetch(`${apiBaseUrl}/api/FormQuestion/GetQuestionsByForm/${formId}`);
                if (!questionsResponse.ok) {
                    throw new Error('Failed to fetch form questions');
                }
                const questionsData = await questionsResponse.json();

                // Fetch form options for each question
                const questionsWithOptions = await Promise.all(
                    questionsData.map(async (question: any) => {
                        if (question.type === 'select' || question.type === 'checkbox') {
                            const optionsResponse = await fetch(`${apiBaseUrl}/api/FormOption/GetOptionsByQuestion/${question.id}`);
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
            {form.fields.map((field, index) => (
                <div key={index} className="form-field">
                    <label>
                        <strong>{field.label}</strong>
                        {field.required && <span style={{ color: 'red' }}>*</span>}
                    </label>
                    <div>
                        {field.type === 'short-text' && <input type="text" disabled />}
                        {field.type === 'long-text' && <textarea disabled></textarea>}
                        {field.type === 'select' && (
                            <select disabled>
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
                                        <input type="checkbox" disabled />
                                        <label>{option}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                        {field.type === 'file' && <input type="file" disabled />}
                        {field.type === 'date' && <input type="date" disabled />}
                        {field.type === 'time' && <input type="time" disabled />}
                    </div>
                    {field.includeComment && <p>{field.comment}</p>}
                </div>
            ))}
        </div>
    );
};

export default FormPreview;
