import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Activity, FileText, Clock, AlertCircle } from 'lucide-react'
import './App.css'

const Dashboard = ({ status }) => {
  const stats = [
    {
      title: 'إجمالي المقالات',
      value: status?.total_articles_fetched || 0,
      icon: FileText,
      description: 'المقالات المجلبة'
    },
    {
      title: 'قائمة الانتظار',
      value: status?.articles_in_queue || 0,
      icon: Clock,
      description: 'مقالات في الانتظار'
    },
    {
      title: 'مترجمة بنجاح',
      value: status?.successfully_translated || 0,
      icon: Activity,
      description: 'ترجمات مكتملة'
    },
    {
      title: 'فشل الترجمة',
      value: status?.failed_translations || 0,
      icon: AlertCircle,
      description: 'ترجمات فاشلة'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-right">لوحة التحكم</h2>
        <p className="text-muted-foreground text-right">نظرة عامة على نظام ترجمة أخبار الأنمي</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-right">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-right">{stat.value}</div>
                <p className="text-xs text-muted-foreground text-right">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-right">حالة الخادم</CardTitle>
            <CardDescription className="text-right">معلومات حالة النظام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant={status?.server_status === 'online' ? 'default' : 'destructive'}>
                {status?.server_status === 'online' ? 'متصل' : 'غير متصل'}
              </Badge>
              <span className="text-sm">حالة الخادم</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{status?.average_translation_time || 'غير متاح'}</span>
              <span className="text-sm">متوسط وقت الترجمة</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{status?.average_news_fetching_time || 'غير متاح'}</span>
              <span className="text-sm">متوسط وقت جلب الأخبار</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-right">حالة مفاتيح API</CardTitle>
            <CardDescription className="text-right">حالة الاتصال بالخدمات الخارجية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant={status?.api_keys_status?.scraper_api === 'configured' ? 'default' : 'destructive'}>
                {status?.api_keys_status?.scraper_api === 'configured' ? 'مُكوّن' : 'غير مُكوّن'}
              </Badge>
              <span className="text-sm">Scraper API</span>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant={status?.api_keys_status?.gemini_api === 'configured' ? 'default' : 'destructive'}>
                {status?.api_keys_status?.gemini_api === 'configured' ? 'مُكوّن' : 'غير مُكوّن'}
              </Badge>
              <span className="text-sm">Gemini API</span>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant={status?.api_keys_status?.appwrite === 'configured' ? 'default' : 'destructive'}>
                {status?.api_keys_status?.appwrite === 'configured' ? 'مُكوّن' : 'غير مُكوّن'}
              </Badge>
              <span className="text-sm">Appwrite</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

