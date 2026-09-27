/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, UserRole, FoodBatch, RedistributionTicket, AppAlert } from './types';
import {
  INITIAL_BATCHES,
  INITIAL_TICKETS,
  INITIAL_ALERTS,
  INITIAL_LEADERBOARD,
} from './mockData';

// Shared Components
import { TopHeader } from './components/TopHeader';
import { Navigation } from './components/Navigation';
import { ESGCertificateModal } from './components/ESGCertificateModal';
import { KrishiVoiceModal } from './components/KrishiVoiceModal';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { SignInScreen } from './screens/SignInScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen';
import { KitchenDashboardScreen } from './screens/KitchenDashboardScreen';
import { ListSurplusScreen } from './screens/ListSurplusScreen';
import { MatchedOrgsScreen } from './screens/MatchedOrgsScreen';
import { ReceivingOrgDashboardScreen } from './screens/ReceivingOrgDashboardScreen';
import { LogisticsDashboardScreen } from './screens/LogisticsDashboardScreen';
import { SustainabilityDashboardScreen } from './screens/SustainabilityDashboardScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { SubscriptionScreen } from './screens/SubscriptionScreen';
import { AlertsScreen } from './screens/AlertsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [userRole, setUserRole] = useState<UserRole>('kitchen');

  // Application Data States
  const [batches, setBatches] = useState<FoodBatch[]>(INITIAL_BATCHES);
  const [tickets, setTickets] = useState<RedistributionTicket[]>(INITIAL_TICKETS);
  const [alerts, setAlerts] = useState<AppAlert[]>(INITIAL_ALERTS);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

  // Dynamic Impact Counters
  const [totalKgSaved, setTotalKgSaved] = useState(3840);
  const [totalCO2eTons, setTotalCO2eTons] = useState(8.4);
  const [mealsRedirected, setMealsRedirected] = useState(9600);

  // Modal Controls
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Settings Controls
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [voiceGuidanceEnabled, setVoiceGuidanceEnabled] = useState(true);

  // Handlers
  const handleSignInSuccess = (role: UserRole) => {
    setUserRole(role);
    if (role === 'kitchen') setCurrentScreen('kitchen_dashboard');
    else if (role === 'receiving') setCurrentScreen('receiving_dashboard');
    else setCurrentScreen('logistics_dashboard');
  };

  const handleAccountCreated = (role: UserRole) => {
    setUserRole(role);
    if (role === 'kitchen') setCurrentScreen('kitchen_dashboard');
    else if (role === 'receiving') setCurrentScreen('receiving_dashboard');
    else setCurrentScreen('logistics_dashboard');
  };

  const handleBatchCreated = (newBatch: FoodBatch) => {
    setBatches((prev) => [newBatch, ...prev]);

    // Create an alert for freshness/verification
    const newAlert: AppAlert = {
      id: `alert-${Date.now()}`,
      category: 'freshness',
      title: `Surplus Batch Registered: ${newBatch.title}`,
      description: `${newBatch.volumeKg}kg scanned with Krishi AI score of ${newBatch.aiFreshnessScore}/100. Matching NGOs...`,
      timestamp: 'Just now',
      source: 'Krishi AI Optic',
      unread: true,
      statusBadge: `${newBatch.aiFreshnessScore}/100`,
      actionType: 'expedite',
      actionTargetScreen: 'matched_orgs'
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleTicketConfirmed = (newTicket: RedistributionTicket) => {
    setTickets((prev) => [newTicket, ...prev]);

    // Update batch status
    setBatches((prev) =>
      prev.map((b) =>
        b.title.includes(newTicket.batchTitle.split(' ')[0])
          ? { ...b, status: 'matched', triageDestination: newTicket.toOrg }
          : b
      )
    );

    // Add alert
    const newAlert: AppAlert = {
      id: `alert-${Date.now()}`,
      category: 'pickup',
      title: `Ticket Confirmed — ${newTicket.toOrg}`,
      description: `Driver ${newTicket.driverName} scheduled for ${newTicket.batchTitle}. ETA: ${newTicket.etaMinutes} mins.`,
      timestamp: 'Just now',
      source: `Ticket #${newTicket.ticketId}`,
      unread: true,
      statusBadge: 'Scheduled',
      actionType: 'track',
      actionTargetScreen: 'logistics_dashboard',
      ticketId: newTicket.ticketId
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleAcceptTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.ticketId === ticketId ? { ...t, status: 'accepted' } : t))
    );

    const alertItem: AppAlert = {
      id: `alert-${Date.now()}`,
      category: 'pickup',
      title: `Ticket #${ticketId} Accepted by NGO`,
      description: `Driver dispatched. Cold chain integrity guaranteed under 4.0°C.`,
      timestamp: 'Just now',
      source: 'Annapurna Kitchen',
      unread: true,
      statusBadge: 'En Route',
      actionType: 'track',
      actionTargetScreen: 'logistics_dashboard',
      ticketId
    };
    setAlerts((prev) => [alertItem, ...prev]);
  };

  const handleDeclineTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.ticketId === ticketId ? { ...t, status: 'declined' } : t))
    );
  };

  const handleMarkDelivered = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.ticketId === ticketId ? { ...t, status: 'delivered' } : t))
    );

    // Increase sustainability impact
    setTotalKgSaved((prev) => prev + 45);
    setTotalCO2eTons((prev) => Number((prev + 0.07).toFixed(2)));
    setMealsRedirected((prev) => prev + 115);

    // Update leaderboard
    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.isCurrentUser
          ? {
              ...entry,
              kgDiverted: entry.kgDiverted + 45,
              co2eTons: Number((entry.co2eTons + 0.07).toFixed(2))
            }
          : entry
      )
    );

    // Create delivered impact alert
    const impactAlert: AppAlert = {
      id: `alert-${Date.now()}`,
      category: 'pickup',
      title: `Verified Delivery Complete`,
      description: `45kg Cooked Rice accepted by Annapurna Kitchen. 72kg CO2e offset logged into ESG ledger.`,
      timestamp: 'Just now',
      source: 'ESG Redistribution Ledger',
      unread: true,
      statusBadge: 'Impact',
      actionType: 'receipt',
      actionTargetScreen: 'sustainability_dashboard'
    };
    setAlerts((prev) => [impactAlert, ...prev]);
  };

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, unread: false })));
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, unread: false } : a))
    );
  };

  const handleResetAlerts = () => {
    setAlerts(INITIAL_ALERTS);
  };

  const unreadAlertsCount = alerts.filter((a) => a.unread).length;

  const isAuthOrSplash =
    currentScreen === 'splash' ||
    currentScreen === 'signin' ||
    currentScreen === 'create_account';

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#141b2b] flex flex-col font-sans antialiased selection:bg-[#ebf7ee] selection:text-[#00652c]">
      {/* Top Header (Shown on all dashboard/sub screens) */}
      {!isAuthOrSplash && (
        <TopHeader
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          userRole={userRole}
          setUserRole={setUserRole}
          unreadAlertsCount={unreadAlertsCount}
          onOpenVoice={() => setIsVoiceModalOpen(true)}
        />
      )}

      {/* Main Screen Content */}
      <main className="flex-1 w-full max-w-lg mx-auto">
        {currentScreen === 'splash' && (
          <SplashScreen
            onGetStarted={() => setCurrentScreen('signin')}
            onCreateAccount={() => setCurrentScreen('create_account')}
          />
        )}

        {currentScreen === 'signin' && (
          <SignInScreen
            onSignInSuccess={handleSignInSuccess}
            onCreateAccountClick={() => setCurrentScreen('create_account')}
            onBackToSplash={() => setCurrentScreen('splash')}
          />
        )}

        {currentScreen === 'create_account' && (
          <CreateAccountScreen
            onAccountCreated={handleAccountCreated}
            onBackToSignIn={() => setCurrentScreen('signin')}
          />
        )}

        {currentScreen === 'kitchen_dashboard' && (
          <KitchenDashboardScreen
            batches={batches}
            onNavigate={setCurrentScreen}
            onConfirmDispatchOtp={handleMarkDelivered}
          />
        )}

        {currentScreen === 'list_surplus' && (
          <ListSurplusScreen
            onBatchCreated={handleBatchCreated}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'matched_orgs' && (
          <MatchedOrgsScreen
            onTicketConfirmed={handleTicketConfirmed}
            onNavigate={setCurrentScreen}
            selectedBatchTitle={batches[0]?.title}
            selectedBatchVolumeKg={batches[0]?.volumeKg}
          />
        )}

        {currentScreen === 'receiving_dashboard' && (
          <ReceivingOrgDashboardScreen
            tickets={tickets}
            onAcceptTicket={handleAcceptTicket}
            onDeclineTicket={handleDeclineTicket}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'logistics_dashboard' && (
          <LogisticsDashboardScreen
            tickets={tickets}
            onMarkDelivered={handleMarkDelivered}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'sustainability_dashboard' && (
          <SustainabilityDashboardScreen
            totalKgSaved={totalKgSaved}
            totalCO2eTons={totalCO2eTons}
            mealsRedirected={mealsRedirected}
            onOpenCertificate={() => setIsCertificateModalOpen(true)}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen
            entries={leaderboard}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'subscription' && (
          <SubscriptionScreen
            onNavigate={setCurrentScreen}
            onPlanUpgraded={(planName) => {
              // Upgraded logic
            }}
          />
        )}

        {currentScreen === 'alerts' && (
          <AlertsScreen
            alerts={alerts}
            onMarkAllRead={handleMarkAllRead}
            onDismissAlert={handleDismissAlert}
            onToggleRead={handleToggleRead}
            onResetAlerts={handleResetAlerts}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            userRole={userRole}
            setUserRole={setUserRole}
            activeLanguage={activeLanguage}
            setActiveLanguage={setActiveLanguage}
            voiceGuidanceEnabled={voiceGuidanceEnabled}
            setVoiceGuidanceEnabled={setVoiceGuidanceEnabled}
            onSignOut={() => setCurrentScreen('splash')}
            onNavigate={setCurrentScreen}
          />
        )}
      </main>

      {/* Shared Bottom Navigation (Accessible from every role dashboard) */}
      {!isAuthOrSplash && (
        <Navigation
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          userRole={userRole}
          onOpenVoice={() => setIsVoiceModalOpen(true)}
        />
      )}

      {/* High-Resolution ESG Certificate Modal */}
      <ESGCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        totalKg={totalKgSaved}
        totalCO2eTons={totalCO2eTons}
        mealsRedirected={mealsRedirected}
      />

      {/* Krishi AI Voice Assistant Modal */}
      <KrishiVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onNavigate={setCurrentScreen}
        activeLanguage={activeLanguage}
      />
    </div>
  );
}
