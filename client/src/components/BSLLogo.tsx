import React from 'react';

interface BSLLogoProps {
  color?: string;
  className?: string;
  fontSize?: string;
  letterSpacing?: string;
}

/**
 * BSL Tours logo component with proper spacing and styling
 */
const BSLLogo: React.FC<BSLLogoProps> = ({
  color = 'white',
  className = '',
  fontSize = '48px',
  letterSpacing = '0.15em'
}) => {
  return (
    <div 
      className={`font-serif font-bold ${className}`}
      style={{
        color,
        fontSize,
        letterSpacing,
        textTransform: 'uppercase',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.35em'
      }}
    >
      <span>B</span>
      <span>S</span>
      <span>L</span>
      <span style={{ marginLeft: '0.15em' }}>T</span>
      <span>O</span>
      <span>U</span>
      <span>R</span>
      <span>S</span>
    </div>
  );
};

export default BSLLogo;