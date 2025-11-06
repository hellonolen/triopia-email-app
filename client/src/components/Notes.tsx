import { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Edit, Palette, Type, Eraser, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeechToText from './SpeechToText';

interface Note {
  id: number;
  title: string;
  content: string;
  type: 'text' | 'drawing';
  drawing?: string; // Base64 encoded drawing
  createdAt: string;
  updatedAt: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Meeting Notes - Q4 Review',
      content: 'Discuss marketing strategy, budget allocation, and team performance metrics.',
      type: 'text',
      createdAt: 'Nov 5, 2024',
      updatedAt: 'Nov 5, 2024',
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#1A2A4D');
  const [searchQuery, setSearchQuery] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCanvasDrawing, setIsCanvasDrawing] = useState(false);

  const colors = ['#1A2A4D', '#000000', '#EF4444', '#3B82F6', '#10B981', '#F59E0B'];

  useEffect(() => {
    if (selectedNote?.type === 'drawing' && canvasRef.current && selectedNote.drawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = selectedNote.drawing;
      }
    }
  }, [selectedNote]);

  const handleCreateNote = (type: 'text' | 'drawing') => {
    const newNote: Note = {
      id: Date.now(),
      title: `New ${type === 'text' ? 'Note' : 'Drawing'}`,
      content: '',
      type,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsDrawing(type === 'drawing');
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter(n => n.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(notes[0] || null);
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    setIsCanvasDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isCanvasDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const handleCanvasMouseUp = () => {
    setIsCanvasDrawing(false);
    if (canvasRef.current && selectedNote) {
      const drawing = canvasRef.current.toDataURL();
      setNotes(notes.map(n =>
        n.id === selectedNote.id ? { ...n, drawing } : n
      ));
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* Notes List */}
      <div className="w-[320px] border-r border-border flex flex-col bg-background">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Notes</h2>
            <div className="flex gap-1">
              <button
                onClick={() => handleCreateNote('text')}
                className="p-2 hover:bg-muted rounded-lg transition-all duration-200"
                title="New text note"
              >
                <Type className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCreateNote('drawing')}
                className="p-2 hover:bg-muted rounded-lg transition-all duration-200"
                title="New drawing"
              >
                <Palette className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm
                       focus:bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                       transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => {
                setSelectedNote(note);
                setIsDrawing(note.type === 'drawing');
              }}
              className={`
                p-4 border-b border-border cursor-pointer transition-all duration-200
                hover:bg-muted/50
                ${selectedNote?.id === note.id ? 'bg-muted border-l-4 border-primary' : ''}
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold truncate flex-1">{note.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                  className="p-1 hover:bg-muted rounded transition-all duration-200"
                >
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {note.type === 'drawing' ? '✏️ Drawing' : note.content || 'No content'}
              </p>
              <p className="text-xs text-muted-foreground">
                {note.updatedAt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 bg-background">
        {selectedNote ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => {
                  setNotes(notes.map(n =>
                    n.id === selectedNote.id ? { ...n, title: e.target.value } : n
                  ));
                  setSelectedNote({ ...selectedNote, title: e.target.value });
                }}
                className="text-xl font-semibold w-full bg-transparent border-none focus:outline-none mb-2"
              />
              <p className="text-xs text-muted-foreground">
                Last updated: {selectedNote.updatedAt}
              </p>
            </div>

            {/* Content */}
            {isDrawing ? (
              <div className="flex-1 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-sm font-medium">Color:</span>
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setDrawColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        drawColor === color ? 'border-primary scale-110' : 'border-border'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <button
                    onClick={clearCanvas}
                    className="ml-auto p-2 hover:bg-muted rounded-lg transition-all duration-200"
                    title="Clear canvas"
                  >
                    <Eraser className="w-4 h-4" />
                  </button>
                  <SpeechToText
                    onTranscript={(transcript) => {
                      setNotes(notes.map(n =>
                        n.id === selectedNote.id ? { ...n, title: n.title + ' ' + transcript } : n
                      ));
                      setSelectedNote({ ...selectedNote, title: selectedNote.title + ' ' + transcript });
                    }}
                  />
                </div>
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  className="border border-border rounded-lg bg-white cursor-crosshair"
                />
              </div>
            ) : (
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex items-center justify-end mb-2">
                  <SpeechToText
                    onTranscript={(transcript) => {
                      setNotes(notes.map(n =>
                        n.id === selectedNote.id ? { ...n, content: n.content + ' ' + transcript } : n
                      ));
                      setSelectedNote({ ...selectedNote, content: selectedNote.content + ' ' + transcript });
                    }}
                  />
                </div>
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => {
                    setNotes(notes.map(n =>
                      n.id === selectedNote.id ? { ...n, content: e.target.value } : n
                    ));
                    setSelectedNote({ ...selectedNote, content: e.target.value });
                  }}
                  placeholder="Start typing your notes..."
                  className="flex-1 w-full bg-transparent border-none focus:outline-none resize-none text-sm"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Edit className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No note selected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a new note or select one from the list
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => handleCreateNote('text')}>
                  <Type className="w-4 h-4 mr-2" />
                  Text Note
                </Button>
                <Button variant="outline" onClick={() => handleCreateNote('drawing')}>
                  <Palette className="w-4 h-4 mr-2" />
                  Drawing
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
