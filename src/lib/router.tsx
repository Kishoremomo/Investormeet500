import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface RouterState {
  pathname: string;
  search: string;
  hash: string;
}

interface RouterContextValue extends RouterState {
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  search: '',
  hash: '',
  navigate: () => {},
});

function readLocation(): RouterState {
  return {
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
    hash: window.location.hash || '',
  };
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [loc, setLoc] = useState<RouterState>(readLocation);

  const handleHashOrTop = useCallback((hash: string) => {
    if (hash) {
      const id = hash.replace(/^#/, '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      const next = readLocation();
      setLoc(next);
      handleHashOrTop(next.hash);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [handleHashOrTop]);

  const navigate = useCallback(
    (to: string) => {
      if (/^(https?:|mailto:|tel:)/i.test(to)) {
        window.open(to, '_blank', 'noopener,noreferrer');
        return;
      }
      const url = new URL(to, window.location.origin);
      const nextState: RouterState = {
        pathname: url.pathname || '/',
        search: url.search || '',
        hash: url.hash || '',
      };
      const full = `${nextState.pathname}${nextState.search}${nextState.hash}`;
      if (
        full !== `${window.location.pathname}${window.location.search}${window.location.hash}`
      ) {
        window.history.pushState({}, '', full);
      }
      setLoc(nextState);
      handleHashOrTop(nextState.hash);
    },
    [handleHashOrTop]
  );

  return <RouterContext.Provider value={{ ...loc, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

export function useQueryParam(key: string): string | null {
  const { search } = useRouter();
  return new URLSearchParams(search).get(key);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const isExternal = /^(https?:|mailto:|tel:)/i.test(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      isExternal ||
      rest.target === '_blank' ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
