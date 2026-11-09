'use client';

import { useResume } from '@/hooks/useResume';
import { colors } from '@/lib/colors';

export function Education() {
  const resume = useResume();
  const { education } = resume;

  return (
    <div className="text-xs sm:text-sm py-1">
      {education.map((edu, i) => {
        const isLast = i === education.length - 1;
        const prefix = isLast ? '└── ' : '├── ';
        const indent = isLast ? '    ' : '│   ';

        return (
          <div key={i}>
            <div>
              <span style={{ color: colors.inactive }}>{prefix}</span>
              <span style={{ color: colors.helpBlue }} className="font-bold">{edu.institution}</span>
            </div>
            <div>
              <span style={{ color: colors.inactive, whiteSpace: 'pre' }}>{indent}</span>
              <span style={{ color: colors.subtle }}>{edu.area}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
