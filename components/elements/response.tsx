"use client";

import { type ComponentProps, memo, useCallback, useState } from "react";
import { Streamdown } from "streamdown";
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

    const handleContextMenu = useCallback(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim() || "";
      setSelectedText(text);
    }, []);

    const handleExplain = useCallback(() => {
      if (selectedText && onExplain) {
        onExplain(selectedText);
      }
    }, [selectedText, onExplain]);

    return (
      <ContextMenu>
        <ContextMenuTrigger
          asChild
          disabled={!onExplain}
          onContextMenu={handleContextMenu}
        >
          <div>
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
            <ContextMenuItem onClick={handleExplain}>
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
