"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  // Prevent scrolling on the body when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-foreground text-background z-50 flex flex-col shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Contact Inquiry Form"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 md:p-12 border-b border-background/10">
              <h2 className="font-serif text-3xl">Let's Talk.</h2>
              <button 
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-background/10 transition-colors"
                aria-label="Close Contact Drawer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="p-8 md:p-12 flex-1 flex flex-col">
              <p className="font-sans text-sm opacity-70 mb-12">
                Whether you have a specific master plan in mind or need bespoke architectural consultation, we're ready to shape your vision. Fill out the form below.
              </p>

              <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                
                {/* Name Input */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-transparent border-b border-background/20 py-3 font-sans text-lg focus:outline-none focus:border-background transition-colors peer placeholder-transparent"
                    placeholder="Name"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-3 font-sans text-base opacity-50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:opacity-100 peer-valid:-top-4 peer-valid:text-xs peer-valid:opacity-100 cursor-text"
                  >
                    Your Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-transparent border-b border-background/20 py-3 font-sans text-lg focus:outline-none focus:border-background transition-colors peer placeholder-transparent"
                    placeholder="Email"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-3 font-sans text-base opacity-50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:opacity-100 peer-valid:-top-4 peer-valid:text-xs peer-valid:opacity-100 cursor-text"
                  >
                    Email Address
                  </label>
                </div>

                {/* Subject / Project Type Input */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="project" 
                    className="w-full bg-transparent border-b border-background/20 py-3 font-sans text-lg focus:outline-none focus:border-background transition-colors peer placeholder-transparent"
                    placeholder="Project Type"
                  />
                  <label 
                    htmlFor="project" 
                    className="absolute left-0 top-3 font-sans text-base opacity-50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:opacity-100 peer-valid:-top-4 peer-valid:text-xs peer-valid:opacity-100 cursor-text"
                  >
                    Project Type (e.g. Commercial, Residential)
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative group mt-4">
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full bg-transparent border-b border-background/20 py-3 font-sans text-lg focus:outline-none focus:border-background transition-colors peer placeholder-transparent resize-none"
                    placeholder="Message"
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-3 font-sans text-base opacity-50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:opacity-100 peer-valid:-top-4 peer-valid:text-xs peer-valid:opacity-100 cursor-text"
                  >
                    Project Details
                  </label>
                </div>

                <button 
                  type="submit"
                  className="mt-8 w-full bg-background text-foreground py-4 rounded-sm font-sans uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
                >
                  Send Inquiry
                </button>
              </form>

              {/* Contact Direct Info */}
              <div className="mt-auto pt-16 flex flex-col gap-2 font-sans text-sm opacity-60">
                <a href="mailto:hello@adisharchitecture.com" className="hover:opacity-100 transition-opacity">hello@adisharchitecture.com</a>
                <p>+1 (555) 123-4567</p>
                <p>New York | London | Dubai</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
