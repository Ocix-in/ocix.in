export function ServiceBell({id,className=''}:{id:string;className?:string}) {
  return <svg className={className} viewBox="0 0 120 100" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-gold`} x1="24" y1="20" x2="96" y2="75" gradientUnits="userSpaceOnUse"><stop stopColor="#FFD887"/><stop offset=".35" stopColor="#F3B449"/><stop offset=".7" stopColor="#CA7F20"/><stop offset="1" stopColor="#E9A43B"/></linearGradient>
      <linearGradient id={`${id}-base`} x1="60" y1="75" x2="60" y2="91" gradientUnits="userSpaceOnUse"><stop stopColor="#4B477F"/><stop offset="1" stopColor="#27245A"/></linearGradient>
    </defs>
    <ellipse cx="60" cy="90" rx="47" ry="6" fill="#27245A" opacity=".12"/>
    <path d="M15 76Q15 69 60 69Q105 69 105 76V82Q102 91 60 91Q18 91 15 82Z" fill={`url(#${id}-base)`}/>
    <ellipse cx="60" cy="76" rx="45" ry="9" fill="#5B5688"/>
    <path d="M23 69C23 44 36 31 56 30V22H64V30C84 31 97 44 97 69Q92 79 60 79Q28 79 23 69Z" fill={`url(#${id}-gold)`}/>
    <ellipse cx="60" cy="70" rx="37" ry="7" fill="#D68C29"/>
    <path d="M28 66C28 45 41 34 57 34" stroke="#FFF1C4" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round"/>
    <path d="M51 17Q60 12 69 17V22Q60 28 51 22Z" fill="#D5912E"/>
    <ellipse cx="60" cy="17" rx="9" ry="4" fill="#FFD483"/>
  </svg>;
}
