import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BrochureTemplateEditor() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/brochures')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Brochures
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Brochure Template Editor</h1>
            <p className="text-muted-foreground">Design your brochure template</p>
          </div>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>Brochure template editor coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}