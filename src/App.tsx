import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, LessonPage } from './pages';

function App() {
  return (
    <BrowserRouter basename="/kids-typing-app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
