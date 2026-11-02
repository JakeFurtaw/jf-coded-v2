"use client";

import { useRef } from "react";

/**
 * Radix Dialog only restores focus to its own <Dialog.Trigger>. For dialogs opened
 * programmatically, spread these onto <Dialog.Content> to return focus to whatever
 * element was focused when the dialog opened.
 */
export function useReturnFocus() {
  const returnTo = useRef<HTMLElement | null>(null);

  return {
    onOpenAutoFocus: () => {
      returnTo.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    },
    onCloseAutoFocus: (event: Event) => {
      const el = returnTo.current;
      if (el && el.isConnected) {
        event.preventDefault();
        el.focus({ preventScroll: true });
      }
    },
  };
}
