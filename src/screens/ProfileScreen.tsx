import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useAuthContext as useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Button } from '../components/shared/Button';
import { ThemedCard } from '../components/shared/ThemedCard';
import { ThemedText } from '../components/shared/ThemedText';
import { ThemedView } from '../components/shared/ThemedView';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../contexts/ThemeContext';
import { showAlert } from '../utils/alertHelper';
// import { useFeatureFlags } from '../hooks/useFeatureFlags';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { t, locale, changeLanguage } = useTranslation();
  const { theme, isDark, toggleTheme, themeMode } = useTheme();
  // const { flags, isFeatureEnabled } = useFeatureFlags();

  const handleLogout = () => {
    showAlert(
      t('auth.signOut'),
      'Are you sure you want to sign out?',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('auth.signOut'),
          style: 'destructive',
          onPress: performLogout,
        },
      ]
    );
  };

  const performLogout = async () => {
    try {
      await logout();
    } catch (error) {
      showAlert(t('common.error'), t('profile.logoutError'));
    }
  };

  const handleChangeLanguage = async (newLocale: string) => {
    try {
      await changeLanguage(newLocale);
    } catch (error) {
      showAlert(t('common.error'), t('profile.languageChangeError'));
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return t('profile.roleAdmin');
      case 'ROLE_MEMBER':
        return t('profile.roleMember');
      default:
        return role;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ThemedText size="xxxl" weight="bold">
            {t('profile.title')}
          </ThemedText>
        </View>

        <ThemedCard elevated style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary[500] }]}>
              <ThemedText variant="inverse" size="xl" weight="bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </ThemedText>
            </View>
            <View style={styles.userInfo}>
              <ThemedText size="lg" weight="bold">
                {user?.name}
              </ThemedText>
              <ThemedText variant="secondary">
                {user?.email}
              </ThemedText>
              <View style={[
                styles.roleBadge,
                { 
                  backgroundColor: user?.role === 'ROLE_ADMIN' 
                    ? theme.colors.error[50] 
                    : theme.colors.primary[50] 
                }
              ]}>
                <ThemedText 
                  size="sm" 
                  weight="semibold"
                  variant={user?.role === 'ROLE_ADMIN' ? 'error' : 'primary'}
                >
                  {getRoleDisplayName(user?.role || '')}
                </ThemedText>
              </View>
            </View>
          </View>
        </ThemedCard>

        <ThemedCard style={styles.sectionCard}>
          <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
            {t('profile.preferences')}
          </ThemedText>

          <View style={styles.preferenceItem}>
            <ThemedText style={styles.preferenceLabel}>
              {t('profile.language')}
            </ThemedText>
            <View style={styles.languageButtons}>
              <Button
                title="English"
                onPress={() => handleChangeLanguage('en')}
                variant={locale === 'en' ? 'primary' : 'secondary'}
                style={styles.languageButton}
              />
              <Button
                title="Español"
                onPress={() => handleChangeLanguage('es')}
                variant={locale === 'es' ? 'primary' : 'secondary'}
                style={styles.languageButton}
              />
            </View>
          </View>
        </ThemedCard>

        {/* Dark Mode Section - Always visible now */}
        <ThemedCard style={styles.sectionCard}>
          <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
            {t('profile.appearance')}
          </ThemedText>

          <View style={styles.preferenceItem}>
            <View style={styles.themeRow}>
              <ThemedText style={styles.preferenceLabel}>
                {t('profile.darkMode')}
              </ThemedText>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.neutral[300],
                  true: theme.colors.primary[400],
                }}
                thumbColor={isDark ? theme.colors.primary[500] : theme.colors.neutral[100]}
              />
            </View>
          </View>
        </ThemedCard>

        {user?.role === 'ROLE_ADMIN' && (
          <ThemedCard style={styles.sectionCard}>
            <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
              {t('profile.adminFeatures')}
            </ThemedText>

            <View style={styles.featureList}>
              <View style={[styles.featureItem, { backgroundColor: theme.colors.background.secondary }]}>
                <ThemedText size="sm" weight="semibold" style={styles.featureName}>
                  {t('profile.errorLogs')}
                </ThemedText>
                <ThemedText variant="secondary" size="sm" style={styles.featureDescription}>
                  {t('profile.errorLogsDescription')}
                </ThemedText>
              </View>

              <View style={[styles.featureItem, { backgroundColor: theme.colors.background.secondary }]}>
                <ThemedText size="sm" weight="semibold" style={styles.featureName}>
                  {t('profile.userManagement')}
                </ThemedText>
                <ThemedText variant="secondary" size="sm" style={styles.featureDescription}>
                  {t('profile.userManagementDescription')}
                </ThemedText>
              </View>
            </View>

            <Button
              title={t('profile.viewErrorLogs')}
              onPress={() => navigation.navigate('Errors')}
              variant="secondary"
              style={styles.adminButton}
            />
          </ThemedCard>
        )}

        {/* Feature Flags Section - Commented out for now */}
        {/* <ThemedCard style={styles.sectionCard}>
          <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
            {t('profile.featureFlags')}
          </ThemedText>

          <View style={styles.featureFlags}>
            {Object.entries(flags).map(([feature, enabled]) => (
              <View key={feature} style={styles.featureFlagItem}>
                <ThemedText style={styles.featureFlagName}>
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </ThemedText>
                <View style={[
                  styles.featureFlagStatus,
                  enabled ? styles.featureEnabled : styles.featureDisabled
                ]}>
                  <ThemedText 
                    size="sm" 
                    weight="semibold"
                    variant={enabled ? 'success' : 'error'}
                  >
                    {enabled ? t('common.enabled') : t('common.disabled')}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </ThemedCard> */}

        <ThemedCard style={styles.sectionCard}>
          <ThemedText size="lg" weight="semibold" style={styles.sectionTitle}>
            {t('profile.appInfo')}
          </ThemedText>

          <View style={styles.infoItem}>
            <ThemedText variant="secondary" style={styles.infoLabel}>
              {t('profile.version')}
            </ThemedText>
            <ThemedText style={styles.infoValue}>1.0.0</ThemedText>
          </View>

          <View style={styles.infoItem}>
            <ThemedText variant="secondary" style={styles.infoLabel}>
              {t('profile.build')}
            </ThemedText>
            <ThemedText style={styles.infoValue}>1</ThemedText>
          </View>

          <View style={styles.infoItem}>
            <ThemedText variant="secondary" style={styles.infoLabel}>
              {t('profile.environment')}
            </ThemedText>
            <ThemedText style={styles.infoValue}>
              {t('profile.development')}
            </ThemedText>
          </View>
        </ThemedCard>

        <Button
          title={t('auth.signOut')}
          onPress={handleLogout}
          variant="secondary"
          style={styles.logoutButton}
        />

        <View style={styles.footer}>
          <ThemedText variant="tertiary" size="sm">
            {t('profile.copyright')}
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  profileCard: {
    margin: 16,
    marginTop: 8,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  sectionCard: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  preferenceItem: {
    marginBottom: 20,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
  },
  featureList: {
    marginBottom: 16,
  },
  featureItem: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  featureName: {
    marginBottom: 4,
  },
  featureDescription: {
    lineHeight: 16,
  },
  adminButton: {
    marginTop: 8,
  },
  featureFlags: {
    gap: 8,
  },
  featureFlagItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  featureFlagName: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  featureFlagStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    margin: 16,
    marginTop: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});