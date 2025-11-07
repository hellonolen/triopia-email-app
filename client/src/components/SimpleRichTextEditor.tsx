import { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link2, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface SimpleRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function SimpleRichTextEditor({ value, onChange, placeholder, minHeight = '200px' }: SimpleRichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  return (
    <div style={{ border: '1px solid #F0EBE6', borderRadius: '4px', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        padding: '8px', 
        borderBottom: '1px solid #F0EBE6',
        backgroundColor: '#FFFBF7'
      }}>
        <button
          type="button"
          onClick={() => execCommand('bold')}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Bold"
        >
          <Bold size={16} color="#666" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Italic"
        >
          <Italic size={16} color="#666" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Underline"
        >
          <Underline size={16} color="#666" />
        </button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#F0EBE6', margin: '0 4px' }} />
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Bullet List"
        >
          <List size={16} color="#666" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Numbered List"
        >
          <ListOrdered size={16} color="#666" />
        </button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#F0EBE6', margin: '0 4px' }} />
        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Align Left"
        >
          <AlignLeft size={16} color="#666" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Align Center"
        >
          <AlignCenter size={16} color="#666" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Align Right"
        >
          <AlignRight size={16} color="#666" />
        </button>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#F0EBE6', margin: '0 4px' }} />
        <button
          type="button"
          onClick={insertLink}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Insert Link"
        >
          <Link2 size={16} color="#666" />
        </button>
        <button
          type="button"
          onClick={insertImage}
          style={{
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0EBE6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Insert Image"
        >
          <ImageIcon size={16} color="#666" />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          minHeight,
          padding: '16px',
          outline: 'none',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#333',
          backgroundColor: 'white'
        }}
        data-placeholder={placeholder}
      />
    </div>
  );
}
