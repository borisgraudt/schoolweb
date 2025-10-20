import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Досугово-развивающий центр "Школа Неордината"';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          border: '20px solid black',
          position: 'relative',
        }}
      >
        {/* Background Grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            opacity: 0.05,
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderBottom: '2px solid black',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              letterSpacing: '-0.02em',
              marginBottom: 40,
              textTransform: 'uppercase',
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            Школа Неордината
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: '#666',
              maxWidth: '700px',
              lineHeight: 1.4,
            }}
          >
            Досугово-развивающий центр в Москве
          </div>

          {/* Accent Bar */}
          <div
            style={{
              marginTop: 60,
              width: '200px',
              height: '8px',
              backgroundColor: '#f59e0b',
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            fontSize: 20,
            color: '#666',
            letterSpacing: '0.1em',
          }}
        >
          aethr.ru
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

