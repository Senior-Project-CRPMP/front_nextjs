'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

type FormFieldType =
  | 'short-text'
  | 'long-text'
  | 'select'
  | 'radio'
  | 'file'
  | 'date'
  | 'time';

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
  formAnswers?: string[];
  optionCounts?: { option: string; count: number }[];
};

type FormAnswerField = {
  id: number;
  formResponseId: number;
  formQuestionId: number;
  formOptionId: number;
  response: string;
};

type Form = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  formAnswerFields: FormAnswerField[];
};

type FormAnswer = {
  id: string;
  formResponseId: number;
  formQuestionId: number;
  formOptionId: number;
  response: string;
};

const chartSetting = {
  yAxis: [
    {
      label: 'Count',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value: number | null) => `${value}`;

const ViewFormData: React.FC = () => {
  const params = useParams();
  const formId = params.id;
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchForm = async () => {
      try {
        // Fetch form details
        const formResponse = await fetch(
          `${apiBaseUrl}/api/Form/SingleForm/${formId}`
        );
        if (!formResponse.ok) {
          throw new Error('Failed to fetch form data');
        }
        const formData: Form = await formResponse.json();

        // Fetch form questions
        const questionsResponse = await fetch(
          `${apiBaseUrl}/api/FormQuestion/QuestionsByFormId/${formData.id}`
        );
        if (!questionsResponse.ok) {
          throw new Error('Failed to fetch form questions');
        }
        const questionsData = await questionsResponse.json();

        // Fetch form options and answers for each question
        const questionsWithOptionsAndAnswers = await Promise.all(
          questionsData.map(async (question: FormField) => {
            if (question.type === 'select' || question.type === 'radio') {
              const optionsResponse = await fetch(
                `${apiBaseUrl}/api/FormOption/OptionsByQuestionId/${question.id}`
              );
              if (!optionsResponse.ok) {
                throw new Error('Failed to fetch form options');
              }
              const optionsData = await optionsResponse.json();

              // Fetch counts for each option
              const optionsWithCounts = await Promise.all(
                optionsData.map(async (option: any) => {
                  const countResponse = await fetch(
                    `${apiBaseUrl}/api/FormAnswer/FormAnswerCountByOptionId/${option.id}`
                  );
                  if (!countResponse.ok) {
                    throw new Error('Failed to fetch option count');
                  }
                  const countData = await countResponse.json();
                  return { option: option.label, count: countData };
                })
              );

              question.options = optionsData.map((option: any) => option.label);
              question.optionCounts = optionsWithCounts;
            }

            const formAnswerResponse = await fetch(
              `${apiBaseUrl}/api/FormAnswer/FormAnswersByQuestionId/${question.id}`
            );
            if (!formAnswerResponse.ok) {
              throw new Error('Failed to fetch form answers');
            }
            const formAnswerData = await formAnswerResponse.json();
            question.formAnswers = formAnswerData.map((formAnswer: any) => formAnswer.response);

            return question;
          })
        );

        // Construct the complete form object
        const formWithFields: Form = {
          ...formData,
          fields: questionsWithOptionsAndAnswers,
        };

        setForm(formWithFields);

        // Prepare data for bar chart
        const chartData = formWithFields.fields
          .filter((field: FormField) => field.type === 'select' || field.type === 'radio')
          .flatMap((field: FormField) =>
            field.optionCounts?.map((optionCount: { option: string; count: number }) => ({
              question: field.label,
              option: optionCount.option,
              count: optionCount.count,
            })) || []
          );

        setBarChartData(chartData);

      } catch (error) {
        console.error('Error fetching form:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId, apiBaseUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3 mb-8">
        <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
        <p className="form-label text-gray-700 font-medium mb-2">{form.description}</p>
        {form.fields.map((field: FormField, index: number) => (
          <div key={index} className="form-field space-y-4">
            <label className="form-box">
              <strong>{field.label}</strong>
              {field.required && <span style={{ color: 'red' }}>*</span>}
            </label>
            <div>
              {field.type === 'short-text' && (
                <select disabled className="border border-gray-300 px-3 py-2 rounded-md w-full">
                  {field.formAnswers?.map((answer, idx) => (
                    <option key={idx} value={answer}>
                      {answer}
                    </option>
                  ))}
                </select>
              )}
              {field.type === 'long-text' && (
                <select disabled className="border border-gray-300 px-3 py-2 rounded-md w-full">
                  {field.formAnswers?.map((answer, idx) => (
                    <option key={idx} value={answer}>
                      {answer}
                    </option>
                  ))}
                </select>
              )}
              {field.type === 'select' && (
                <select disabled className="border border-gray-300 px-3 py-2 rounded-md w-full">
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === 'radio' && (
                <div>
                  {field.options?.map((option, idx) => (
                    <div key={idx}>
                      <input type="radio" disabled className="mr-2" />
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
      <div className="w-full md:w-3/4 lg:w-2/3">
        <h2 className="text-xl font-bold mb-4">Selected Values Count</h2>
        <BarChart
          dataset={barChartData}
          xAxis={[{ scaleType: 'band', dataKey: 'option' }]}
          series={[{ dataKey: 'count', label: 'Count', valueFormatter }]}
          {...chartSetting}
        />
      </div>
    </div>
  );
};

export default ViewFormData;
