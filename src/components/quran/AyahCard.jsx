import { Copy, Bookmark, BookmarkCheck, Check } from 'lucide-react';
import { useState } from 'react';
import { highlightMatch } from '@/utils/arabic-utils';

export default function AyahCard({ ayah, query, isSaved, onSave, onRemove }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ayah.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/95 rounded-3xl p-8 border border-emerald-900/10 hover:border-gold-300 transition-all shadow-xl hover:shadow-2xl group relative overflow-hidden">
      {/* Surah Reference Corner */}
      <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1">
        <div className="bg-emerald-950 text-gold-accent px-4 py-1.5 rounded-full text-base font-bold shadow-lg shadow-emerald-950/20 whitespace-normal">
          Surah {ayah.surahNumber}:{ayah.ayahNumber} {ayah.surahName}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-10 mb-8 min-h-24">
        <div className="text-right font-scheherazade text-3xl md:text-5xl leading-relaxed text-emerald-950 selection:bg-gold-100 whitespace-normal" dir="rtl">
          {highlightMatch(ayah.text, query)}
        </div>
      </div>

      <hr className="mb-6 opacity-5 border-emerald-950" />

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all shadow-md group-hover:shadow-lg ${
            copied ? 'bg-gold-500 text-white' : 'bg-emerald-50 text-emerald-900 hover:bg-gold-100'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Copy Ayah
            </>
          )}
        </button>

        {isSaved ? (
          <button
            onClick={() => onRemove(ayah.id)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold-200 text-gold-950 rounded-2xl font-bold hover:bg-gold-300 transition-all shadow-md"
          >
            <BookmarkCheck className="w-5 h-5" />
            Saved
          </button>
        ) : (
          <button
            onClick={() => onSave(ayah)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-950 text-gold-accent rounded-2xl font-bold hover:bg-emerald-900 transition-all shadow-md"
          >
            <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Save for Study
          </button>
        )}
      </div>
    </div>
  );
}
