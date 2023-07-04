import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";


import Header from '../Header';
import Footer from '../Footer';
import HomePage from '../../components/HomePage';
import SignUpPage from '../../components/SignUpPage';
import LoginPage from '../LoginPage';
import ContactPage from "../ContactPage";
import PasswordResetPage from "../PasswordResetPage";
import TeamPage from "../TeamPage";
import SearchResultPage from "../SearchResultPage";
import ErrorPage from "../ErrorPage";
import Loading from "../Loading";
import DeckPage from "../DeckPage";


export default function App() {

  const isConnected = useSelector((state: any) => state.session.status);
  return (
    <>
      <Header />
      <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/search-result" element={<SearchResultPage />} />
          <Route path="/decks" element={<DeckPage />}/>
          <Route path="*" element={<ErrorPage />} />
          {/* Routes privées */}
          {/* Ici se fait la vérification du token */}
          {
            isConnected && (
              <>
                <Route path="/profil" element={<Loading />} />
                <Route path="/logout"></Route>
              </>
            )
          }
        </Routes>
      <Footer />
    </>
  )
};
