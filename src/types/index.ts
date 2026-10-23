export type NavigationTab = 
  | 'home'
  | 'everyday'
  | 'classroom'
  | 'subjects'
  | 'progress'
  | 'about';

export interface Phrase {
  id: string;
  english: string;
  vietnamese: string;
  ipa: string;
  contextNote?: string;
  category: string;
  subjectId?: string;
  pronunciationGuide?: string;
  difficulty?: 'beginner' | 'intermediate';
  audioUrl?: string;
}

export interface SubjectItem {
  id: string;
  nameEn: string;
  nameVi: string;
  descriptionVi: string;
  iconName: string;
  accentColor: string; // pastel background
  borderColor: string;
  situations: string[];
  phrases: Phrase[];
}

export interface LearningState {
  completedPhraseIds: string[];
  favoritePhraseIds: string[];
  userRole?: UserRoleId | null;
  selectedSubjectId?: string | null;
  lastUpdated?: string;
}

export type UserRoleId = 'homeroom' | 'subject' | 'leadership' | 'staff';

export interface UserRoleConfig {
  id: UserRoleId;
  titleVi: string;
  titleEn: string;
  badgeLabel: string;
  iconName: string;
  descriptionVi: string;
  recommendedTab: NavigationTab;
  recommendedTabLabelVi: string;
  recommendedCategoryVi: string;
  quickActionLabelVi: string;
}
