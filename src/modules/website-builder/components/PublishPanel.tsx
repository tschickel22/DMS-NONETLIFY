import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe, ExternalLink, Settings } from 'lucide-react'
import { Site } from '../types'
import { websiteService } from '@/services/website/service'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useToast } from '@/hooks/use-toast'

interface PublishPanelProps {
  site: Site
  onSiteUpdate: (updates: Partial<Site>) => void
  mode: 'platform' | 'company'
}

export default function PublishPanel({ site, onSiteUpdate, mode }: PublishPanelProps) {
  const [publishing, setPublishing] = useState(false)
  const { handleError } = useErrorHandler()
  const { toast } = useToast()

  const handlePublish = async () => {
    try {
      setPublishing(true)
      const result = await websiteService.publishSite(site.id)
      
      if (result.success) {
        onSiteUpdate({ 
          isPublished: true, 
          publishedAt: result.publishedAt 
        })
        toast({ 
          title: 'Published!', 
          description: 'Your website is now live' 
        })
      } else {
        throw new Error(result.error || 'Publishing failed')
      }
    } catch (error) {
      handleError(error, 'publishing site')
    } finally {
      setPublishing(false)
    }
  }

  const previewUrl = site.domain 
    ? `https://${site.domain}` 
    : `${window.location.origin}/s/${site.slug}/`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Status</span>
            <Badge variant={site.isPublished ? 'default' : 'secondary'}>
              {site.isPublished ? 'Published' : 'Draft'}
            </Badge>
          </div>
          {site.publishedAt && (
            <p className="text-xs text-muted-foreground">
              Last published: {new Date(site.publishedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div>
          <span className="text-sm font-medium">Preview URL</span>
          <div className="mt-1 flex items-center space-x-2">
            <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
              {previewUrl}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(previewUrl, '_blank')}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={handlePublish} 
            disabled={publishing}
            className="w-full"
          >
            <Globe className="h-4 w-4 mr-2" />
            {publishing ? 'Publishing...' : 'Publish Website'}
          </Button>
          
          <Button variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Domain Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}