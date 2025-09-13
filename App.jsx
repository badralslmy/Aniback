import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import Queue from './components/Queue.jsx'
import Database from './components/Database.jsx'
import Settings from './components/Settings.jsx'
import { Button } from '@/components/ui/button.jsx'
import { RefreshCw, Play } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [status, setStatus] = useState(null)
  const [queue, setQueue] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)

  const API_BASE = 'http://localhost:5001/api'

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/status`)
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error('Error fetching status:', error)
    }
  }

  const fetchQueue = async () => {
    try {
      const response = await fetch(`${API_BASE}/queue`)
      const data = await response.json()
      setQueue(data.queue || [])
    } catch (error) {
      console.error('Error fetching queue:', error)
    }
  }

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_BASE}/news`)
      const data = await response.json()
      setNews(data || [])
    } catch (error) {
      console.error('Error fetching news:', error)
    }
  }

  const triggerFetch = async () => {
    setLoading(true)
    try {
      await fetch(`${API_BASE}/fetch-news`)
      // Refresh data after triggering fetch
      setTimeout(() => {
        fetchStatus()
        fetchQueue()
        fetchNews()
        setLoading(false)
      }, 2000)
    } catch (error) {
      console.error('Error triggering fetch:', error)
      setLoading(false)
    }
  }

  const updateSettings = async (settings) => {
    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })
      // Refresh status after updating settings
      fetchStatus()
    } catch (error) {
      console.error('Error updating settings:', error)
    }
  }

  useEffect(() => {
    fetchStatus()
    fetchQueue()
    fetchNews()
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard status={status} />
      case 'queue':
        return <Queue queue={queue} />
      case 'database':
        return <Database news={news} />
      case 'settings':
        return <Settings onUpdateSettings={updateSettings} />
      default:
        return <Dashboard status={status} />
    }
  }

  return (
    <div className="flex h-screen bg-background" dir="rtl">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button onClick={triggerFetch} disabled={loading} size="sm">
                {loading ? (
                  <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Play className="ml-2 h-4 w-4" />
                )}
                جلب الأخبار الآن
              </Button>
              <Button onClick={() => { fetchStatus(); fetchQueue(); fetchNews(); }} variant="outline" size="sm">
                <RefreshCw className="ml-2 h-4 w-4" />
                تحديث البيانات
              </Button>
            </div>
            <h1 className="text-lg font-semibold">لوحة التحكم الإدارية</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
