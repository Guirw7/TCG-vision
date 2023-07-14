import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import './style-main.scss';


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
import ProfilePage from "../ProfilePage";
import DeckEditorPage from "../DeckEditorPage";
import DeckDetail from "../DeckDetail";
import CollectionPage from "../CollectionPage";
import CollectionEditorPage from "../CollectionEditorPage";


export default function App() {

  const isConnected = useSelector((state: any) => state.session.status);
  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/search-result" element={<SearchResultPage />} />
          <Route path="/decks" element={<DeckPage />}/>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/logout"></Route>
          <Route path="/deck-creator" element={<DeckEditorPage />}/>
          <Route path="/deck-detail" element={<DeckDetail />}/>
          <Route path="/collections" element={<CollectionPage />}/>
          <Route path="/collection" element={<CollectionEditorPage />}/>
        </Routes>
      <Footer />
    </>
  )
};
