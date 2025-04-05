export const initDarkMode = () => {
  // Check if user has a preference in localStorage
  const storedDarkMode = localStorage.getItem('darkMode');
  
  // Check if user has a system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply dark mode if localStorage preference exists or system prefers dark
  if (storedDarkMode === 'true' || (storedDarkMode === null && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const toggleDarkMode = () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  }
};
