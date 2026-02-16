'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Download } from 'lucide-react';
import { useThemeStore } from '@/lib/stores/theme-store';
import {
  generateCSS,
  generateTailwindV3Config,
  generateTailwindV4Config,
  generateShadcnConfig,
  generateJSON,
} from '@/lib/theme/code-generator';

interface ExportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function ExportDialog({ open, onOpenChange, trigger }: ExportDialogProps) {
  const { config } = useThemeStore();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (code: string, format: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exports = [
    {
      id: 'css',
      label: 'CSS Variables',
      filename: 'globals.css',
      code: generateCSS(config),
      language: 'css',
    },
    {
      id: 'tailwind-v3',
      label: 'Tailwind v3',
      filename: 'tailwind.config.js',
      code: generateTailwindV3Config(config),
      language: 'javascript',
    },
    {
      id: 'tailwind-v4',
      label: 'Tailwind v4',
      filename: 'tailwind-v4.css',
      code: generateTailwindV4Config(config),
      language: 'css',
    },
    {
      id: 'shadcn',
      label: 'shadcn/ui',
      filename: 'components.json',
      code: generateShadcnConfig(config),
      language: 'json',
    },
    {
      id: 'json',
      label: 'JSON',
      filename: 'theme.json',
      code: generateJSON(config),
      language: 'json',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Export Theme</DialogTitle>
          <DialogDescription>
            Export your theme configuration in various formats.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="css" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-full">
            {exports.map((exp) => (
              <TabsTrigger key={exp.id} value={exp.id} className="flex-1 text-xs">
                {exp.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {exports.map((exp) => (
            <TabsContent
              key={exp.id}
              value={exp.id}
              className="flex-1 overflow-hidden flex flex-col mt-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{exp.filename}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(exp.code, exp.id)}
                  >
                    {copied === exp.id ? (
                      <Check className="h-4 w-4 mr-1.5" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1.5" />
                    )}
                    {copied === exp.id ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(exp.code, exp.filename)}
                  >
                    <Download className="h-4 w-4 mr-1.5" />
                    Download
                  </Button>
                </div>
              </div>

              <pre className="flex-1 overflow-auto rounded-lg border bg-muted p-4 text-xs font-mono">
                {exp.code}
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
