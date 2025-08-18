import App from "./App";
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Invest from "./pages/invest";
import Withdraw from "./pages/withdraw";
import AddWallet from "./pages/addWallet";
import Admin from "./pages/admin";
import CashContributionDashboardPage from "./pages/cashcontributiondashboard";
import AllUsers from "./pages/allUsers";
import ApprovedDeposits from "./pages/approveddeposits";
import ApprovedWithdrawals from "./pages/approvedwithdrawals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PendingDeposits from "./pages/pendingdeposits";
import PendingWithdrawals from "./pages/pendingWithdrawals";
import TravelAndExpense from "./pages/travelandexpense";
import HealthBenefits from "./pages/healthbenefits";
import Covid19Benefits from "./pages/covid19benefits";
import MedicalSupport from "./pages/medicalsupport";
import CashContribution from "./pages/cashcontribution";
import CoinSelectionPage from "./pages/setCoins";
import ForgotPasswordPage from "./pages/forgotpassword";
import ResetPasswordPage from "./pages/resetpassword";
import SendMessagePage from "./pages/sendMessage";
import HealthInsurancePage from "./pages/healthinsurance";
import MedicalSupportDashboard from "./pages/MedicalSupportDashboard";
import CovidDashboard from "./pages/covid19benefitsdashboard";
import HealthInsuranceDashboard from "./pages/healthinsurancedashboard";
import TravelExpenseDashboard from "./pages/travelandexpensedashboard";
import TravelRequest from "./pages/travelRequestPage";
import PaymentsPage from "./pages/payment";
import PaymentsControllerPage from "./pages/paymentController";
import TravelAdminPage from "./pages/tripsController";
import CreditUser from "./pages/creditUser";


const RoutingComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/travelrequest" element={<TravelRequest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/medicalsupport" element={<MedicalSupportDashboard />} />
        <Route path="/dashboard/covid" element={<CovidDashboard />} />
        <Route path="/dashboard/contribution" element={<CashContributionDashboardPage />} />
        <Route path="/dashboard/insurance" element={<HealthInsuranceDashboard />} />
        <Route path="/dashboard/trips" element={<TravelExpenseDashboard />} />
        <Route path="/dashboard/payment" element={<PaymentsPage />} />
        <Route path="/admin/payments" element={<PaymentsControllerPage />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/addwallet" element={<AddWallet />} />
        <Route path="/healthinsurance" element={<HealthInsurancePage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword/:id" element={<ResetPasswordPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/trips" element={<TravelAdminPage />} />
        <Route path="/admin/approveddeposits" element={<ApprovedDeposits />} />
        <Route path="/admin/pendingdeposits" element={<PendingDeposits />} />
        <Route path="/admin/setcoins" element={<CoinSelectionPage />} />
        <Route path="/admin/sendmessage" element={<SendMessagePage />} />
        <Route path="/admin/credituser" element={<CreditUser />} />
        <Route
          path="/admin/pendingwithdrawals"
          element={<PendingWithdrawals />}
        />
        <Route path="/travelandexpense" element={<TravelAndExpense />} />
        <Route path="/healthbenefits" element={<HealthBenefits />} />
        <Route path="/covid19benefits" element={<Covid19Benefits />} />
        <Route path="/medicalsupport" element={<MedicalSupport />} />
        <Route path="/cashcontribution" element={<CashContribution />} />
        <Route
          path="/admin/approvedwithdrawals"
          element={<ApprovedWithdrawals />}
        />
      </Routes>
    </Router>
  );
};
export default RoutingComponent;
