/**
 * Le package n’expose pas les types via `package.json#exports` ;
 * déclaration minimale pour `import()` dynamique + build TypeScript.
 */
declare module '@ericz1803/react-google-calendar' {
  import type { FC } from 'react'

  export interface ReactGoogleCalendarProps {
    apiKey: string
    calendars: Array<{ calendarId: string; color?: string }>
    language?: string
    styles?: Record<string, unknown>
    showArrow?: boolean
    showFooter?: boolean
  }

  const Calendar: FC<ReactGoogleCalendarProps>
  export default Calendar
}
