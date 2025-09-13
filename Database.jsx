import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Search, Calendar, ExternalLink } from 'lucide-react'
import './App.css'

const Database = ({ news }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const filteredNews = news?.filter(article => 
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.$createdAt) - new Date(a.$createdAt)
      case 'title':
        return a.title?.localeCompare(b.title) || 0
      default:
        return 0
    }
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-right">قاعدة البيانات</h2>
        <p className="text-muted-foreground text-right">الأخبار المترجمة المحفوظة في Appwrite</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في العناوين والمحتوى..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-right"
          />
        </div>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm"
        >
          <option value="date">ترتيب حسب التاريخ</option>
          <option value="title">ترتيب حسب العنوان</option>
        </select>
      </div>

      {sortedNews.length > 0 ? (
        <div className="space-y-4">
          {sortedNews.map((article, index) => (
            <Card key={article.$id || index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="text-right flex-1">
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.$createdAt)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={article.status === 'translated' ? 'default' : 'secondary'}>
                      {article.status === 'translated' ? 'مترجم' : article.status}
                    </Badge>
                    {article.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground text-right">
                  {article.content && article.content.length > 200 
                    ? `${article.content.substring(0, 200)}...` 
                    : article.content}
                </div>
                {article.media && article.media.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">
                      الوسائط: {article.media.length} عنصر
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm ? 'لم يتم العثور على مقالات تطابق البحث' : 'لا توجد مقالات مترجمة بعد'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Database

