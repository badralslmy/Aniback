import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Save, Key, Palette, Settings as SettingsIcon } from 'lucide-react'
import './App.css'

const Settings = ({ onUpdateSettings }) => {
  const [settings, setSettings] = useState({
    // API Keys
    appwriteEndpoint: '',
    appwriteProjectId: '',
    appwriteApiKey: '',
    appwriteDatabaseId: '',
    appwriteCollectionId: '',
    geminiApiKey: '',
    scraperApiUrl: 'https://ani-news-api.vercel.app/api/news',
    
    // Visual Settings
    mainColor: '#3b82f6',
    theme: 'light',
    
    // Functional Settings
    preventCors: true,
    fetchBatchSize: 10,
    autoFetchInterval: 30
  })

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onUpdateSettings(settings)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-right">الإعدادات</h2>
        <p className="text-muted-foreground text-right">إدارة إعدادات النظام ومفاتيح API</p>
      </div>

      <div className="grid gap-6">
        {/* API Keys Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Key className="h-5 w-5" />
              مفاتيح API
            </CardTitle>
            <CardDescription className="text-right">
              إدارة مفاتيح الوصول للخدمات الخارجية
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="appwrite-endpoint" className="text-right">نقطة نهاية Appwrite</Label>
              <Input
                id="appwrite-endpoint"
                value={settings.appwriteEndpoint}
                onChange={(e) => handleInputChange('appwriteEndpoint', e.target.value)}
                placeholder="https://cloud.appwrite.io/v1"
                className="text-right"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="appwrite-project" className="text-right">معرف مشروع Appwrite</Label>
              <Input
                id="appwrite-project"
                value={settings.appwriteProjectId}
                onChange={(e) => handleInputChange('appwriteProjectId', e.target.value)}
                placeholder="معرف المشروع"
                className="text-right"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="appwrite-api-key" className="text-right">مفتاح API لـ Appwrite</Label>
              <Input
                id="appwrite-api-key"
                type="password"
                value={settings.appwriteApiKey}
                onChange={(e) => handleInputChange('appwriteApiKey', e.target.value)}
                placeholder="مفتاح API السري"
                className="text-right"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="appwrite-database" className="text-right">معرف قاعدة البيانات</Label>
              <Input
                id="appwrite-database"
                value={settings.appwriteDatabaseId}
                onChange={(e) => handleInputChange('appwriteDatabaseId', e.target.value)}
                placeholder="معرف قاعدة البيانات"
                className="text-right"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="appwrite-collection" className="text-right">معرف المجموعة</Label>
              <Input
                id="appwrite-collection"
                value={settings.appwriteCollectionId}
                onChange={(e) => handleInputChange('appwriteCollectionId', e.target.value)}
                placeholder="معرف المجموعة"
                className="text-right"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gemini-api-key" className="text-right">مفتاح Gemini API</Label>
              <Input
                id="gemini-api-key"
                type="password"
                value={settings.geminiApiKey}
                onChange={(e) => handleInputChange('geminiApiKey', e.target.value)}
                placeholder="مفتاح Gemini API"
                className="text-right"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="scraper-url" className="text-right">رابط Scraper API</Label>
              <Input
                id="scraper-url"
                value={settings.scraperApiUrl}
                onChange={(e) => handleInputChange('scraperApiUrl', e.target.value)}
                placeholder="https://ani-news-api.vercel.app/api/news"
                className="text-right"
              />
            </div>
          </CardContent>
        </Card>

        {/* Visual Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Palette className="h-5 w-5" />
              الإعدادات المرئية
            </CardTitle>
            <CardDescription className="text-right">
              تخصيص مظهر لوحة التحكم
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="main-color" className="text-right">اللون الرئيسي للموقع</Label>
              <Input
                id="main-color"
                type="color"
                value={settings.mainColor}
                onChange={(e) => handleInputChange('mainColor', e.target.value)}
                className="w-20 h-10"
              />
            </div>
            <div className="flex items-center justify-between">
              <Switch
                checked={settings.theme === 'dark'}
                onCheckedChange={(checked) => handleInputChange('theme', checked ? 'dark' : 'light')}
              />
              <Label className="text-right">الوضع المظلم</Label>
            </div>
          </CardContent>
        </Card>

        {/* Functional Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <SettingsIcon className="h-5 w-5" />
              الإعدادات الوظيفية
            </CardTitle>
            <CardDescription className="text-right">
              إعدادات تشغيل النظام
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Switch
                checked={settings.preventCors}
                onCheckedChange={(checked) => handleInputChange('preventCors', checked)}
              />
              <Label className="text-right">منع مشاكل CORS</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="batch-size" className="text-right">عدد المقالات لكل دفعة</Label>
              <Input
                id="batch-size"
                type="number"
                value={settings.fetchBatchSize}
                onChange={(e) => handleInputChange('fetchBatchSize', parseInt(e.target.value))}
                min="1"
                max="50"
                className="text-right"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fetch-interval" className="text-right">فترة الجلب التلقائي (بالدقائق)</Label>
              <Input
                id="fetch-interval"
                type="number"
                value={settings.autoFetchInterval}
                onChange={(e) => handleInputChange('autoFetchInterval', parseInt(e.target.value))}
                min="15"
                max="1440"
                className="text-right"
              />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full">
          <Save className="ml-2 h-4 w-4" />
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  )
}

export default Settings

