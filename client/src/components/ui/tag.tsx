import React from "react";
import { COLORS } from "@/utils/colors";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'cultural' | 'scenic' | 'primary' | 'special';
}

export const Tag: React.FC<TagProps> = ({ 
  children, 
  className = "",
  variant = 'default'
}) => {
  let styles = {
    backgroundColor: `${COLORS.background}`, 
    color: `${COLORS.primary}`,
    fontWeight: 500,
    letterSpacing: '0.02em'
  };
  
  // Variant styles could be added here if needed
  switch(variant) {
    case 'highlight':
      styles = {
        ...styles,
        backgroundColor: `${COLORS.secondary}40`,
        color: `${COLORS.primary}`
      };
      break;
    case 'cultural':
      styles = {
        ...styles,
        backgroundColor: `${COLORS.accent}20`,
        color: `${COLORS.accent}`
      };
      break;
    case 'scenic':
      styles = {
        ...styles,
        backgroundColor: 'transparent',
        color: `${COLORS.primary}`,
        border: `1px solid ${COLORS.primary}40`,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontSize: '0.7rem'
      };
      break;
    case 'primary':
      styles = {
        ...styles,
        backgroundColor: `${COLORS.primary}`,
        color: 'white'
      };
      break;
    case 'special':
      styles = {
        ...styles,
        backgroundColor: '#D4AF37',
        color: 'white'
      };
      break;
    default:
      break;
  }

  return (
    <span
      className={`text-[0.8rem] px-3 py-1 rounded-md leading-5 inline-block ${className}`}
      style={styles}
    >
      {children}
    </span>
  );
};