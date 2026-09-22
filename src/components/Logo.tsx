import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true, 
  light = false 
}) => {
  const { config } = useApp();

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-xs tracking-wider',
    md: 'text-sm tracking-wider',
    lg: 'text-lg tracking-widest',
    xl: 'text-xl tracking-widest'
  };

  // If custom logo image URL is configured, use it
  if (config.logoUrl && config.logoUrl.trim() !== '') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img 
          src={config.logoUrl} 
          alt={config.shortName} 
          className="w-9 h-9 object-contain rounded-md"
          referrerPolicy="no-referrer"
        />
        {showText && (
          <div className="flex flex-col">
            <span className={`font-extrabold uppercase font-serif ${light ? 'text-white' : 'text-slate-900'} ${textSizes[size]}`}>
              {config.shortName}
            </span>
            <span className={`text-[9px] uppercase font-semibold tracking-widest ${light ? 'text-slate-300' : 'text-slate-500'}`}>
              Kinshasa • LMD
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`flex items-center justify-center shrink-0 ${light ? 'text-blue-300' : 'text-[#005a9c]'}`}>
        <GraduationCap className={`${iconSizes[size]} stroke-[2.2]`} />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-extrabold uppercase font-serif ${light ? 'text-white' : 'text-slate-900'} ${textSizes[size]}`}>
            IFADC KINSHASA
          </span>
          <span className={`text-[9px] uppercase font-medium tracking-widest ${light ? 'text-slate-300' : 'text-slate-500'}`}>
            Institut Facultaire des Assemblées de Dieu
          </span>
        </div>
      )}
    </div>
  );
};
