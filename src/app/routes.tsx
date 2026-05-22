import { createBrowserRouter, Navigate } from "react-router-dom";
import { CRMLayout } from "./crm/CRMLayout";
import { DashboardScreen } from "./crm/screens/DashboardScreen";
import { LeadsScreen } from "./crm/screens/LeadsScreen";
import { LeadDetailsScreen } from "./crm/screens/LeadDetailsScreen";
import { SimulationsScreen } from "./crm/screens/SimulationsScreen";
import { WhatsAppClicksScreen } from "./crm/screens/WhatsAppClicksScreen";
import { AbandonedLeadsScreen } from "./crm/screens/AbandonedLeadsScreen";
import { ReportsScreen } from "./crm/screens/ReportsScreen";
import { SettingsScreen } from "./crm/screens/SettingsScreen";
import { DepoimentosScreen } from "./crm/screens/DepoimentosScreen";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import App from "./App";
import { HomologacaoPage } from "./pages/HomologacaoPage";

export const router = createBrowserRouter([
  // Site público
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/homologacao",
    element: <HomologacaoPage />,
  },
  // Área administrativa — protegida por login
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <CRMLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardScreen },
      { path: "leads", Component: LeadsScreen },
      { path: "leads/:id", Component: LeadDetailsScreen },
      { path: "simulacoes", Component: SimulationsScreen },
      { path: "whatsapp", Component: WhatsAppClicksScreen },
      { path: "abandonados", Component: AbandonedLeadsScreen },
      { path: "relatorios", Component: ReportsScreen },
      { path: "depoimentos", Component: DepoimentosScreen },
      { path: "configuracoes", Component: SettingsScreen },
    ],
  },
  // Qualquer rota desconhecida redireciona para o site
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
