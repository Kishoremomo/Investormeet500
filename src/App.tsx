import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, RouterProvider, useRouter } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ApplyPage } from './pages/ApplyPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AdminRegistrationsPage } from './pages/AdminRegistrationsPage';
import { CalendarPlanPage } from './pages/CalendarPlanPage';
import {
  PaymentsPage,
  SponsorsPage,
  TracksPage,
  VenuePage,
} from './pages/TracksAndProgramsPages';
import {
  AssociationsPage,
  BanksPage,
  CorporatePage,
  EntrepreneursPage,
  FinancialBrandsPage,
  WomenEntrepreneursPage,
} from './pages/DirectoriesPages';
import {
  AboutPage,
  AiExpertsPage,
  BusinessGuidancePage,
  CfoPointsPage,
  ContactPage,
  EventProgramPage,
  GovernmentPage,
  InternationalPage,
  InvestorsPage,
  InvestorTeamPage,
  PitchAreaPage,
  PrivacyPage,
  RegistrationPolicyPage,
  SchedulePage,
  SpeakersPage,
  StartupPage,
  TeamPage,
  TermsPage,
  ValidationTeamPage,
} from './pages/InfoAndGovernancePages';

import { PageTransition } from './components/MotionPrimitives';

function NotFoundPage({ path }: { path: string }) {
  return (
    <section className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5d14]">
        PAGE NOT FOUND
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-[#0f172a]">
        We couldn’t find “{path}”
      </h1>
      <p className="mt-4 text-sm sm:text-base text-[#334155] max-w-lg mx-auto">
        Explore the Investor Meet 500 directories, investment tracks, or return to the summit
        overview.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/"
          className="btn-obsidian inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Return Home</span>
        </Link>
      </div>
    </section>
  );
}

function RouteSwitch() {
  const { pathname } = useRouter();
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

  const renderPage = () => {
    switch (cleanPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/tracks':
        return <TracksPage />;
      case '/entrepreneurs':
        return <EntrepreneursPage />;
      case '/sponsors':
        return <SponsorsPage />;
      case '/payments':
        return <PaymentsPage />;
      case '/venue':
        return <VenuePage />;
      case '/apply':
        return <ApplyPage />;
      case '/registration':
        return <RegistrationPage />;
      case '/admin/registrations':
        return <AdminRegistrationsPage />;
      case '/calendar-plan':
        return <CalendarPlanPage />;
      case '/event-program':
        return <EventProgramPage />;
      case '/speakers':
      case '/chief-guests':
        return <SpeakersPage />;
      case '/validation-team':
        return <ValidationTeamPage />;
      case '/pitch-area':
        return <PitchAreaPage />;
      case '/ai-experts':
        return <AiExpertsPage />;
      case '/cfo-points':
        return <CfoPointsPage />;
      case '/investor-team':
        return <InvestorTeamPage />;
      case '/investors':
        return <InvestorsPage />;
      case '/startup':
        return <StartupPage />;
      case '/government':
        return <GovernmentPage />;
      case '/contact':
        return <ContactPage />;
      case '/team':
        return <TeamPage />;
      case '/registration-policy':
        return <RegistrationPolicyPage />;
      case '/business-guidance':
        return <BusinessGuidancePage />;
      case '/international':
        return <InternationalPage />;
      case '/women-entrepreneurs':
        return <WomenEntrepreneursPage />;
      case '/schedule':
        return <SchedulePage />;
      case '/corporate':
        return <CorporatePage />;
      case '/associations':
        return <AssociationsPage />;
      case '/banks':
        return <BanksPage />;
      case '/financial-brands':
        return <FinancialBrandsPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        return <NotFoundPage path={cleanPath} />;
    }
  };

  return <PageTransition routeKey={cleanPath}>{renderPage()}</PageTransition>;
}

export default function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen flex flex-col bg-[#fafaf8] text-[#0f172a]">
        <Header />
        <main id="main" className="flex-1">
          <RouteSwitch />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
}
