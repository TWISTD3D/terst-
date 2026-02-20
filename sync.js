// sync.js
// This file adds a clean save system that works with your existing code.
// It does NOT replace your index.html logic — it only adds a save function.

export function initFirebaseSync() {
  console.log("sync.js loaded ✓");

  // Expose a save function your existing Save button can call
  window.saveProfileToFirebase = async function () {
    if (!window._fbSet) {
      console.warn("Firebase not ready — cannot save");
      return;
    }

    // Build the same publicMeta object your code already uses
    const publicMeta = {
      username: document.getElementById('username-el')?.textContent || '',
      bio: (window.bioTexts && window.bioTexts[0]) || '',
      tab: (window.tabTexts && window.tabTexts[0]) || '',
      status: window.currentStatus || 'offline',
      badges: window.badgeData || [],
      volLabel: window.volLabel || '',
      brightLabel: window.brightLabel || '',
      pfpText: document.getElementById('avatar-fallback')?.textContent || '',
      socialLinks: window.socialLinks || {}
    };

    try {
      await window._fbSet(publicMeta);
      console.log("Saved to Firebase ✓");
    } catch (e) {
      console.error("Firebase save failed:", e);
    }
  };
}
