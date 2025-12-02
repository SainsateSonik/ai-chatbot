"use client";

import {
  type ComponentProps,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { Streamdown } from "streamdown";
import { SparklesIcon } from "@/components/icons";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";

type ResponseProps = ComponentProps<typeof Streamdown> & {
  onExplain?: (selectedText: string) => void;
};

export const Response = memo(
  ({ className, onExplain, ...props }: ResponseProps) => {
    const [selectedText, setSelectedText] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = useCallback(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim() || "";

      // Check if selection is within this component
      if (text && selection && containerRef.current) {
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        if (range) {
          const isWithinComponent = containerRef.current.contains(
            range.commonAncestorContainer
          );
          setSelectedText(isWithinComponent ? text : "");
          return;
        }
      }

      setSelectedText("");
    }, []);

    const handleExplain = useCallback(() => {
      if (selectedText && onExplain) {
        onExplain(selectedText);
        setSelectedText("");
        window.getSelection()?.removeAllRanges();
      }
    }, [selectedText, onExplain]);

    return (
      <ContextMenu>
        <ContextMenuTrigger
          asChild
          disabled={!onExplain}
          onContextMenu={handleContextMenu}
        >
          <div ref={containerRef}>
            <Streamdown
              className={cn(
                "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_code]:whitespace-pre-wrap [&_code]:break-words [&_pre]:max-w-full [&_pre]:overflow-x-auto",
                className
              )}
              {...props}
            />
          </div>
        </ContextMenuTrigger>
        {selectedText && (
          <ContextMenuContent>
            <ContextMenuItem className="gap-1.5" onClick={handleExplain}>
              <SparklesIcon />
              Explain this
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.onExplain === nextProps.onExplain
);

Response.displayName = "Response";
