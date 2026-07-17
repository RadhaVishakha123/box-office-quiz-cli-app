import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View as MotiView } from 'moti';

// Native Vector Icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { getQuestion, updateLevelData } from '../../services/api';
import ResultOverlay from '../../components/ResultOverlay';

const { width } = Dimensions.get('window');

export default function GameplayScreen({ route, navigation }: any) {
  const { mode, level } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    async function loadQuestion() {
      try {
        const res = await getQuestion(mode, level);
        if (res.success && res.question.length > 0) {
          setQuestionData(res.question[0]);
        } else {
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
        style={{ backgroundColor: '#09090b' }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const gameContent = questionData?.content || {};
  const { correctAnswer, options = [], emojis, dialogue, clue } = gameContent;

  const handleOptionPress = async (chosenOption: string) => {
    if (isEvaluated) return;

    setSelectedAnswer(chosenOption);
    setIsEvaluated(true);
    const winState = chosenOption === correctAnswer;
    setHasWon(winState);

    try {
      await updateLevelData(user?.id as number, mode, level, winState);
      setTimeout(() => {
        setShowResultModal(true);
      }, 600);
    } catch (err) {
      console.error('Failed saving score update mutations', err);
    }
  };

  const handleNextAction = () => {
    setShowResultModal(false);
    navigation.replace('GameplayScreen', { mode, level: level + 1 });
  };

  return (
    <>
      <ImageBackground
        source={require('../../../assets/background_bg.png')}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black/30" />

        <SafeAreaView className="flex-1 px-5 justify-start">
          {/* --- Top Navbar Header Bar --- */}
          <View className="py-4 flex-row justify-between items-center border-b border-white/10">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-full  border border-white/10 active:bg-white/10"
              style={{ backgroundColor: theme.iconBg }}
            >
              <Feather name="x" size={width * 0.05} color={theme.iconText} />
            </TouchableOpacity>
            <Text
              className="text-xl font-black tracking-widest uppercase"
              style={{ color: theme.text }}
            >
              Level {level}
            </Text>
            <View style={{ width: width * 0.09 }} className="opacity-0" />
          </View>

          {/* --- Top-Aligned Solid Game Arena Module --- */}
          <MotiView
            from={{ opacity: 0, translateY: -15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', duration: 400 }}
            className="w-full mt-4 mb-5 pt-2"
          >
            {mode === 'EMOJI_RIDRLES' || mode === 'EMOJI_RIDDLES' ? (
              <View className="items-center p-6 w-full bg-amber-50 border-2 border-amber-400 rounded-3xl shadow-xl">
                <MotiView
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ type: 'timing', duration: 2500, loop: true }}
                >
                  <Text className="text-6xl mb-4 tracking-widest text-center">
                    {emojis}
                  </Text>
                </MotiView>
                <Text className="text-zinc-800 text-center font-bold text-sm px-2 leading-relaxed">
                  Decode the visual elements above to spot the hidden Bollywood
                  release sequence!
                </Text>
              </View>
            ) : mode === 'DIALOGUE_GURU' ? (
              <View className="p-6 rounded-3xl border-2  bg-amber-50 border-2 border-amber-400 w-full  shadow-xl relative overflow-hidden">
                <Text className="text-xl text-center font-serif font-black mb-3 text-indigo-9s00 leading-relaxed italic">
                  "{dialogue}"
                </Text>
                <Text className="text-xs text-center uppercase tracking-widest text-zinc-600 font-extrabold">
                  Who delivered this iconic classic line?
                </Text>
              </View>
            ) : (
              <View className="items-center p-6 w-full  bg-amber-50 border-2 border-amber-400 rounded-3xl shadow-xl">
                {clue ? (
                  <Text className="text-lg font-black text-center mb-2 text-zinc-900 px-1 leading-snug">
                    {clue}
                  </Text>
                ) : (
                  <Text className="text-lg font-black text-center mb-2 text-zinc-900 tracking-wide">
                    Spotted the Perfect Fit?
                  </Text>
                )}
                <Text className="text-xs text-center text-zinc-600 font-medium tracking-wide uppercase">
                  Analyze your options closely to clear this challenge.
                </Text>
              </View>
            )}
          </MotiView>

          {/* --- Solid Choice Interactive Grid Layout --- */}
          <View className="pb-8 mt-6">
            {options.map((option: string, idx: number) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === correctAnswer;

              // Crisp solid baselines avoiding color transparency overlays
              let borderStyle = 'border-zinc-300';
              let bgStyle = 'bg-white';
              let textStyle = 'text-zinc-800';

              if (isEvaluated) {
                if (isCorrect) {
                  borderStyle = 'border-emerald-500';
                  bgStyle = 'bg-emerald-100';
                  textStyle = 'text-emerald-900 font-black';
                } else if (isSelected && !isCorrect) {
                  borderStyle = 'border-rose-500';
                  bgStyle = 'bg-rose-100';
                  textStyle = 'text-rose-900 font-black';
                } else {
                  borderStyle = 'border-zinc-200';
                  bgStyle = 'bg-zinc-200';
                  textStyle = 'text-zinc-400line-through';
                }
              }

              return (
                <MotiView
                  key={idx}
                  from={{ opacity: 0, translateY: 15 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', delay: idx * 60 }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={isEvaluated}
                    onPress={() => handleOptionPress(option)}
                    className={`w-full py-4 px-6 rounded-2xl border-2 mb-3 flex-row justify-between items-center shadow-sm ${bgStyle} ${borderStyle}`}
                  >
                    <Text
                      className={`text-base font-black tracking-wide ${textStyle}`}
                    >
                      {option}
                    </Text>
                    {isEvaluated && isCorrect && (
                      <MaterialIcons
                        name="check-circle"
                        size={width * 0.055}
                        color="#059669"
                      />
                    )}
                    {isEvaluated && isSelected && !isCorrect && (
                      <MaterialIcons
                        name="cancel"
                        size={width * 0.055}
                        color="#DC2626"
                      />
                    )}
                  </TouchableOpacity>
                </MotiView>
              );
            })}
          </View>
          <ResultOverlay
            isVisible={showResultModal}
            hasWon={hasWon}
            correctAnswer={correctAnswer}
            currentLevel={level}
            onNext={handleNextAction}
          />
          {/* --- Custom In-App Evaluation Drawer Sheet --- */}
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
