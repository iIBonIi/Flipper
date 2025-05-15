import { useState } from 'react';
import OpenAI from 'openai';

interface AIPanelProps {
  text: string;
  onResult: (result: string) => void;
}

export default function AIPanel({ text, onResult }: AIPanelProps) {
  const [prompt, setPrompt] = useState('Перепиши этот текст более профессионально:');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: `${prompt}\n\n"${text}"`,
        max_tokens: 200,
      });

      const result = response.choices[0]?.text || '';
      onResult(result);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось получить ответ от ИИ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-panel">
      <h4>Orca AI</h4>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Введите команду для ИИ"
      />
      <button onClick={generate} disabled={loading}>
        {loading ? 'Генерация...' : 'Запросить Orca AI'}
      </button>
    </div>
  );
}