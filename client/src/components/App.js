import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Home from "./Home";
import HeroPowerForm from "./HeroPowerForm";
import Power from "./Power";
import PowerEditForm from "./PowerEditForm";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes> {/* Change from Switch to Routes */}
          <Route path="/hero_powers/new" element={<HeroPowerForm />} /> {/* Use element prop instead of children */}
          <Route path="/powers/:id/edit" element={<PowerEditForm />} />
          <Route path="/powers/:id" element={<Power />} />
          <Route path="/heroes/:id" element={<Hero />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
