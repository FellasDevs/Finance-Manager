'use client';

import * as React from 'react';
import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '~/app/_components/ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const switchTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Button size="icon" onClick={switchTheme}>
      <SunMoon />
    </Button>
  );
}
