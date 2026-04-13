import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./Button";
import { cn } from "../lib/cn";

type CarouselContextValue = {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  scrollByDirection: (direction: "prev" | "next") => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("Carousel components must be used inside <Carousel />");
  }

  return context;
}

function setRef<T>(ref: React.ForwardedRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function Carousel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const scrollByDirection = React.useCallback((direction: "prev" | "next") => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const distance = viewport.clientWidth;
    viewport.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth"
    });
  }, []);

  return (
    <CarouselContext.Provider value={{ viewportRef, scrollByDirection }}>
      <div className={cn("relative", className)} {...props} />
    </CarouselContext.Provider>
  );
}

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { viewportRef } = useCarousel();

    return (
      <div
        ref={(node) => {
          viewportRef.current = node;
          setRef(ref, node);
        }}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className
        )}
        {...props}
      />
    );
  }
);

CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0 shrink-0 basis-full snap-center", className)} {...props} />
  )
);

CarouselItem.displayName = "CarouselItem";

function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { scrollByDirection } = useCarousel();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("absolute left-3 top-1/2 -translate-y-1/2", className)}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          scrollByDirection("prev");
        }
      }}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { scrollByDirection } = useCarousel();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("absolute right-3 top-1/2 -translate-y-1/2", className)}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          scrollByDirection("next");
        }
      }}
      {...props}
    >
      <ChevronRight className="size-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious };
