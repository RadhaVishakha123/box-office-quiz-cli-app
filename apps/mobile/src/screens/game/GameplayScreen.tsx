import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getQuestion, updateLevelData } from '../../services/api';

export default function GameplayScreen({ route, navigation }: any) {
  const { mode, level } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);

  useEffect(() => {
    async function loadQuestion() {
      try {
        const res = await getQuestion(mode, level);
        if (res.success && res.question.length > 0) {
          // Backend returns array matching condition lookup indexes elements
          setQuestionData(res.question[0]);
        } else {
          Alert.alert(
            'Error',
            'Could not track down level data asset parameters.',
          );
          navigation.goBack();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadQuestion();
  }, [mode, level, navigation]);

  if (loading) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: theme.background }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // Safely grab the structural payload fields injected inside the Prisma JSON Column block
  const gameContent = questionData?.content || {};
  const { correctAnswer, options = [], emojis, dialogue, clue } = gameContent;

  const handleOptionPress = async (chosenOption: string) => {
    if (isEvaluated) return;

    setSelectedAnswer(chosenOption);
    setIsEvaluated(true);
    const hasWon = chosenOption === correctAnswer;

    try {
      await updateLevelData(user?.id as number, mode, level, hasWon);

      if (hasWon) {
        Alert.alert('Shandaar! 🎉', 'Correct Answer!', [
          {
            text: 'Next Level',
            onPress: () =>
              navigation.replace('GameplayScreen', { mode, level: level + 1 }),
          },
        ]);
      } else {
        Alert.alert('Oops! 💥', 'Wrong Answer. Try again!', [
          {
            text: 'Next Level',
            onPress: () =>
              navigation.replace('GameplayScreen', { mode, level: level + 1 }),
          },
        ]);
      }
    } catch (err) {
      console.error('Failed saving win state status mutations updates', err);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 px-4"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header bar dashboard elements mapping configuration tracking view line */}
      <View className="py-3 flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text className="text-lg font-black" style={{ color: theme.text }}>
          Level {level}
        </Text>
        <View className="w-6" />
      </View>

      {/* --- DYNAMIC UI LAYOUT SWITCH BASED ON GAME MODE CONTEXT TYPE STRINGS --- */}
      <View className="flex-1 justify-center items-center mb-8">
        {mode === 'EMOJI_RIDDLES' && (
          <View className="items-center">
            <Text className="text-7xl mb-4 tracking-widest">{emojis}</Text>
            <Text
              className="text-sm text-center font-medium"
              style={{ color: theme.textSecondary }}
            >
              Guess the Bollywood film sequence from the emojis above!
            </Text>
          </View>
        )}

        {mode === 'DIALOGUE_GURU' && (
          <View
            className="p-6 rounded-2xl border w-full bg-slate-50/5"
            style={{ borderColor: theme.border }}
          >
            <Text
              className="text-3xl text-center italic font-serif font-bold mb-2"
              style={{ color: theme.text }}
            >
              "{dialogue}"
            </Text>
            <Text className="text-xs text-center uppercase tracking-wider text-amber-500 font-bold">
              Who delivered this legendary line?
            </Text>
          </View>
        )}

        {/* Fallback baseline placeholder elements structure view for options formats */}
        {(mode === 'BLURRED_POSTER' ||
          mode === 'SPOT_THE_EXACT' ||
          mode === 'MISSING_LETTERS') && (
          <View className="items-center px-4">
            {clue && (
              <Text
                className="text-lg font-bold text-center mb-2"
                style={{ color: theme.text }}
              >
                {clue}
              </Text>
            )}
            <Text
              className="text-xs text-center"
              style={{ color: theme.textSecondary }}
            >
              Analyze the choices carefully below to match correctly.
            </Text>
          </View>
        )}
      </View>

      {/* --- MULTIPLE CHOICE RENDERING GRID ACTION OPTIONS MODULE --- */}
      <View className="pb-8">
        {options.map((option: string, idx: number) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === correctAnswer;

          let btnBorderColor = theme.border;
          let btnBg = theme.card;

          if (isEvaluated && isSelected) {
            btnBorderColor = isCorrect ? '#22C55E' : '#EF4444';
            btnBg = isCorrect ? '#DCFCE7' : '#FEE2E2';
          }

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              disabled={isEvaluated}
              onPress={() => handleOptionPress(option)}
              className="w-full py-4 px-6 rounded-2xl border-2 mb-3 flex-row justify-between items-center"
              style={{ backgroundColor: btnBg, borderColor: btnBorderColor }}
            >
              <Text
                className="text-base font-bold"
                style={{ color: theme.text }}
              >
                {option}
              </Text>
              {isEvaluated && isCorrect && (
                <Icon name="check-circle" size={20} color="#22C55E" />
              )}
              {isEvaluated && isSelected && !isCorrect && (
                <Icon name="x-circle" size={20} color="#EF4444" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
