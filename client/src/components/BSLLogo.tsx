import React from 'react';

interface BSLLogoProps {
  color?: string;
  className?: string;
  fontSize?: string;
  letterSpacing?: string;
  variant?: 'standard' | 'compact' | 'stacked';
  showTagline?: boolean;
}

/**
 * BSL Tours logo component with proper spacing and styling
 */
const BSLLogo: React.FC<BSLLogoProps> = ({
  color = 'white',
  className = '',
  fontSize = '48px',
  letterSpacing = '0.15em',
  variant = 'standard',
  showTagline = false
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