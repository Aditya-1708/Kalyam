import { useEffect, useState } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

export const useSecretEntrance = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      setKeySequence((prev) => {
        const newSequence = [...prev, e.key];
        
        // Keep only the last 8 keys
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }

        // Check if the sequence matches the Konami code
        const matches = KONAMI_CODE.every((key, index) => newSequence[index] === key);
        
        if (matches) {
          setIsUnlocked(true);
          // Auto-hide after 1 minute if user doesn't use it
          setTimeout(() => setIsUnlocked(false), 60000);
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return isUnlocked;
};