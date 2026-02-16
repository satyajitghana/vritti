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
import { Input } from '@/components/ui/input';
import { Copy, Check } from 'lucide-react';
import { useThemeUrlState } from '@/lib/theme/use-theme-url-state';

interface ShareDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function ShareDialog({ open, onOpenChange, trigger }: ShareDialogProps) {
  const { generateShareableUrl } = useThemeUrlState();
  const [copied, setCopied] = useState(false);

  const shareUrl = generateShareableUrl();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Theme</DialogTitle>
          <DialogDescription>
            Share your theme with others using this URL.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              readOnly
              value={shareUrl}
              className="flex-1 font-mono text-xs"
            />
            <Button onClick={handleCopy} variant="outline">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Anyone with this URL will be able to view and use your theme configuration.
            The theme is encoded in the URL and not stored on any server.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
