"use client";
import { useState, useEffect, useRef } from 'react';
import { Fab, Tooltip, CircularProgress } from '@mui/material';
import { VolumeUp, VolumeOff, Pause, PlayArrow } from '@mui/icons-material';
import ttsService from '../../lib/tts-service';

export default function AudioButton({ 
  disabled = false, 
  containerRef = null,
  content = null, // New prop for custom content
  extractorConfig = {
    skipButtons: true,
    skipNavigation: true,
    skipLabels: true,
    selectorsToSkip: [], // CSS selectors to skip
    selectorsToInclude: [], // CSS selectors to specifically include
  }
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);
  const [pageContent, setPageContent] = useState('');
  const observerRef = useRef(null);

  // Enhanced text extraction function
  const extractPageContent = () => {
    // If custom content is provided, use it directly
    if (content) {
      return content;
    }

    // Otherwise, use automatic extraction
    const container = containerRef?.current || document.querySelector('main') || document.body;
    
    if (!container) return '';

    // Elements to skip by default
    const skipSelectors = [
      'script',
      'style',
      'noscript',
      'button',
      '[role="button"]',
      'nav',
      'header',
      'footer',
      '.MuiButton-root',
      '.MuiIconButton-root',
      '.MuiFab-root',
      '.MuiTooltip-tooltip',
      '.MuiMenuItem-root',
      '.MuiSelect-select',
      'option',
      'select',
      'input',
      'textarea',
      '[aria-hidden="true"]',
      '.MuiBackdrop-root',
      '.MuiModal-root',
      '.MuiPopover-root',
      '.MuiMenu-root',
      // Add any custom selectors from config
      ...extractorConfig.selectorsToSkip
    ];

    // Create a tree walker to traverse text nodes
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip if parent is null
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          // Check if any parent matches skip selectors
          const shouldSkip = skipSelectors.some(selector => {
            return parent.closest(selector) !== null;
          });
          
          if (shouldSkip) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Skip if element is hidden
          const style = window.getComputedStyle(parent);
          if (style.display === 'none' || style.visibility === 'hidden') {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Skip common UI labels
          const text = node.textContent.trim();
          const uiLabels = [
            'السابق',
            'التالي',
            'العصر',
            'اللغة المختارة',
            'النص المُدخل',
            'الترجمة:',
            'الشرح:',
            'أمثلة',
            'من',
            '/',
            // Navigation arrows
            '→',
            '←',
            '▶',
            '◀',
          ];
          
          if (extractorConfig.skipLabels !== false && uiLabels.includes(text)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Apply custom filters from config
          if (extractorConfig.customFilter && !extractorConfig.customFilter(node, parent)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // If there are specific selectors to include, check them
          if (extractorConfig.selectorsToInclude.length > 0) {
            const shouldInclude = extractorConfig.selectorsToInclude.some(selector => {
              return parent.closest(selector) !== null;
            });
            if (!shouldInclude) {
              return NodeFilter.FILTER_REJECT;
            }
          }
          
          // Accept if text has content and is not just numbers or special characters
          return text.length > 0 && !/^[\d\s\/\-\.]+$/.test(text) 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const textParts = [];
    const seen = new Set();
    
    // Collect all text nodes
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();
      if (text && !seen.has(text)) {
        seen.add(text);
        
        // Get the closest meaningful parent
        const parent = node.parentElement;
        const isHeading = /^h[1-6]$/i.test(parent.tagName);
        const isListItem = parent.tagName?.toLowerCase() === 'li';
        
        // Add formatting hints
        if (isHeading) {
          textParts.push(`\n${text}\n`);
        } else if (isListItem) {
          textParts.push(`• ${text}`);
        } else {
          textParts.push(text);
        }
      }
    }
    
    // Join and clean up
    return textParts
      .join(' ')
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  // Update effect to handle content prop changes
  useEffect(() => {
    // If content prop is provided, use it directly
    if (content !== null && content !== undefined) {
      setPageContent(content);
      return; // Don't set up observers when using custom content
    }

    // Otherwise, use automatic extraction
    const updateContent = () => {
      const extractedContent = extractPageContent();
      setPageContent(extractedContent);
    };
    
    // Update content initially
    updateContent();
    
    // Set up MutationObserver to watch for content changes
    const container = containerRef?.current || document.querySelector('main') || document.body;
    
    if (container) {
      observerRef.current = new MutationObserver(() => {
        // Debounce updates
        clearTimeout(observerRef.current.timeout);
        observerRef.current.timeout = setTimeout(updateContent, 500);
      });
      
      observerRef.current.observe(container, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
    
    // Also update on window events that might change content
    window.addEventListener('load', updateContent);
    document.addEventListener('DOMContentLoaded', updateContent);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        clearTimeout(observerRef.current.timeout);
      }
      window.removeEventListener('load', updateContent);
      document.removeEventListener('DOMContentLoaded', updateContent);
    };
  }, [content, containerRef, extractorConfig]);

  // Update state based on TTS service status - THIS WAS MISSING!
  useEffect(() => {
    const interval = setInterval(() => {
      const status = ttsService.getStatus();
      setIsPlaying(status.isPlaying);
      setIsPaused(status.isPaused);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handlePlay = async () => {
    if (!pageContent || disabled) {
      console.log('Cannot play:', { pageContent, disabled });
      return;
    }

    try {
      setError(null);

      if (isPaused) {
        ttsService.resume();
      } else if (isPlaying) {
        ttsService.pause();
      } else {
        setIsLoading(true);
        await ttsService.speak(pageContent);
      }
    } catch (err) {
      console.error('Audio playback error:', err);
      setError('حدث خطأ في تشغيل الصوت');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    ttsService.stop();
  };

  const getIcon = () => {
    if (isLoading) return <CircularProgress size={24} sx={{ color: 'white' }} />;
    if (isPlaying) return <Pause />;
    if (isPaused) return <PlayArrow />;
    return <VolumeUp />;
  };

  const getTooltipText = () => {
    if (disabled) return 'الزر معطل';
    if (!pageContent) return 'لا يوجد محتوى للقراءة';
    if (isLoading) return 'جاري تحضير الصوت...';
    if (isPlaying) return 'إيقاف مؤقت';
    if (isPaused) return 'استئناف القراءة';
    
    // Calculate word count for tooltip
    const wordCount = pageContent.split(/\s+/).filter(word => word.length > 0).length;
    return `قراءة محتوى الصفحة (${wordCount} كلمة)`;
  };

  // Debug log
  useEffect(() => {
    console.log('AudioButton state:', { 
      pageContent: pageContent?.substring(0, 50) + '...', 
      disabled, 
      isPlaying,
      isPaused,
      isLoading,
      isButtonDisabled: disabled || !pageContent || isLoading 
    });
  }, [pageContent, disabled, isLoading, isPlaying, isPaused]);

  return (
    <>
      <Tooltip title={getTooltipText()} placement="right">
        <span>
          <Fab
            color="primary"
            aria-label="read content"
            onClick={handlePlay}
            disabled={disabled || !pageContent || isLoading}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              backgroundColor: '#1b5e20',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2e7d32',
              },
              '&.Mui-disabled': {
                backgroundColor: '#cccccc',
                color: '#666666',
              },
              zIndex: 1000,
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            {getIcon()}
          </Fab>
        </span>
      </Tooltip>

      {/* Stop button */}
      {(isPlaying || isPaused) && (
        <Tooltip title="إيقاف القراءة" placement="right">
          <Fab
            size="small"
            aria-label="stop reading"
            onClick={handleStop}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 88,
              backgroundColor: '#d32f2f',
              color: 'white',
              '&:hover': {
                backgroundColor: '#f44336',
              },
              zIndex: 1000,
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            <VolumeOff />
          </Fab>
        </Tooltip>
      )}

      {/* Error message */}
      {error && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            backgroundColor: '#d32f2f',
            color: 'white',
            padding: '12px 20px',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1001,
          }}
        >
          {error}
        </div>
      )}
    </>
  );
}