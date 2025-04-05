import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

export function ColorPicker({
  value,
  onChange,
  label,
  id = 'color-picker',
}: ColorPickerProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex gap-2 items-center">
        <Input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 p-1 rounded-md cursor-pointer"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 h-10"
        />
      </div>
    </div>
  );
}