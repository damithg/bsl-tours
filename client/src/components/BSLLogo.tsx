import React from 'react';

interface BSLLogoProps {
  color?: string;
  className?: string;
  fontSize?: string;
  letterSpacing?: string;
  variant?: 'standard' | 'compact' | 'stacked' | 'legacy' | 'premium';
  showTagline?: boolean;
  showMap?: boolean;
  accentColor?: string;
}

/**
 * SVG path for Sri Lanka map outline
 */
const SriLankaMapPath = () => (
  <svg
    viewBox="0 0 100 160" 
    width="45" 
    height="70" 
    style={{ 
      position: 'absolute',
      left: '45%',
      top: '15%',
      zIndex: 1,
      fill: 'currentColor',
      opacity: 0.7
    }}
  >
    <path d="M49.8,2c0,0,4.2,4.4,5.6,8.1c1.4,3.7,3.7,8.6,3.7,12.7c0,4.1-2.1,13.9-2.1,18
      c0,4.1,0.7,7.6,1.7,11.5c1,3.9,4.3,9.8,4.3,13.5c0,3.7-2.7,11.1-2.7,15c0,3.9,2.1,17.2,2.1,21.1
      c0,3.9-4.3,12.5-4.3,17.2c0,4.6,2.3,20.2,2.3,20.2s-5.4,7.4-8.1,7.4c-2.7,0-8.4-6.4-9.6-10.3
      c-1.2-3.9-4.5-30.5-4.5-34.5c0-4.1,0.6-16.2,0.6-20.4c0-4.1-5.9-16.4-7.4-20.2c-1.6-3.8-4.8-11.1-6.2-15.2
      c-1.4-4.1-2.1-10.5-2.1-14.8c0-4.3,8.1-16,8.1-19.9c0-3.9-6.6-11.7-5.6-15.4c1-3.7,7.1-10.3,10.1-13.5
      C38.7,8.8,46.6,2,49.8,2z" />
  </svg>
);

/**
 * BSL Tours logo component with proper spacing and styling
 */
