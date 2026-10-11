const capabilities = [
  'Old town / new town',
  'Sandstone light',
  'Gothic silhouettes',
  'Hidden closes',
  'Prompt craft / AI systems',
]

export default function CapabilitiesMarquee() {
  return (
    <section className="capability-marquee" aria-label="Old Town and New Town, sandstone light, Gothic silhouettes, hidden closes, and digital atmosphere">
      <div className="marquee-window" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {capabilities.map((item) => (
                <span className="marquee-item" key={`${copy}-${item}`}>
                  {item}<b className="marquee-spark">✦</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
