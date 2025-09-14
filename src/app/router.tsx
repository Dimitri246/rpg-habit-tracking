import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Habits from '../pages/Habits';
import Quests from '../pages/Quests';
import Shop from '../pages/Shop';
import Profile from '../pages/Profile';

export default function Router() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}
