import React from "react";

interface RealmIconProps {
  realmId: string;
  className?: string;
}

export default function RealmIcon({ realmId, className = "h-5 w-5" }: RealmIconProps) {
  const id = realmId.toLowerCase();

  if (id === "earthrealm") {
    // Globe with meridians and equator (Elder Gods' protected mortal sphere)
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    );
  }

  if (id === "outworld") {
    // Crossed barbarian war blades of conquest (Shao Kahn's imperial empire)
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
        <path d="M9.5 17.5L21 6V3h-3L6.5 14.5" />
        <line x1="12" y1="2" x2="12" y2="7" />
        <polygon points="12,7 9,11 15,11" />
      </svg>
    );
  }

  if (id === "netherrealm") {
    // Underworld infernal flame / torment fire
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        <path d="M12 22c-1.5-1.5-1.5-3 0-4.5 1.5 1.5 1.5 3 0 4.5z" />
      </svg>
    );
  }

  if (id === "edenia") {
    // Royal enchanted lotus blossom of the ancient magical realm
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 3c-2.5 4-3.5 7-3.5 10 0 3 1.5 5 3.5 7 2-2 3.5-4 3.5-7 0-3-1-6-3.5-10z" />
        <path d="M8.5 13c-2.5-1.5-5-2-6.5-1 0 3 2.5 5.5 6.5 6.5" />
        <path d="M15.5 13c2.5-1.5 5-2 6.5-1 0 3-2.5 5.5-6.5 6.5" />
      </svg>
    );
  }

  if (id === "orderrealm") {
    // Scales of Justice (Law, strict order, and Seidan balance)
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </svg>
    );
  }

  if (id === "chaosrealm") {
    // Swirling multi-arm vortex of chaotic unpredictable madness
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2c4 0 7 2 8 6-3 0-6 1-8 4" />
        <path d="M22 12c0 4-2 7-6 8 0-3-1-6-4-8" />
        <path d="M12 22c-4 0-7-2-8-6 3 0 6-1 8-4" />
        <path d="M2 12c0-4 2-7 6-8 0 3 1 6 4 8" />
      </svg>
    );
  }

  if (id === "vaeternus") {
    // Vampire silhouette & bat wings (realm of Nitara and the Moroi)
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 16c-1-2-2-4-2-6 0-1.5.5-2 1-2 .3 0 .7.3 1 .8.3-.5.7-.8 1-.8.5 0 1 .5 1 2 0 2-1 4-2 6z" />
        <path d="M10 8C7 5 3 6 2 9c2 2 3 6 7 7-1-2-1-4 1-8z" />
        <path d="M14 8c3-3 7-2 8 1-2 2-3 6-7 7 1-2 1-4-1-8z" />
      </svg>
    );
  }

  // Fallback: Cosmic celestial sphere
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M11.5 3a16 16 0 0 0 0 18" />
      <path d="M12.5 3a16 16 0 0 1 0 18" />
    </svg>
  );
}
