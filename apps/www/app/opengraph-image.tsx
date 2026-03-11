import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Teal glow accent */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(32,178,137,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '200px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(32,178,137,0.10) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '70px 80px',
            flex: 1,
            position: 'relative',
          }}
        >
          {/* Logo row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            {/* V icon */}
            <div
              style={{
                width: '56px',
                height: '56px',
                background: '#ffffff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 800,
                color: '#0a0a0a',
                letterSpacing: '-0.04em',
              }}
            >
              V
            </div>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.03em',
              }}
            >
              Vritti UI
            </span>
          </div>

          {/* Main headline — two lines via nested divs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                fontSize: '72px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Beautiful React
            </div>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Components
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '26px',
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
              display: 'flex',
            }}
          >
            Built with Next.js 16, Tailwind CSS v4 &amp; Motion
          </div>

          {/* Bottom pill badges */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '48px',
            }}
          >
            {['Animations', 'Backgrounds', 'Buttons', 'Text Effects', '400+ Components'].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '999px',
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    display: 'flex',
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 80px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.35)',
              fontWeight: 400,
            }}
          >
            vritti.thesatyajit.com
          </span>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#20b28a',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
