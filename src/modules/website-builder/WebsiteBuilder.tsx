import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Globe, Settings, Trash2, Edit } from 'lucide-react'
import { websiteService } from '@/services/website/service'
import { Site } from './types'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useToast } from '@/hooks/use-toast'
import SiteEditor from './components/SiteEditor'
import CreateSiteModal from './components/CreateSiteModal'

interface WebsiteBuilderProps {
  mode?: 'platform' | 'company'
}

function SitesList({ mode, onCreateSite }: { mode: 'platform' | 'company', onCreateSite: () => void }) {
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { handleError } = useErrorHandler()
  const { toast } = useToast()

  useEffect(() => {
    loadSites()
  }, [])

  const loadSites = async () => {
    try {
      setLoading(true)
      const sitesData = await websiteService.getSites()
      setSites(sitesData)
    } catch (error) {
      handleError(error, 'loading sites')
    } finally {
      setLoading(false)
    }
  }

  const handleEditSite = (siteId: string) => {
    const basePath = mode === 'platform' ? '/platform/website-builder' : '/company/settings/website'
    navigate(`${basePath}/${siteId}`)
  }

  const handleDeleteSite = async (siteId: string) => {
    if (!confirm('Are you sure you want to delete this website?')) return
    
    try {
      await websiteService.deleteSite(siteId)
      toast({ title: 'Success', description: 'Website deleted successfully' })
      loadSites()
    } catch (error) {
      handleError(error, 'deleting site')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Website Builder</h1>
          <p className="text-muted-foreground">
            Create and manage your company websites
          </p>
        </div>
        <Button onClick={onCreateSite}>
          <Plus className="h-4 w-4 mr-2" />
          Create Website
        </Button>
      </div>

      {sites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No websites yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Get started by creating your first website
            </p>
            <Button onClick={onCreateSite}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Website
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Card key={site.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSite(site.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSite(site.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {site.slug}.{mode === 'platform' ? 'platform' : 'renterinsight'}.com
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    {site.pages?.length || 0} pages
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleEditSite(site.id)}
                  >
                    Edit Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WebsiteBuilder({ mode = 'platform' }: WebsiteBuilderProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleSiteCreated = (site: Site) => {
    // Refresh the sites list or navigate to editor
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <Routes>
        <Route 
          path="/" 
          element={
            <SitesList 
              mode={mode} 
              onCreateSite={() => setShowCreateModal(true)} 
            />
          } 
        />
        <Route 
          path="/:siteId" 
          element={<SiteEditor mode={mode} />} 
        />
      </Routes>

      <CreateSiteModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSiteCreated={handleSiteCreated}
        mode={mode}
      />
    </div>
  )
}