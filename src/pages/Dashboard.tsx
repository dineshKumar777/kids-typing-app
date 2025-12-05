import { Link } from 'react-router-dom';
import { useUserStore } from '../store/lessonStore';
import { homeRowLessons } from '../data/lessons/homeRow';
import { LessonGrid, StatsOverview } from '../components/Dashboard';

export default function Dashboard() {
  const { progress, stats } = useUserStore();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl">⌨️</span>
              <span className="text-xl sm:text-2xl font-display font-bold text-primary-600">
                KidsType
              </span>
            </Link>
            
            <nav className="flex items-center gap-3 sm:gap-6">
              <Link 
                to="/" 
                className="text-text font-medium hover:text-primary-600 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/stats" 
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Stats
              </Link>
              <Link 
                to="/badges" 
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Badges
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <StatsOverview stats={stats} totalLessons={homeRowLessons.length} />
        
        {/* Home Row Lessons */}
        <LessonGrid
          lessons={homeRowLessons}
          progress={progress}
          sectionTitle="Home Row"
          sectionIcon="🏠"
        />
        
        {/* Coming Soon: More Rows */}
        <div className="mt-12 bg-gray-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🔜</div>
          <h3 className="text-xl font-display font-bold text-gray-600 mb-2">
            More Coming Soon!
          </h3>
          <p className="text-gray-500">
            Top Row, Bottom Row, and Numbers will be available after you master the Home Row.
          </p>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          Made with ❤️ for young typists | KidsType © 2024
        </div>
      </footer>
    </div>
  );
}
