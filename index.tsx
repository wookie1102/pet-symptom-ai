import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, KeyboardAvoidingView,
  Platform, SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';
import { useChat, Message } from '../hooks/useChat';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import PetSelector from '../components/PetSelector';

export default function ChatScreen() {
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [petName, setPetName] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState(0); // 0=펫선택 전, 1=대화 중
  const historyRef = useRef<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const listRef = useRef<FlatList>(null);

  const { messages, isLoading, addMessage, sendMessage } = useChat(selectedPet, petName);

  // ── 초기 웰컴 메시지 ──
  React.useEffect(() => {
    addMessage({
      id: 'welcome',
      role: 'ai',
      text: '안녕하세요! 반려동물 증상 AI 상담입니다 🐾\n어떤 반려동물의 증상을 상담하실 건가요?',
    });
  }, []);

  // ── 펫 선택 후 첫 질문 ──
  const handlePetSelect = useCallback(async (pet: string) => {
    setSelectedPet(pet);
    setStep(1);

    // 유저 메시지 추가
    const userContent = `${pet} 보호자입니다. 증상 상담을 받고 싶어요.`;
    historyRef.current.push({ role: 'user', content: userContent });

    const raw = await sendMessage(userContent, historyRef.current);
    if (raw) historyRef.current.push({ role: 'assistant', content: raw });
  }, [sendMessage]);

  // ── 메시지 전송 ──
  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || isLoading || step === 0) return;

    setInputText('');

    // 유저 메시지 UI에 추가
    addMessage({ id: Date.now().toString(), role: 'user', text });
    historyRef.current.push({ role: 'user', content: text });

    // AI 호출
    const raw = await sendMessage(text, historyRef.current);
    if (raw) {
      historyRef.current.push({ role: 'assistant', content: raw });

      // 이름 파악
      const nm = raw.match(/["']([가-힣]{1,5})["']|이름이?\s*["']?([가-힣]{1,5})["']?/);
      if (nm && !petName) setPetName(nm[1] || nm[2]);
    }
  }, [inputText, isLoading, step, petName, addMessage, sendMessage]);

  // ── 렌더 아이템 ──
  const renderItem = ({ item }: { item: Message }) => {
    // 웰컴 메시지에 PetSelector 붙이기
    if (item.id === 'welcome') {
      return (
        <View style={{ gap: 0 }}>
          <MessageBubble message={item} />
          <View style={{ paddingHorizontal: 52 }}>
            <PetSelector onSelect={handlePetSelect} />
          </View>
        </View>
      );
    }
    return <MessageBubble message={item} />;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* ── 헤더 ── */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🐾</Text>
        </View>
        <View>
          <Text style={styles.headerTitle}>반려동물 증상 AI</Text>
          <Text style={styles.headerSub}>babungee 수의사 데이터 기반</Text>
        </View>
      </View>

      {/* ── 키보드 대응 ── */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* ── 메시지 리스트 ── */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatList}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={isLoading ? <TypingIndicator /> : null}
          ListFooterComponentStyle={{ marginTop: 14 }}
        />

        {/* ── 입력 영역 ── */}
        <View style={styles.inputWrap}>
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="증상을 입력해 주세요..."
              placeholderTextColor={Colors.text3}
              multiline
              maxLength={500}
              editable={step > 0 && !isLoading}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendBtn, (!inputText.trim() || isLoading || step === 0) && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading || step === 0}
              activeOpacity={0.7}
            >
              <Text style={styles.sendIcon}>↑</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.disclaimer}>
            ※ AI 상담은 진료를 대체하지 않습니다. 응급 상황 시 즉시 동물병원을 방문하세요.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  flex: { flex: 1 },

  // 헤더
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: Colors.accentLight,
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontSize: 20 },
  headerTitle: {
    fontSize: 15, fontWeight: '700', color: Colors.text,
  },
  headerSub: {
    fontSize: 11, color: Colors.text2, marginTop: 1,
  },

  // 채팅 리스트
  chatList: {
    paddingVertical: 16,
  },

  // 입력
  inputWrap: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    backgroundColor: Colors.surface2,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    maxHeight: 80,
    lineHeight: 22,
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.3 },
  sendIcon: {
    color: '#fff', fontSize: 18, fontWeight: '700', marginTop: -2,
  },
  disclaimer: {
    fontSize: 10, color: Colors.text3,
    textAlign: 'center', marginTop: 6, lineHeight: 15,
  },
});
