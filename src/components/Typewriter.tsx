import { useEffect, useState } from 'react';

interface TypewriterProps {
  text: string[];
  speed?: number;
  pauseAfterDot?: number;
  className?: string;
}

export default function Typewriter({ text, speed = 18, pauseAfterDot = 400, className = '' }: TypewriterProps) {
  if (!Array.isArray(text) || text.length === 0) return null;
  const [displayed, setDisplayed] = useState<string[]>(text.map(() => ''));

  useEffect(() => {
    if (!Array.isArray(text) || text.length === 0) return;
    let line = 0;
    let char = 0;
    let isCancelled = false;
    setDisplayed(text.map(() => ''));

    function typeNext() {
      if (isCancelled) return;
      if (line >= text.length) return;
      setDisplayed(prev => {
        const updated = [...prev];
        if (text[line] && text[line][char]) {
          updated[line] += text[line][char];
        }
        return updated;
      });
      let delay = speed;
      if (text[line] && text[line][char] === '.') delay = pauseAfterDot;
      char++;
      if (text[line] && char < text[line].length) {
        setTimeout(typeNext, delay);
      } else {
        line++;
        char = 0;
        if (line < text.length) {
          setTimeout(typeNext, speed * 5);
        }
      }
    }
    setTimeout(typeNext, speed);
    return () => { isCancelled = true; };
  }, [text, speed, pauseAfterDot]);

  return (
    <div className={className} style={{ whiteSpace: 'pre-line' }}>
      {displayed.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
} 