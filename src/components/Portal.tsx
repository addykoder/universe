"use client";

import { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

/**
 * A client-side component to render children in a React Portal.
 * This is used to render modals on top of all other content.
 */
export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // This effect runs only on the client side, after the initial render.
    // This is necessary because `document` is not available during server-side rendering.
    setPortalElement(document.body);
    setMounted(true);
    
    // When the component unmounts, we set mounted back to false.
    return () => setMounted(false);
  }, []);

  // If the component is not yet mounted on the client, or the portalElement is not set, we render nothing.
  // Otherwise, we create a portal and render the children into the document body.
  return mounted && portalElement
    ? createPortal(children, portalElement)
    : null; // Corrected from '*' to ':'
}

