/* Renders text and marks any [bracketed] part as a placeholder you still need to replace. */
export default function Editable({ text }) {
  if (!text) return null
  const parts = String(text).split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span className="ph" key={i} title="Placeholder: replace in src/data/siteData.js">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
