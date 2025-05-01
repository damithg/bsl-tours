import React from "react";
import { COLORS } from "@/utils/colors";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'cultural' | 'scenic' | 'primary' | 'special' | 'duration';
}

export const Tag: React.FC<TagProps> = ({ 
  children, 
  className = "",
  variant = 'default'
}) => {
  let tagStyle = {};
  let tagClass = "";
  
  switch(variant) {
    case 'highlight':
      tagStyle = {
        backgroundColor: `${COLORS.secondary}40`,
        color: `${COLORS.primary}`
      };
      break;
    case 'cultural':
      tagStyle = {
        backgroundColor: `${COLORS.accent}20`,
        color: `${COLORS.accent}`
      };
      break;
    case 'scenic':
      tagStyle = {
        backgroundColor: 'whitesmoke',
        color: `${COLORS.primary}`,
        borderColor: `${COLORS.primary}40`
      };
      tagClass = "border uppercase text-[0.8rem] tracking-wider font-medium";
      break;
    case 'primary':
      tagStyle = {
        backgroundColor: `${COLORS.primary}`,
        color: 'white'
      };
      break;
    case 'special':
      tagStyle = {
        backgroundColor: '#D4AF37',
        color: 'white'
      };
      break;
    case 'duration':
      tagStyle = {
        backgroundColor: 'whitesmoke',
        color: `${COLORS.primary}`,
        borderColor: `${COLORS.primary}40`
      };
      tagClass = "border uppercase text-[0.8rem] tracking-wide font-medium shadow-sm";
      break;
    default:
      tagStyle = {
        backgroundColor: `${COLORS.background}`, 
        color: `${COLORS.primary}`
      };
      break;
  }

  // Apply common styles unless overridden by the variant's tagClass
  const defaultClass = !tagClass ? "text-[0.8rem] font-medium tracking-wide" : "";

  return (
    <span
      className={`px-3 py-1 rounded-md leading-5 inline-block ${defaultClass} ${tagClass} ${className}`}
      style={tagStyle}
    >
      {children}
    </span>
  );
};