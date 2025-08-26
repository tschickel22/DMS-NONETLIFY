import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Trash2, Image } from 'lucide-react'
import { websiteService } from '@/services/website/service'
import { Media } from '../types'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useToast } from '@/hooks/use-toast'

interface MediaManagerProps {
  siteId: string
}

export default function MediaManager({ siteId }: MediaManagerProps) {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const { handleError } = useErrorHandler()
  const { toast } = useToast()

  useEffect(() => {
    loadMedia()
  }, [siteId])

  const loadMedia = async () => {
    try {
      setLoading(true)
      const mediaData = await websiteService.getMedia(siteId)
      setMedia(mediaData)
    } catch (error) {
      handleError(error, 'loading media')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const uploadedMedia = await websiteService.uploadMedia(siteId, file)
      setMedia(prev => [uploadedMedia, ...prev])
      toast({ title: 'Success', description: 'File uploaded successfully' })
    } catch (error) {
      handleError(error, 'uploading file')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      await websiteService.deleteMedia(siteId, mediaId)
      setMedia(prev => prev.filter(m => m.id !== mediaId))
      toast({ title: 'Success', description: 'File deleted successfully' })
    } catch (error) {
      handleError(error, 'deleting file')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />
            <label htmlFor="file-upload">
              <Button asChild disabled={uploading}>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </span>
              </Button>
            </label>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Image className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">No media files yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {media.map((item) => (
                <div key={item.id} className="relative group">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-20 object-cover rounded border"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteMedia(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 truncate">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}