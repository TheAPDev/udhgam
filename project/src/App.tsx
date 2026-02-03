import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Login } from './components/Auth/Login';
import { SignUp } from './components/Auth/SignUp';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { SkillStats } from './pages/SkillStats';
import { Feed } from './pages/Feed';
import { Work } from './pages/Work';
import { Projects } from './pages/Projects';
import { Competitions } from './pages/Competitions';
import { Profile } from './pages/Profile';
import { SkillVerification } from './pages/SkillVerification';

function AppContent() {
  const { user, login, signup } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentPage, setCurrentPage] = useState('home');
  const [verifyingSkill, setVerifyingSkill] = useState<string | null>(null);

  if (!user) {
    return authMode === 'login' ? (
      <Login onLogin={login} onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignUp onSignup={signup} onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  if (verifyingSkill) {
    return (
      <SkillVerification
        skillId={verifyingSkill}
        onBack={() => {
          setVerifyingSkill(null);
          setCurrentPage('home');
        }}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onVerifySkill={setVerifyingSkill} />;
      case 'skill-stats':
        return <SkillStats />;
      case 'feed':
        return <Feed />;
      case 'work':
        return <Work />;
      case 'projects':
        return <Projects />;
      case 'competitions':
        return <Competitions />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onVerifySkill={setVerifyingSkill} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
