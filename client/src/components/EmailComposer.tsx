import { useState } from 'react';
import { X, Send, Paperclip, Image as ImageIcon, Smile, Bold, Italic, Link as LinkIcon, List, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeechToText from './SpeechToText';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface EmailComposerProps {
  onClose: () => void;
  onSend: (email: { to: string; subject: string; body: string }) => void;
}

export default function EmailComposer({ onClose, onSend }: EmailComposerProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [cc, setCC] = useState('');
  const [bcc, setBCC] = useState('');
  const [showCCBCC, setShowCCBCC] = useState(false);
  const [activeField, setActiveField] = useState<'to' | 'cc' | 'bcc' | 'subject' | 'body'>('body');
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const { data: accounts } = trpc.email.listAccounts.useQuery();
  const sendEmailMutation = trpc.email.send.useMutation();

  const handleTranscript = (transcript: string) => {
    switch (activeField) {
      case 'to':
        setTo(prev => prev ? prev + ' ' + transcript : transcript);
        break;
      case 'cc':
        setCC(prev => prev ? prev + ' ' + transcript : transcript);
        break;
      case 'bcc':
        setBCC(prev => prev ? prev + ' ' + transcript : transcript);
        break;
      case 'subject':
        setSubject(prev => prev ? prev + ' ' + transcript : transcript);
        break;
      case 'body':
        setBody(prev => prev ? prev + ' ' + transcript : transcript);
        break;
    }
  };

  const handleSend = async () => {
    if (!to || !subject || !body) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!accounts || accounts.length === 0) {
      toast.error('No email account connected');
      return;
    }

    setIsSending(true);
    try {
      // Convert attachments to base64 if any
      const attachmentData = await Promise.all(
        attachments.map(async (file) => {
          const buffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(buffer);
          let binary = '';
          for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
          }
          const base64 = btoa(binary);
          return {
            filename: file.name,
            content: base64,
            contentType: file.type
          };
        })
      );

      await sendEmailMutation.mutateAsync({
        accountId: accounts[0].id,
        to,
        subject,
        body,
        cc: cc || undefined,
        bcc: bcc || undefined,
        attachments: attachmentData.length > 0 ? attachmentData : undefined
      });

      toast.success('Email sent successfully');
      onSend({ to, subject, body });
      onClose();
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">New Message</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Fields */}
        <div className="p-4 space-y-3 border-b border-border">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-12">To:</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() => setActiveField('to')}
              placeholder="recipient@example.com"
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm
                       focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                       transition-all duration-200"
            />
            {!showCCBCC && (
              <button
                onClick={() => setShowCCBCC(true)}
                className="text-xs text-primary hover:underline"
              >
                CC/BCC
              </button>
            )}
          </div>

          {showCCBCC && (
            <>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium w-12">CC:</label>
                <input
                  type="email"
                  value={cc}
              onChange={(e) => setCC(e.target.value)}
              onFocus={() => setActiveField('cc')}
              placeholder="cc@example.com"
                  className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm
                           focus:bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium w-12">BCC:</label>
                <input
                  type="email"
                  value={bcc}
              onChange={(e) => setBCC(e.target.value)}
              onFocus={() => setActiveField('bcc')}
              placeholder="bcc@example.com"
                  className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm
                           focus:bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                           transition-all duration-200"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-12">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onFocus={() => setActiveField('subject')}
              placeholder="Email subject"
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm
                       focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                       transition-all duration-200"
            />
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-border bg-muted">
          <button className="p-2 hover:bg-muted rounded transition-all duration-200" title="Bold">
            <Bold className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-all duration-200" title="Italic">
            <Italic className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-all duration-200" title="Link">
            <LinkIcon className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-all duration-200" title="Bullet List">
            <List className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-all duration-200" title="Align">
            <AlignLeft className="w-4 h-4" />
          </button>
          <div className="flex-1" />
          <button className="p-2 hover:bg-muted rounded transition-all duration-200" title="Insert Image">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-all duration-200" title="Emoji">
            <Smile className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-all duration-200" title="Attach File">
            <Paperclip className="w-4 h-4" />
          </button>
          <SpeechToText onTranscript={handleTranscript} />
        </div>

        {/* Email Body */}
        <div className="flex-1 p-4 overflow-y-auto">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={() => setActiveField('body')}
            placeholder="Write your message..."
            className="w-full h-full min-h-[300px] bg-background border-none resize-none
                     focus:outline-none text-sm leading-relaxed"
          />
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="p-3 border-t border-border bg-muted">
            <div className="flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg text-sm">
                  <Paperclip className="w-3 h-3" />
                  <span>{file.name}</span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="ml-2 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted">
          <div className="flex items-center gap-2">
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="p-2 hover:bg-background rounded-lg cursor-pointer transition-all"
              title="Attach files"
            >
              <Paperclip className="w-4 h-4" />
            </label>
            <div className="text-xs text-muted-foreground">
              Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl+Enter</kbd> to send
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Discard
            </Button>
            <Button
              onClick={handleSend}
              disabled={!to || !subject || !body || isSending}
              className="bg-primary hover:bg-primary"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
