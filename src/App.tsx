import React, { Suspense, lazy, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, RouterProvider, registerRoutePrefetcher, useRouter } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PageTransition } from './components/MotionPrimitives';

const loadApplyPage = () => import('./pages/ApplyPage');
const loadRegistrationPage = () => import('./pages/RegistrationPage');
const loadAdminPage = () => import('./pages/AdminRegistrationsPage');
const loadCalendarPage = () => import('./pages/CalendarPlanPage');
const loadTracksProgramsPages = () => import('./pages/TracksAndProgramsPages');
const loadDirectoriesPages = () => import('./pages/DirectoriesPages');
const loadInfoGovernancePages = () => import('./pages/InfoAndGovernancePages');

const ApplyPage = lazy(() => loadApplyPage().then((m) => ({ default: m.ApplyPage })));
const RegistrationPage = lazy(() =>
  loadRegistrationPage().then((m) => ({ default: m.RegistrationPage }))
);
const AdminRegistrationsPage = lazy(() =>
  loadAdminPage().then((m) => ({ default: m.AdminRegistrationsPage }))
);
const CalendarPlanPage = lazy(() =>
  loadCalendarPage().then((m) => ({ default: m.CalendarPlanPage }))
);

const TracksPage = lazy(() =>
  loadTracksProgramsPages().then((m) => ({ default: m.TracksPage }))
);
const SponsorsPage = lazy(() =>
  loadTracksProgramsPages().then((m) => ({ default: m.SponsorsPage }))
);
const PaymentsPage = lazy(() =>
  loadTracksProgramsPages().then((m) => ({ default: m.PaymentsPage }))
);
const VenuePage = lazy(() =>
  loadTracksProgramsPages().then((m) => ({ default: m.VenuePage }))
);

const EntrepreneursPage = lazy(() =>
  loadDirectoriesPages().then((m) => ({ default: m.EntrepreneursPage }))
);
const WomenEntrepreneursPage = lazy(() =>
  loadDirectoriesPages().then((m) => ({ default: m.WomenEntrepreneursPage }))
);
const CorporatePage = lazy(() =>
  loadDirectoriesPages().then((m) => ({ default: m.CorporatePage }))
);
const AssociationsPage = lazy(() =>
  loadDirectoriesPages().then((m) => ({ default: m.AssociationsPage }))
);
const BanksPage = lazy(() => loadDirectoriesPages().then((m) => ({ default: m.BanksPage })));
const FinancialBrandsPage = lazy(() =>
  loadDirectoriesPages().then((m) => ({ default: m.FinancialBrandsPage }))
);

const AboutPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.AboutPage }))
);
const EventProgramPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.EventProgramPage }))
);
const SpeakersPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.SpeakersPage }))
);
const ValidationTeamPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.ValidationTeamPage }))
);
const PitchAreaPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.PitchAreaPage }))
);
const AiExpertsPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.AiExpertsPage }))
);
const CfoPointsPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.CfoPointsPage }))
);
const InvestorTeamPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.InvestorTeamPage }))
);
const InvestorsPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.InvestorsPage }))
);
const StartupPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.StartupPage }))
);
const GovernmentPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.GovernmentPage }))
);
const ContactPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.ContactPage }))
);
const TeamPage = lazy(() => loadInfoGovernancePages().then((m) => ({ default: m.TeamPage })));
const RegistrationPolicyPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.RegistrationPolicyPage }))
);
const BusinessGuidancePage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.BusinessGuidancePage }))
);
const InternationalPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.InternationalPage }))
);
const SchedulePage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.SchedulePage }))
);
const PrivacyPage = lazy(() =>
  loadInfoGovernancePages().then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() => loadInfoGovernancePages().then((m) => ({ default: m.TermsPage })));

const PREFETCH_MAP: Record<string, () => Promise<unknown>> = {
  '/apply': loadApplyPage,
  '/registration': loadRegistrationPage,
  '/admin/registrations': loadAdminPage,
  '/calendar-plan': loadCalendarPage,
  '/tracks': loadTracksProgramsPages,
  '/sponsors': loadTracksProgramsPages,
  '/payments': loadTracksProgramsPages,
  '/venue': loadTracksProgramsPages,
  '/entrepreneurs': loadDirectoriesPages,
  '/women-entrepreneurs': loadDirectoriesPages,
  '/corporate': loadDirectoriesPages,
  '/associations': loadDirectoriesPages,
  '/banks': loadDirectoriesPages,
  '/financial-brands': loadDirectoriesPages,
  '/about': loadInfoGovernancePages,
  '/event-program': loadInfoGovernancePages,
  '/speakers': loadInfoGovernancePages,
  '/chief-guests': loadInfoGovernancePages,
  '/validation-team': loadInfoGovernancePages,
  '/pitch-area': loadInfoGovernancePages,
  '/ai-experts': loadInfoGovernancePages,
  '/cfo-points': loadInfoGovernancePages,
  '/investor-team': loadInfoGovernancePages,
  '/investors': loadInfoGovernancePages,
  '/startup': loadInfoGovernancePages,
  '/government': loadInfoGovernancePages,
  '/contact': loadInfoGovernancePages,
  '/team': loadInfoGovernancePages,
  '/registration-policy': loadInfoGovernancePages,
  '/business-guidance': loadInfoGovernancePages,
  '/international': loadInfoGovernancePages,
  '/schedule': loadInfoGovernancePages,
  '/privacy': loadInfoGovernancePages,
  '/terms': loadInfoGovernancePages,
};

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-[#526075]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#c49a45] animate-pulse" aria-hidden="true" />
        <span>Loading summit page…</span>
      </div>
    </div>
  );
}

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

  useEffect(() => {
    return registerRoutePrefetcher((targetPath) => {
      const loader = PREFETCH_MAP[targetPath];
      if (loader) {
        void loader();
      }
    });
  }, []);

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

  return (
    <PageTransition routeKey={cleanPath}>
      <Suspense fallback={<RouteFallback />}>{renderPage()}</Suspense>
    </PageTransition>
  );
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
