import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') ?? 'Documentation'
  const description = searchParams.get('description') ?? ''
  const category = searchParams.get('category') ?? 'Docs'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid */}
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

        {/* Teal glow — top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(32,178,137,0.16) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '60px 80px',
            flex: 1,
            position: 'relative',
          }}
        >
          {/* Top: Logo + site name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                background: '#ffffff',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 800,
                color: '#0a0a0a',
                letterSpacing: '-0.04em',
              }}
            >
              V
            </div>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '-0.02em',
              }}
            >
              Vritti UI
            </span>
          </div>

          {/* Center: Category + Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '52px',
            }}
          >
            {/* Category badge */}
            <div
              style={{
                display: 'flex',
              }}
            >
              <div
                style={{
                  padding: '6px 14px',
                  background: 'rgba(32,178,137,0.15)',
                  border: '1px solid rgba(32,178,137,0.3)',
                  borderRadius: '999px',
                  fontSize: '15px',
                  color: '#20b28a',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  display: 'flex',
                }}
              >
                {category}
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: title.length > 30 ? '58px' : '72px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              {title}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.45,
                  maxWidth: '900px',
                }}
              >
                {description.length > 120 ? description.slice(0, 120) + '…' : description}
              </div>
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
              color: 'rgba(255,255,255,0.3)',
              fontWeight: 400,
            }}
          >
            vritti.thesatyajit.com/docs
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
      width: 1200,
      height: 630,
    }
  )
}
