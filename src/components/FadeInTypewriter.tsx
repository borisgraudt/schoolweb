import { useEffect, useState } from 'react';

export default function FadeInTypewriter({
  text,
  duration = 3000,
  className = '',
  afterDelay = 500,
}: {
  text: string;
  duration?: number;
  className?: string;
  afterDelay?: number;
}) {
  const lines = text.split('\n');
  const totalChars = lines.reduce((acc, line) => acc + line.length, 0);
  const [visible, setVisible] = useState<boolean[]>(Array(totalChars).fill(false));
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVisible(Array(totalChars).fill(false));
    setDone(false);
    if (!text) return;
    // Генерируем случайные задержки для каждой буквы
    const delays = Array.from({ length: totalChars }, () => Math.random());
    const indexes = delays.map((d, i) => [d, i]).sort((a, b) => a[0] - b[0]).map(([_, i]) => i);
    const timeouts: NodeJS.Timeout[] = [];
    indexes.forEach((idx, order) => {
      const t = setTimeout(() => {
        setVisible(v => {
          const arr = [...v];
          arr[idx] = true;
          return arr;
        });
        if (order === indexes.length - 1) {
          setTimeout(() => setDone(true), afterDelay);
        }
      }, Math.floor(delays[idx] * duration));
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [text, duration, afterDelay, totalChars]);

  if (done) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    );
  }

  // Для отображения букв с fade-in по строкам
  let charIndex = 0;
  return (
    <div className={className}>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} style={{ display: 'block' }}>
          {line.split('').map((char, i) => {
            const idx = charIndex;
            charIndex++;
            return (
              <span
                key={i}
                style={{
                  opacity: visible[idx] ? 1 : 0,
                  transition: 'opacity 0.3s',
                  whiteSpace: char === ' ' ? 'pre' : undefined,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
} 