import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import './App.css'

const Queue = ({ queue }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 ml-1" />في الانتظار</Badge>
      case 'translating':
        return <Badge variant="default"><Clock className="w-3 h-3 ml-1" />جاري الترجمة</Badge>
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 ml-1" />فشل</Badge>
      default:
        return <Badge variant="secondary">غير معروف</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-right">قائمة انتظار الترجمة</h2>
        <p className="text-muted-foreground text-right">المقالات الحالية في قائمة انتظار الترجمة</p>
      </div>

      {queue && queue.length > 0 ? (
        <div className="space-y-4">
          {queue.map((article, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="text-right flex-1">
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription className="mt-1">{article.url}</CardDescription>
                  </div>
                  {getStatusBadge(article.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground text-right">
                  {article.content && article.content.length > 100 
                    ? `${article.content.substring(0, 100)}...` 
                    : article.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">قائمة الانتظار فارغة</h3>
            <p className="text-muted-foreground text-center">
              لا توجد مقالات في قائمة انتظار الترجمة حالياً
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Queue

