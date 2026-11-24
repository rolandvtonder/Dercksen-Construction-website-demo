/** Display heading built from lines; `i` lines are set in italic. */
export function Lines({lines}: {lines: {t: string; i?: boolean}[]}) {
  return (
    <>
      {lines.map((l) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''}`}>
          {l.t}
        </span>
      ))}
    </>
  );
}
