import { Home, Queue, Database, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Home },
    { id: 'queue', label: 'قائمة الانتظار', icon: Queue },
    { id: 'database', label: 'قاعدة البيانات', icon: Database },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ]

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-sidebar-foreground">مترجم أخبار الأنمي</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start text-right"
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="ml-2 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar

