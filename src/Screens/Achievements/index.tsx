import { Image, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import BackgroundWrapper from '../../Components/BackgroundWrapper';
import Text from '../../Components/Text';
import styles from './defaultCSS';
import Trophy from '../../Assets/svg/Trophy.svg';
import Award from '../../Assets/svg/Award.svg';
import { Appbar } from 'react-native-paper';
import { allUserAchievements } from '../../../Database/dbInitialization';

interface Achievement {
  id: number;
  name: string;
  description: string;
  points: number;
  user_id: number;
}

const AchievementsList = ({ achievements }) => (
  <View>
    {achievements.map((item) => (
      <View key={item.id} >
        <Text style={styles.itemText}>• {item.points} {item.description}</Text>
      </View>
    ))}
  </View>
);

const Index = ({ navigation }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const userId = 1; // Replace with the actual user ID of logged in user
        const userAchievements = await allUserAchievements(userId);
        setAchievements(userAchievements);
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <BackgroundWrapper>
      <Appbar.BackAction onPress={() => navigation.navigate('PersonalPage')} />
      <View style={styles.container}>
          <Text style={styles.header}>Well done!</Text>
        <View style={styles.section}>
          <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Trophy />
          <Text style={styles.subheader}> Achievements</Text>
          </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Award/>
              <View style={{ flex: 1 }}>
                <AchievementsList achievements={achievements} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

export default Index;