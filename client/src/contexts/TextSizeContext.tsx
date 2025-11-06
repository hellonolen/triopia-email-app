import { createContext, useContext, useState, ReactNode } from 'react';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface TextSizeContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>('sm');

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      <div className={`text-size-${textSize}`}>
        {children}
      </div>
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error('useTextSize must be used within TextSizeProvider');
  }
  return context;
}
