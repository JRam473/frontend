//src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

// App principal (mantener normal)
import App from './App.tsx';
import { MinimalLayout } from './MinimalLayout';

// 🔥 CORREGIR LAZY IMPORTS PARA COMPONENTES NAMED EXPORTS
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const TourismSection = lazy(() => import('./pages/TourismSection.tsx').then(module => ({ default: module.TourismSection })));
const CulturePage = lazy(() => import('./pages/CulturePage').then(module => ({ default: module.CulturePage })));
const CommunitySection = lazy(() => import('./pages/CommunitySection.tsx').then(module => ({ default: module.CommunitySection })));
const GallerySection = lazy(() => import('./pages/GallerySection.tsx').then(module => ({ default: module.GallerySection })));
const ContactSection = lazy(() => import('./ContactSection').then(module => ({ default: module.ContactSection })));
const OAuthCallback = lazy(() => import('./pages/OAuthCallback').then(module => ({ default: module.OAuthCallback })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const CalendarPage = lazy(() => import('./pages/CalendarPage').then(module => ({ default: module.CalendarPage })));
const GastronomyPage = lazy(() => import('./pages/GastronomyPage.tsx').then(module => ({ default: module.GastronomyPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const PanelPlaceSection = lazy(() => import('./pages/PanelPlaceSection').then(module => ({ default: module.PanelPlaceSection })));
const CooperativaPage = lazy(() => import('./pages/CooperativaPage.tsx').then(module => ({ default: module.CooperativaPage })));
const ExploradorAtractivosTuristicos = lazy(() => import('./turismo/section/ExploradorAtractivosTuristicos.tsx').then(module => ({ default: module.ExploradorAtractivosTuristicos })));
const SuccessPage = lazy(() => import('./pages/SuccessPage.tsx').then(module => ({ default: module.SuccessPage })));



// Componentes que NO van en lazy
import { AuthProvider } from '@/hooks/useAuth'; 
import { ProtectedRoute } from './components/ProtectedRoute';
import { SilentErrorBoundary } from './components/SilentErrorBoundary';
import { SilentRouteError } from './components/SilentRouteError';
import { TranslationProvider } from './contexts/TranslationContext';

// Componente Loading
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <SilentRouteError />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ) 
      },
      { 
        path: 'turismo', 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TourismSection />
          </Suspense>
        ) 
      },
      { 
        path: 'cultura', 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CulturePage />
          </Suspense>
        ) 
      },
      { 
        path: 'comunidad', 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CommunitySection />
          </Suspense>
        ) 
      },
      { 
        path: 'galeria', 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GallerySection />
          </Suspense>
        ) 
      },
      { 
        path: 'contacto', 
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactSection />
          </Suspense>
        ) 
      },
      {
        path: 'perfil',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin-places',
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Suspense fallback={<LoadingSpinner />}>
              <PanelPlaceSection />
            </Suspense>
          </ProtectedRoute>
        )
      }
    ],
  },
  {
    path: '/login',
    element: (
      <MinimalLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      </MinimalLayout>
    ),
  },
  {
    path: '/calendario-cultural',
    element: (
      <MinimalLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <CalendarPage />
        </Suspense>
      </MinimalLayout>
    )
  },
  {
    path: '/section-gastronomia',
    element: (
      <MinimalLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <GastronomyPage />
        </Suspense>
      </MinimalLayout>
    )
  },
  {
    path: '/section-atracciones',
    element: (
      <MinimalLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <ExploradorAtractivosTuristicos />
        </Suspense>
      </MinimalLayout>
    )
  },
  {
  path: '/success',
  element: (
    <MinimalLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <SuccessPage />
      </Suspense>
    </MinimalLayout>
  )
},
  {
    path: '/section-cooperativa',
    element: (
      <MinimalLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <CooperativaPage />
        </Suspense>
      </MinimalLayout>
    )
  },
  {
    path: '/oauth-callback',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <OAuthCallback />
      </Suspense>
    ),
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento root');
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <SilentErrorBoundary>
      <TranslationProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </TranslationProvider>
    </SilentErrorBoundary>
  </StrictMode>
);