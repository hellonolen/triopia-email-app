import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Link2, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = 'Type your message...', minHeight = '240px' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: `min-height: ${minHeight}; padding: 16px; outline: none; font-size: 14px; line-height: 1.6; color: #2A2A2A;`,
      },
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 8px',
        background: active ? '#F0EBE6' : 'transparent',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = '#FFFBF7';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }}
    >
      {children}
    </button>
  );

  return (
    <div style={{ border: 'none', borderRadius: '4px', background: 'white' }}>
      {/* Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        padding: '8px', 
        borderBottom: '1px solid #F0EBE6',
        flexWrap: 'wrap'
      }}>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <Bold style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <Italic style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        >
          <UnderlineIcon style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <div style={{ width: '1px', height: '24px', background: '#F0EBE6', margin: '0 4px' }} />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          <List style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          <ListOrdered style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <div style={{ width: '1px', height: '24px', background: '#F0EBE6', margin: '0 4px' }} />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
        >
          <AlignLeft style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
        >
          <AlignCenter style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
        >
          <AlignRight style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <div style={{ width: '1px', height: '24px', background: '#F0EBE6', margin: '0 4px' }} />

        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          active={editor.isActive('link')}
        >
          <Link2 style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const url = window.prompt('Enter image URL:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <ImageIcon style={{ width: '16px', height: '16px', color: '#2A2A2A', strokeWidth: 1.5 }} />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
