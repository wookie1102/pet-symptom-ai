import { useState, useCallback } from 'react';
import { SYSTEM_PROMPT, ANTHROPIC_API_URL, API_KEY } from '../constants/prompt';

export type UrgencyLevel = 'low' | 'mid' | 'high';

export interface UrgencyData {
  urgency: UrgencyLevel;
  reason: string;
  advice: string;
}

export interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  urgency?: UrgencyData;
}

interface HistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export function useChat(selectedPet: string | null, petName: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  const callAI = useCallback(async (history: HistoryItem[]): Promise<string> => {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT +
          `\n\n반려동물: ${selectedPet}` +
          (petName ? ` (이름: ${petName})` : ''),
        messages: history,
      }),
    });

    if (!res.ok) throw new Error(`API 오류: ${res.status}`);
    const data = await res.json();
    return data.content.map((c: { text?: string }) => c.text || '').join('');
  }, [selectedPet, petName]);

  const parseReply = (raw: string): { display: string; urgency?: UrgencyData } => {
    const jm = raw.match(/\{[\s\S]*?"urgency"[\s\S]*?\}/);
    if (!jm) return { display: raw };
    try {
      const urgency = JSON.parse(jm[0]) as UrgencyData;
      return { display: raw.replace(jm[0], '').trim(), urgency };
    } catch {
      return { display: raw };
    }
  };

  const sendMessage = useCallback(async (
    userText: string,
    history: HistoryItem[],
  ) => {
    setIsLoading(true);
    try {
      const raw = await callAI(history);
      const { display, urgency } = parseReply(raw);
      const msg: Message = {
        id: Date.now().toString(),
        role: 'ai',
        text: display,
        urgency,
      };
      addMessage(msg);
      return raw; // 히스토리 업데이트용 원문 반환
    } catch (e) {
      addMessage({
        id: Date.now().toString(),
        role: 'ai',
        text: '죄송합니다, 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [callAI, addMessage]);

  return { messages, isLoading, addMessage, sendMessage };
}
