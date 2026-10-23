import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { LearningState } from '../types';

interface LearningContextType {
  completedIds: Set<string>;
  favoriteIds: Set<string>;
  toggleLearned: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isLearned: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  clearAllProgress: () => void;
  userRole: import('../types').UserRoleId | null;
  setUserRole: (role: import('../types').UserRoleId | null) => void;
  selectedSubjectId: string | null;
  setSelectedSubjectId: (subjectId: string | null) => void;
}

const STORAGE_KEY = 'na_duong_esl_learning_progress_v1';
const ROLE_STORAGE_KEY = 'na_duong_esl_user_role_v1';

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRoleState] = useState<import('../types').UserRoleId | null>(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.role || null;
      }
    } catch (e) {
      console.warn('Could not load user role from localStorage:', e);
    }
    return null;
  });

  const [selectedSubjectId, setSelectedSubjectIdState] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.subjectId || null;
      }
    } catch (e) {
      console.warn('Could not load user subject from localStorage:', e);
    }
    return null;
  });

  const setUserRole = useCallback((role: import('../types').UserRoleId | null) => {
    setUserRoleState(role);
    try {
      const existing = localStorage.getItem(ROLE_STORAGE_KEY);
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify({ ...parsed, role }));
    } catch (e) {
      console.warn('Failed to save role to localStorage', e);
    }
  }, []);

  const setSelectedSubjectId = useCallback((subjectId: string | null) => {
    setSelectedSubjectIdState(subjectId);
    try {
      const existing = localStorage.getItem(ROLE_STORAGE_KEY);
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(ROLE_STORAGE_KEY, JSON.stringify({ ...parsed, subjectId }));
    } catch (e) {
      console.warn('Failed to save subject to localStorage', e);
    }
  }, []);
  // Helper to remove obsolete scenario references without touching remaining phrase progress
  const isNotObsoleteScenarioId = (id: string) => {
    const lower = id.toLowerCase();
    return !lower.startsWith('sc-') && !lower.startsWith('scn') && !lower.startsWith('scenario');
  };

  // Helper to migrate any legacy IDs (e.g. ed-01, cl-01, math-01) to canonical IDs
  const normalizePhraseId = (id: string): string => {
    if (!id) return id;
    const edMatch = id.match(/^ed-(\d+)$/i);
    if (edMatch) return `EVD${edMatch[1].padStart(3, '0')}`;
    const clMatch = id.match(/^cl-(\d+)$/i);
    if (clMatch) return `CLE${clMatch[1].padStart(3, '0')}`;
    const mathMatch = id.match(/^math-(\d+)$/i);
    if (mathMatch) return `MAT${mathMatch[1].padStart(3, '0')}`;
    const sciMatch = id.match(/^sci-(\d+)$/i);
    if (sciMatch) return `SCI${sciMatch[1].padStart(3, '0')}`;
    const hisMatch = id.match(/^his-(\d+)$/i);
    if (hisMatch) return `HIS${hisMatch[1].padStart(3, '0')}`;
    const geoMatch = id.match(/^geo-(\d+)$/i);
    if (geoMatch) return `GEO${geoMatch[1].padStart(3, '0')}`;
    const musMatch = id.match(/^mus-(\d+)$/i);
    if (musMatch) return `MUS${musMatch[1].padStart(3, '0')}`;
    const artMatch = id.match(/^art-(\d+)$/i);
    if (artMatch) return `ART${artMatch[1].padStart(3, '0')}`;
    const peMatch = id.match(/^pe-(\d+)$/i);
    if (peMatch) return `PE${peMatch[1].padStart(3, '0')}`;
    const itMatch = id.match(/^it-(\d+)$/i);
    if (itMatch) return `IT${itMatch[1].padStart(3, '0')}`;
    return id;
  };

  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const validIds = (parsed.completedPhraseIds || [])
          .filter(isNotObsoleteScenarioId)
          .map(normalizePhraseId);
        return new Set(validIds);
      }
    } catch (e) {
      console.warn('Could not load learning state from localStorage:', e);
    }
    return new Set();
  });

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const validIds = (parsed.favoritePhraseIds || [])
          .filter(isNotObsoleteScenarioId)
          .map(normalizePhraseId);
        return new Set(validIds);
      }
    } catch (e) {
      console.warn('Could not load favorites from localStorage:', e);
    }
    return new Set();
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      const payload: LearningState = {
        completedPhraseIds: Array.from(completedIds),
        favoritePhraseIds: Array.from(favoriteIds),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not save learning state to localStorage:', e);
    }
  }, [completedIds, favoriteIds]);

  const toggleLearned = useCallback((rawId: string) => {
    const id = normalizePhraseId(rawId);
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((rawId: string) => {
    const id = normalizePhraseId(rawId);
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isLearned = useCallback((rawId: string) => {
    const id = normalizePhraseId(rawId);
    return completedIds.has(id);
  }, [completedIds]);

  const isFavorite = useCallback((rawId: string) => {
    const id = normalizePhraseId(rawId);
    return favoriteIds.has(id);
  }, [favoriteIds]);

  const clearAllProgress = useCallback(() => {
    setCompletedIds(new Set());
    setFavoriteIds(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear storage:', e);
    }
  }, []);

  return (
    <LearningContext.Provider
      value={{
        completedIds,
        favoriteIds,
        toggleLearned,
        toggleFavorite,
        isLearned,
        isFavorite,
        clearAllProgress,
        userRole,
        setUserRole,
        selectedSubjectId,
        setSelectedSubjectId,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
