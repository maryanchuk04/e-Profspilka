import { ReactNode } from 'react';

import { useMediaQuery } from '@/hooks';

interface ResponsiveWrapperProps {
    children: ReactNode;
    showOn?: "mobile" | "desktop";
}

export default function ResponsiveWrapper({ children, showOn = "desktop" }: ResponsiveWrapperProps) {
    const isMobile = useMediaQuery(768);

    // Show/hide content based on screen size
    if ((showOn === "mobile" && !isMobile) || (showOn === "desktop" && isMobile)) {
        return null;
    }

    return <>{children}</>;
}
