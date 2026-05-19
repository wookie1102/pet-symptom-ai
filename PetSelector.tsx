import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const PETS = [
  { id: '강아지', emoji: '🐶', label: '강아지' },
  { id: '고양이', emoji: '🐱', label: '고양이' },
  { id: '토끼', emoji: '🐰', label: '토끼' },
  { id: '기타', emoji: '🐾', label: '기타' },
];

interface Props {
  onSelect: (pet: string) => void;
}

export default function PetSelector({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (selected) return; // 이미 선택됨
    setSelected(id);
    setTimeout(() => onSelect(id), 250);
  };

  if (selected) {
    const pet = PETS.find(p => p.id === selected);
    return (
      <Text style={styles.selectedText}>{pet?.emoji} {selected} 선택됨</Text>
    );
  }

  return (
    <View style={styles.wrap}>
      {PETS.map(pet => (
        <TouchableOpacity
          key={pet.id}
          style={styles.btn}
          onPress={() => handleSelect(pet.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.btnText}>{pet.emoji} {pet.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  btnText: {
    fontSize: 13,
    color: Colors.text2,
  },
  selectedText: {
    fontSize: 12,
    color: Colors.text3,
    marginTop: 6,
  },
});
