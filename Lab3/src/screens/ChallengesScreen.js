import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { GameContext } from '../GameContext';


const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 16px;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.card};
`;

const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.accent};
  margin-bottom: 4px;
`;

const HeaderSub = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.subtext};
`;

const MissionCard = styled.View`
  padding: 14px 16px;
  border-radius: 14px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.completed ? '#1e3a2f' : '#2a1a2e')};
  border-left-width: 4px;
  border-left-color: ${(props) => (props.completed ? '#00b894' : '#6c63ff')};
`;

const MissionTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => (props.completed ? '#55efc4' : '#e0e0ff')};
  margin-bottom: 4px;
`;

const MissionStatus = styled.Text`
  font-size: 13px;
  color: ${(props) => (props.completed ? '#00b894' : '#a29bfe')};
`;

const SectionLabel = styled.Text`
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${(props) => props.theme.subtext};
  margin-bottom: 10px;
  margin-top: 6px;
`;

export default function ChallengesScreen() {
  const { energy, stats } = useContext(GameContext);

  const missions = [
    { title: '🖱 Торкнутись планети 10 разів', completed: stats.taps >= 10 },
    { title: '✌️ Подвійний дотик 5 разів', completed: stats.doubleTaps >= 5 },
    { title: '⚡ Утримати зв\'язок 2 секунди', completed: stats.longPresses >= 1 },
    { title: '🛸 Перемістити планету', completed: stats.drags >= 1 },
    { title: '➡️ Свайп вправо — курс до Марсу', completed: stats.swipeRights >= 1 },
    { title: '⬅️ Свайп вліво — курс до Венери', completed: stats.swipeLefts >= 1 },
    { title: '🔭 Масштабувати планету', completed: stats.pinches >= 1 },
    { title: '🌟 Зібрати 50 одиниць енергії', completed: energy >= 50 },
    { title: '💥 Зібрати 200 одиниць енергії', completed: energy >= 200 },
    { title: '🚀 Власна місія: 3 свайпи вліво поспіль', completed: stats.swipeLefts >= 3 },
  ];

  const completed = missions.filter(m => m.completed).length;

  return (
    <Container>
      <Header>
        <HeaderTitle>🎯 Журнал місій</HeaderTitle>
        <HeaderSub>Дмитро Балан • ВТ-22-1 • ЖДТУ</HeaderSub>
        <HeaderSub style={{ marginTop: 6 }}>
          Виконано: {completed} / {missions.length}
        </HeaderSub>
      </Header>

      <SectionLabel>Активні місії</SectionLabel>

      {missions.map((item, index) => (
        <MissionCard key={index} completed={item.completed}>
          <MissionTitle completed={item.completed}>{item.title}</MissionTitle>
          <MissionStatus completed={item.completed}>
            {item.completed ? '✅ Місію виконано' : '🔄 В процесі...'}
          </MissionStatus>
        </MissionCard>
      ))}
    </Container>
  );
}
