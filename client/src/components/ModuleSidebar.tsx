import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, PlayCircle, FileText } from "lucide-react";
import type { Module } from "@/types";

interface ModuleSidebarProps {
  modules: Module[];
  currentModuleId: number;
  progress: Record<number, boolean>;
  onSelectModule: (moduleId: number) => void;
}

export function ModuleSidebar({
  modules,
  currentModuleId,
  progress,
  onSelectModule,
}: ModuleSidebarProps) {
  return (
    <div className="w-64 border-r h-screen bg-sidebar">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="font-semibold mb-4">Course Modules</h2>
          <div className="space-y-2">
            {modules.map((module) => (
              <Button
                key={module.id}
                variant={module.id === currentModuleId ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  progress[module.id] && "text-muted-foreground"
                )}
                onClick={() => onSelectModule(module.id)}
              >
                <div className="flex items-center gap-2">
                  {progress[module.id] ? (
                    <Check className="h-4 w-4" />
                  ) : module.id === currentModuleId ? (
                    <PlayCircle className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  <span className="truncate">{module.title}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}