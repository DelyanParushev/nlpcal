import { useState } from 'react'
import { parseText, createEvent } from '../services/api'

export default function AddEventForm({ onSaved, isDarkMode }) {
  const [text, setText] = useState('')
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedMsg, setSavedMsg] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleParse = async (e) => {
    e.preventDefault()
    setError('')
    setSavedMsg('')
    setPreview(null)

    if (!text.trim()) return

    try {
      setLoading(true)
      const data = await parseText(text)
      setPreview(data)
    } catch (err) {
      console.error(err)
      setError('Не успях да разбера текста. Опитай да преформулираш.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!preview) return
    try {
      setLoading(true)
      await createEvent({
        title: preview.title,
        start: preview.start,
        end: preview.end,
        raw_text: text,
      })
      setSavedMsg('Събитието е записано!')
      setText('')
      setPreview(null)
      onSaved?.()
    } catch (err) {
      console.error(err)
      setError('Грешка при запис на събитието.')
    } finally {
      setLoading(false)
    }
  }

  const formatDT = (iso) => new Date(iso).toLocaleString('bg-BG', {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: false
  })

  return (
    <div className="transition-all duration-200 text-[color:var(--md-sys-color-on-surface-variant)]">
      <h2 className="text-xl font-medium mb-6">Добави събитие</h2>
      <form onSubmit={handleParse} className="space-y-6">
        <div className="relative">
          <textarea
            className="w-full rounded-xl p-6 
              bg-[color:var(--md-sys-color-surface)] 
              border border-[color:var(--md-sys-color-outline)]
              text-[color:var(--md-sys-color-on-surface)]
              placeholder-[color:var(--md-sys-color-on-surface-variant)] placeholder-opacity-50
              shadow-level-1 transition-all duration-200 
              hover:shadow-level-2 focus:shadow-level-2 
              focus:border-[color:var(--md-sys-color-primary)] outline-none
              text-[50px] font-['Uni_Sans_Heavy_Italic']"
            rows={2}
            placeholder="Въведи естествен текст... (напр. Вечеря с Гери в неделя от 18 до 19:30)"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsAnimating(true);
            }}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`rounded-full px-6 py-3 font-medium transition-all duration-200 
              bg-[color:var(--md-sys-color-primary)]
              text-[color:var(--md-sys-color-on-primary)]
              hover:bg-[color:var(--md-sys-color-primary-container)]
              hover:text-[color:var(--md-sys-color-on-primary-container)]
              disabled:opacity-50 shadow-level-1 hover:shadow-level-2
              flex items-center gap-2`}
          >
            <span className="material-icons text-xl">send</span>
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Мисля…
              </span>
            ) : (
              'Парсни'
            )}
          </button>
          {preview && (
            <button
              type="button"
              onClick={handleSave}
              className={`rounded-full px-6 py-3 font-medium transition-all duration-200 
                bg-[color:var(--md-sys-color-tertiary)]
                text-[color:var(--md-sys-color-on-tertiary)]
                hover:bg-[color:var(--md-sys-color-tertiary-container)]
                hover:text-[color:var(--md-sys-color-on-tertiary-container)]
                shadow-level-1 hover:shadow-level-2 animate-slide-in
                flex items-center gap-2`}
            >
              <span className="material-icons text-xl">save</span>
              Запази
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="mt-6 rounded-xl p-4 text-sm animate-slide-in flex items-center gap-3
          bg-[color:var(--md-sys-color-error-container)]
          text-[color:var(--md-sys-color-on-error-container)]
          shadow-level-1">
          <span className="material-icons text-[color:var(--md-sys-color-error)]">error_outline</span>
          {error}
        </div>
      )}
      
      {savedMsg && (
        <div className="mt-6 rounded-xl p-4 text-sm animate-slide-in flex items-center gap-3
          bg-[color:var(--md-sys-color-success-container)]
          text-[color:var(--md-sys-color-on-success-container)]
          shadow-level-1">
          <span className="material-icons text-[color:var(--md-sys-color-success)]">check_circle</span>
          {savedMsg}
        </div>
      )}

      {preview && (
        <div className="mt-6 rounded-xl p-6 animate-slide-in
          bg-[color:var(--md-sys-color-surface-container-highest)]
          border border-[color:var(--md-sys-color-outline)]
          shadow-level-2 transition-all duration-200 hover:shadow-level-3">
          <div className="text-sm font-medium flex items-center gap-2
            text-[color:var(--md-sys-color-on-surface-variant)]">
            <span className="material-icons">event</span>
            Преглед на събитие
          </div>
          <div className="font-medium mt-4 text-lg
            text-[color:var(--md-sys-color-on-surface)]">{preview.title}</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2
              text-[color:var(--md-sys-color-on-surface-variant)]">
              <span className="material-icons text-sm">schedule</span>
              <span className="text-sm">Начало: {formatDT(preview.start)}</span>
            </div>
            <div className="flex items-center gap-2
              text-[color:var(--md-sys-color-on-surface-variant)]">
              <span className="material-icons text-sm">schedule</span>
              <span className="text-sm">Край: {formatDT(preview.end)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}