const BSLLogo: React.FC<BSLLogoProps> = ({
  color = 'white',
  className = '',
  fontSize = '48px',
  letterSpacing = '0.15em',
  variant = 'standard',
  showTagline = false,
  showMap = true,
  accentColor
}) => {
  const baseStyle = {
    color,
    fontSize,
    letterSpacing,
    textTransform: 'uppercase' as const,
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    fontWeight: 'bold' as const,
  };
  
  const getLogoContent = () => {
    // Premium variant (inspired by luxury travel brands)
    if (variant === 'premium') {
      const defaultAccent = accentColor || '#C4A052'; // Gold accent if not specified
      
      return (
        <div 
          className={`font-sans relative ${className}`}
          style={{
            ...baseStyle,
            fontFamily: 'sans-serif',
            fontWeight: '400',
            textShadow: 'none',
            letterSpacing: '0.2em',
            lineHeight: 1.2,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-1">
              <span 
                className="font-light tracking-wider"
                style={{ fontSize: '1em', position: 'relative' }}
              >
                BSL
              </span>
            </div>
            
            {showMap && (
              <div 
                className="w-full h-[1px] my-1" 
                style={{ 
                  background: defaultAccent,
                  position: 'relative',
                  width: '110%',
                  margin: '0.5em auto',
                  opacity: 0.9
                }}
              >
                <div className="absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 bg-transparent p-1">
                  <svg 
                    viewBox="0 0 100 160" 
                    width="10" 
                    height="16"
                    style={{ 
                      fill: defaultAccent,
                      opacity: 0.9
                    }}
                  >
                    <path d="M49.8,2c0,0,4.2,4.4,5.6,8.1c1.4,3.7,3.7,8.6,3.7,12.7c0,4.1-2.1,13.9-2.1,18
                      c0,4.1,0.7,7.6,1.7,11.5c1,3.9,4.3,9.8,4.3,13.5c0,3.7-2.7,11.1-2.7,15c0,3.9,2.1,17.2,2.1,21.1
                      c0,3.9-4.3,12.5-4.3,17.2c0,4.6,2.3,20.2,2.3,20.2s-5.4,7.4-8.1,7.4c-2.7,0-8.4-6.4-9.6-10.3
                      c-1.2-3.9-4.5-30.5-4.5-34.5c0-4.1,0.6-16.2,0.6-20.4c0-4.1-5.9-16.4-7.4-20.2c-1.6-3.8-4.8-11.1-6.2-15.2
                      c-1.4-4.1-2.1-10.5-2.1-14.8c0-4.3,8.1-16,8.1-19.9c0-3.9-6.6-11.7-5.6-15.4c1-3.7,7.1-10.3,10.1-13.5
                      C38.7,8.8,46.6,2,49.8,2z" />
                  </svg>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-center text-[0.5em] mt-1 tracking-[0.25em]">
              TOURS
            </div>
            
            {showTagline && (
              <div className="text-[0.2em] mt-3 tracking-widest text-center font-light" style={{ letterSpacing: '0.15em', color: defaultAccent }}>
                BEST SRI LANKA TOURS
              </div>
            )}
          </div>
        </div>
      );
    }
  
    // Legacy variant (like the original WordPress site)
    if (variant === 'legacy') {
      return (
        <div 
          className={`font-serif relative ${className}`}
          style={{
            ...baseStyle,
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          <div 
            className="relative pt-6 pb-4 px-8"
            style={{
              border: `3px solid ${color}`,
              borderRadius: '2px'
            }}
          >
            {showMap && <SriLankaMapPath />}
            <div className="flex items-center justify-center gap-[0.1em] relative z-10">
              <span style={{ fontSize: '1.1em' }}>B</span>
              <span style={{ position: 'relative', top: '-0.04em' }}>S</span>
              <span>L</span>
            </div>
            <div className="flex items-center justify-center gap-[0.05em] text-[0.7em] mt-1">
              <span>T</span>
              <span>O</span>
              <span>U</span>
              <span>R</span>
              <span>S</span>
            </div>
            {showTagline && (
              <div className="text-[0.3em] mt-2 tracking-widest font-light text-center">
                BEST SRI LANKA TOURS
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // Compact variant (BSL only)
    if (variant === 'compact') {
      return (
        <div 
          className={`font-serif ${className}`}
          style={{
            ...baseStyle,
            display: 'flex',
            alignItems: 'center',
            gap: '0.15em'
          }}
        >
          <span>B</span>
          <span style={{ position: 'relative', top: '-0.02em' }}>S</span>
          <span>L</span>
        </div>
      );
    }
    
    // Stacked variant (BSL stacked above TOURS)
    if (variant === 'stacked') {
      return (
        <div 
          className={`font-serif flex flex-col items-center ${className}`}
          style={baseStyle}
        >
          <div className="flex items-center justify-center gap-[0.15em]">
            <span>B</span>
            <span style={{ position: 'relative', top: '-0.02em' }}>S</span>
            <span>L</span>
          </div>
          <div className="flex items-center justify-center gap-[0.08em] text-[0.75em]" style={{ letterSpacing: '0.1em' }}>
            <span style={{ position: 'relative', top: '-0.05em' }}>T</span>
            <span>O</span>
            <span style={{ position: 'relative', top: '0.02em' }}>U</span>
            <span>R</span>
            <span style={{ position: 'relative', top: '-0.02em' }}>S</span>
          </div>
          {showTagline && (
            <div className="text-[0.25em] mt-2 tracking-wider font-light">
              BEST SRI LANKA TOURS
            </div>
          )}
        </div>
      );
    }
    
    // Standard variant (BSL TOURS in a row)
    return (
      <div 
        className={`font-serif ${className}`}
        style={{
          ...baseStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>B</span>
        <span style={{ position: 'relative', top: '-0.02em', marginLeft: '0.1em' }}>S</span>
        <span style={{ marginLeft: '0.1em' }}>L</span>
        <span style={{ position: 'relative', top: '-0.05em', marginLeft: '0.3em' }}>T</span>
        <span style={{ marginLeft: '0.1em' }}>O</span>
        <span style={{ position: 'relative', top: '0.02em', marginLeft: '0.1em' }}>U</span>
        <span style={{ marginLeft: '0.1em' }}>R</span>
        <span style={{ position: 'relative', top: '-0.02em', marginLeft: '0.1em' }}>S</span>
        {showTagline && (
          <div className="text-[0.25em] ml-4 tracking-wider font-light self-end mb-2">
            BEST SRI LANKA TOURS
          </div>
        )}
      </div>
    );
  };
  
  return getLogoContent();
};

export default BSLLogo;