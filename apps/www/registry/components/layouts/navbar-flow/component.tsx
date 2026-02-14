'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import {
  Menu as List,
  X as Close,
  ChevronDown as ArrowDown,
  ChevronUp as ArrowUp,
} from 'lucide-react';

interface NavLink {
  text: string;
  url?: string;
  submenu?: React.ReactNode;
}

interface NavbarFlowProps {
  emblem?: React.ReactNode;
  links?: NavLink[];
  extraIcons?: React.ReactNode[];
  styleName?: string;
  rightComponent?: React.ReactNode;
}

interface ListItemProps {
  setSelected: (element: string | null) => void;
  selected: string | null;
  element: string;
  children: React.ReactNode;
}

interface HoverLinkProps {
  url: string;
  children: React.ReactNode;
  onPress?: () => void;
}

interface FeatureItemProps {
  heading: string;
  url: string;
  info: string;
  onPress?: () => void;
}

const springTransition = {
  type: 'spring' as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const ListItem: React.FC<ListItemProps> = ({
  setSelected,
  selected,
  element,
  children,
}) => {
  return (
    <div
      className='relative'
      onMouseEnter={() => setSelected(element)}
      onMouseLeave={(e) => {
        const dropdown = e.currentTarget.querySelector('.dropdown-content');
        if (dropdown) {
          const dropdownRect = dropdown.getBoundingClientRect();
          if (e.clientY < dropdownRect.top - 20) {
            setSelected(null);
          }
        }
      }}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className='cursor-pointer text-gray-800 dark:text-gray-200 font-medium text-base lg:text-xl whitespace-nowrap hover:opacity-[0.9] hover:text-gray-900 dark:hover:text-white py-1'
      >
        {element}
      </motion.p>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springTransition}
        >
          {selected === element && (
            <div className='absolute top-[calc(100%+0.5rem)] left-1/2 transform -translate-x-1/2 z-50'>
              <motion.div
                transition={springTransition}
                layoutId='selected'
                className='dropdown-content bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl'
                style={{
                  maxWidth: 'min(90vw, 400px)',
                }}
                onMouseEnter={() => setSelected(element)}
                onMouseLeave={() => setSelected(null)}
              >
                <motion.div layout className='w-max h-full p-4 min-w-48'>
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const HoverLink: React.FC<HoverLinkProps> = ({
  url,
  children,
  onPress,
}) => {
  return (
    <a
      href={url}
      onClick={onPress}
      className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
    >
      {children}
    </a>
  );
};

export const FeatureItem: React.FC<FeatureItemProps> = ({
  heading,
  url,
  info,
  onPress,
}) => {
  return (
    <a
      href={url}
      onClick={onPress}
      className='block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
    >
      <h4 className='font-medium text-gray-900 dark:text-white'>{heading}</h4>
      <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>{info}</p>
    </a>
  );
};

const NavbarFlow: React.FC<NavbarFlowProps> = ({
  emblem,
  links = [],
  extraIcons = [],
  styleName = '',
  rightComponent,
}) => {
  const [sequenceDone, setSequenceDone] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
  const [openedSections, setOpenedSections] = useState<Record<string, boolean>>(
    {},
  );
  const [isMounted, setIsMounted] = useState(true);

  const navMotion = useAnimation();
  const emblemMotion = useAnimation();
  const switchMotion = useAnimation();
  const svgMotion = useAnimation();

  useEffect(() => {
    const detectMobile = () => {
      setMobileView(window.innerWidth < 768);
    };

    detectMobile();
    window.addEventListener('resize', detectMobile);
    return () => window.removeEventListener('resize', detectMobile);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const runSequence = async () => {
      if (mobileView) {
        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
          }),
          navMotion.start({
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeOut' },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
          }),
        ]);
      } else {
        await navMotion.start({
          width: 'auto',
          padding: '10px 30px',
          transition: { duration: 0.8, ease: 'easeOut' },
        });

        await svgMotion.start({
          opacity: 1,
          transition: { duration: 0.5 },
        });

        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
          }),
        ]);
      }

      setSequenceDone(true);
    };

    runSequence();
  }, [navMotion, emblemMotion, switchMotion, svgMotion, mobileView, isMounted]);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const toggleSection = (text: string) => {
    setOpenedSections((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const hideMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  const renderSubmenuItems = (submenu: React.ReactNode) => {
    if (!React.isValidElement(submenu)) return null;

    const submenuProps = submenu.props as { children?: React.ReactNode };
    if (!submenuProps.children) return null;

    return React.Children.map(submenuProps.children, (child, childIdx) => (
      <div key={childIdx} onClick={hideMobileMenu}>
        {child}
      </div>
    ));
  };

  return (
    <div className={`sticky top-0 z-50 w-full ${styleName}`}>
      <div className='hidden md:block'>
        <div className='relative w-full max-w-7xl mx-auto h-24 flex items-center justify-between px-4 lg:px-10'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={emblemMotion}
            className='bg-gray-200/80 dark:bg-black/95 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-4 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-lg lg:text-xl z-10 shrink-0'
          >
            {emblem}
          </motion.div>

          <motion.nav
            initial={{
              width: '120px',
              padding: '8px 20px',
            }}
            animate={navMotion}
            className='bg-gray-200/80 dark:bg-black/95 backdrop-blur-sm rounded-full flex items-center justify-center gap-6 lg:gap-12 z-10 shrink-0'
            onMouseLeave={() => setSelectedSubmenu(null)}
          >
            {links.map((element) => (
              <div key={element.text}>
                {element.submenu ? (
                  <ListItem
                    setSelected={setSelectedSubmenu}
                    selected={selectedSubmenu}
                    element={element.text}
                  >
                    {element.submenu}
                  </ListItem>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: sequenceDone ? 1 : 0 }}
                  >
                    <a
                      href={element.url || '#'}
                      className='text-gray-800 dark:text-gray-200 font-medium text-base lg:text-xl whitespace-nowrap hover:text-gray-900 dark:hover:text-white transition-colors py-1'
                    >
                      {element.text}
                    </a>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={switchMotion}
            className='bg-gray-200/80 dark:bg-black/95 backdrop-blur-sm rounded-full p-2 lg:p-3 z-10 shrink-0 flex items-center gap-2 lg:gap-3'
          >
            {extraIcons.map((icon, idx) => (
              <div key={idx} className='flex items-center justify-center'>
                {icon}
              </div>
            ))}

            {rightComponent && (
              <div className='flex items-center justify-center'>
                {rightComponent}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className='block md:hidden'>
        <div className='top-0 z-50 w-full border-b border-gray-200/40 dark:border-gray-800/40 bg-gray-50/95 dark:bg-black/95 backdrop-blur-sm relative'>
          <div className='container flex h-16 max-w-screen-2xl items-center px-4'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={emblemMotion}
              className='mr-4 shrink-0'
            >
              <div className='bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-semibold text-base'>
                {emblem}
              </div>
            </motion.div>

            <div className='flex flex-1 items-center justify-end space-x-2'>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={switchMotion}
                className='flex items-center space-x-2'
              >
                {extraIcons.map((icon, idx) => (
                  <div key={idx} className='flex items-center justify-center'>
                    {icon}
                  </div>
                ))}

                {rightComponent && (
                  <div className='flex items-center justify-center'>
                    {rightComponent}
                  </div>
                )}
              </motion.div>

              <button
                onClick={toggleMobileMenu}
                className='flex items-center justify-center w-9 h-9 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
              >
                {mobileMenuVisible ? (
                  <Close className='h-5 w-5' />
                ) : (
                  <List className='h-5 w-5' />
                )}
                <span className='sr-only'>Toggle menu</span>
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{
              opacity: mobileMenuVisible ? 1 : 0,
              maxHeight: mobileMenuVisible ? '80vh' : 0,
            }}
            transition={{ duration: 0.3 }}
            className='absolute left-0 right-0 top-full z-40 overflow-y-auto border-t border-gray-200/40 dark:border-gray-800/40 bg-gray-50/95 dark:bg-black/95 backdrop-blur-sm'
          >
            <div className='container py-4 px-4'>
              <nav className='flex flex-col space-y-3'>
                {links.map((element) => (
                  <div key={element.text} className='space-y-2'>
                    {element.submenu ? (
                      <>
                        <button
                          className='flex items-center justify-between w-full text-gray-800 dark:text-gray-200 font-medium text-base py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800'
                          onClick={() => toggleSection(element.text)}
                        >
                          <span>{element.text}</span>
                          <span>
                            {openedSections[element.text] ? (
                              <ArrowUp className='h-4 w-4' />
                            ) : (
                              <ArrowDown className='h-4 w-4' />
                            )}
                          </span>
                        </button>

                        {openedSections[element.text] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.2 }}
                            className='pl-4 space-y-1 overflow-hidden'
                          >
                            {renderSubmenuItems(element.submenu)}
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <a
                        href={element.url || '#'}
                        onClick={hideMobileMenu}
                        className='text-gray-800 dark:text-gray-200 font-medium text-base py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-800 block'
                      >
                        {element.text}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NavbarFlow;
