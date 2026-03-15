"use client"

import * as React from "react"
import { Send, Linkedin, Link as LinkIcon, Check } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareButtonsProps {
  title: string;
  url?: string;
  children?: React.ReactNode;
}

export function ShareButtons({ title, url, children }: ShareButtonsProps) {
  const [copied, setCopied] = React.useState(false);
  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Havola nusxalandi!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children || (
          <Button variant="outline" size="icon" className="rounded-xl border-border/60 hover:bg-secondary/50">
            <Send className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border shadow-lg rounded-xl w-48">
        <DropdownMenuItem onClick={shareTelegram} className="cursor-pointer font-medium py-2.5 focus:bg-primary/5 focus:text-primary">
          <Send className="mr-2.5 h-4 w-4 text-[#0088cc]" />
          Telegramda ulashish
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareLinkedIn} className="cursor-pointer font-medium py-2.5 focus:bg-primary/5 focus:text-primary">
          <Linkedin className="mr-2.5 h-4 w-4 text-[#0077b5]" />
          LinkedIn-da ulashish
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy} className="cursor-pointer font-medium py-2.5 focus:bg-primary/5 focus:text-primary">
          {copied ? <Check className="mr-2.5 h-4 w-4 text-emerald-500" /> : <LinkIcon className="mr-2.5 h-4 w-4 opacity-70" />}
          Havolani nusxalash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
