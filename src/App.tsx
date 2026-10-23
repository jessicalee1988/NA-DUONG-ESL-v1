/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab } from './types';
import { LearningProvider } from './context/LearningContext';
import { SpeechProvider } from './context/SpeechContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SpeechFallbackModal } from './components/SpeechFallbackModal';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';

// Views
import { HomeView } from './views/HomeView';
import { EverydayEnglishView } from './views/EverydayEnglishView';
import { ClassroomEnglishView } from './views/ClassroomEnglishView';
import { SubjectBankView } from './views/SubjectBankView';
import { ProgressView } from './views/ProgressView';
import { AboutView } from './views/AboutView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubjectFromHome = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentTab('subjects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LearningProvider>
      <SpeechProvider>
        <div className="min-h-screen flex flex-col bg-[#F6FAF7] text-[#132E22]">
          {/* Offline Connectivity Notification Banner */}
          <OfflineStatusBanner />

          {/* Navigation Top Bar */}
          <Header 
            currentTab={currentTab} 
            onSelectTab={handleSelectTab} 
            onSelectSubject={handleSelectSubjectFromHome} 
          />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {currentTab === 'home' && (
              <HomeView 
                onSelectTab={handleSelectTab} 
                onSelectSubject={handleSelectSubjectFromHome} 
              />
            )}

            {currentTab === 'everyday' && (
              <EverydayEnglishView />
            )}

            {currentTab === 'classroom' && (
              <ClassroomEnglishView />
            )}

            {currentTab === 'subjects' && (
              <SubjectBankView 
                initialSubjectId={selectedSubjectId}
                onClearInitialSubject={() => setSelectedSubjectId(null)}
              />
            )}            {currentTab === 'progress' && (
              <ProgressView onNavigateTab={handleSelectTab} />
            )}

            {currentTab === 'about' && (
              <AboutView />
            )}
          </main>

          {/* Discreet & Beautiful Footer */}
          <Footer onSelectTab={handleSelectTab} />

          {/* Speech Fallback Notification Modal (only shown if speech synthesis error occurs) */}
          <SpeechFallbackModal />
        </div>
      </SpeechProvider>
    </LearningProvider>
  );
}
