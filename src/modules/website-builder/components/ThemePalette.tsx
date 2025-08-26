import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Theme } from '../types'

interface ThemePaletteProps {
  theme?: Theme
  onThemeUpdate: (theme: Theme) => void
}

export default function ThemePalette({ theme, onThemeUpdate }: ThemePaletteProps) {
  const currentTheme = theme || {
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    fontFamily: 'Inter'
  }

  const handleColorChange = (key: keyof Theme, value: string) => {
    onThemeUpdate({
      ...currentTheme,
      [key]: value
    })
  }

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Montserrat', label: 'Montserrat' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="primary-color">Primary Color</Label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              id="primary-color"
              type="color"
              value={currentTheme.primaryColor}
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="w-12 h-8 rounded border"
            />
            <input
              type="text"
              value={currentTheme.primaryColor}
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="flex-1 px-2 py-1 text-sm border rounded"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="secondary-color">Secondary Color</Label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              id="secondary-color"
              type="color"
              value={currentTheme.secondaryColor}
              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              className="w-12 h-8 rounded border"
            />
            <input
              type="text"
              value={currentTheme.secondaryColor}
              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              className="flex-1 px-2 py-1 text-sm border rounded"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="font-family">Font Family</Label>
          <select
            id="font-family"
            value={currentTheme.fontFamily}
            onChange={(e) => handleColorChange('fontFamily', e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            {fontOptions.map(font => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  )
}