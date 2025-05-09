import React, { useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import { products, type Product } from "../data/products";
import { Heart, X, ShoppingCart } from "lucide-react";

export type SwipeAction = "left" | "right" | "up";

interface CardStackProps {
  onAction: (product: Product, action: SwipeAction) => void;
}

export default function CardStack({ onAction }: CardStackProps) {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0, rot: 0 });
  const [disableTransition, setDisableTransition] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const THRESHOLD = 100;

  // Top 3 cards visible
  const visible = products.slice(index, index + 3);

  // Briefly disable transition when a new card appears
  useEffect(() => {
    setDisableTransition(true);
    const tid = setTimeout(() => setDisableTransition(false), 10);
    return () => clearTimeout(tid);
  }, [index]);

  const handlePointerDown = (e: React.PointerEvent) => {
    ref.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    const x = pos.x + e.movementX;
    const y = pos.y + e.movementY;
    setPos({ x, y, rot: x / 20 });
  };

  const handlePointerUp = () => {
    const { x, y } = pos;
    if (x > THRESHOLD) return doSwipe("right");
    if (x < -THRESHOLD) return doSwipe("left");
    if (y < -THRESHOLD) return doSwipe("up");
    // snap back
    setPos({ x: 0, y: 0, rot: 0 });
  };

  const doSwipe = (action: SwipeAction) => {
    const current = products[index];
    onAction(current, action);

    // fling off-screen
    const offX =
      action === "left"
        ? -window.innerWidth
        : action === "right"
        ? window.innerWidth
        : 0;
    const offY = action === "up" ? -window.innerHeight : 0;

    setDisableTransition(false);
    setPos({ x: offX, y: offY, rot: pos.rot });

    setTimeout(() => {
      setIndex((i) => i + 1);
      setPos({ x: 0, y: 0, rot: 0 });
    }, 300);
  };

  // Determine which icon to fade in
  const likeOpacity = pos.x > 0 ? Math.min(pos.x / THRESHOLD, 1) : 0;
  const dislikeOpacity = pos.x < 0 ? Math.min(-pos.x / THRESHOLD, 1) : 0;
  const cartOpacity = pos.y < 0 ? Math.min(-pos.y / THRESHOLD, 1) : 0;

  return (
    <div className="relative w-72 h-96">
      {visible.map((product, idx) => {
        const isTop = idx === 0;
        const offsetY = idx * 8;
        const scale = 1 - idx * 0.02;

        const style: React.CSSProperties = {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: isTop
            ? `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg)`
            : `translate(0px, ${offsetY}px) scale(${scale})`,
          transition: isTop
            ? disableTransition
              ? "none"
              : "transform 0.3s ease-out"
            : "transform 0.3s ease-out",
          touchAction: isTop ? "none" : "auto",
          userSelect: "none",
          zIndex: visible.length - idx,
        };

        return (
          <div
            key={product.id}
            ref={isTop ? ref : undefined}
            onPointerDown={isTop ? handlePointerDown : undefined}
            onPointerMove={isTop ? handlePointerMove : undefined}
            onPointerUp={isTop ? handlePointerUp : undefined}
            className={isTop ? "cursor-grab select-none" : "select-none"}
            style={style}
          >
            {!isTop ? (
              <div className="w-full h-full border border-white border-opacity-50 rounded-2xl" />
            ) : (
              <>
                <ProductCard product={product} style={{}} />
                {/* Icons only for their axis */}
                <X
                  className="absolute top-4 left-4 w-12 h-12 text-white"
                  style={{ opacity: dislikeOpacity }}
                />
                <Heart
                  className="absolute top-4 right-4 w-12 h-12 text-white"
                  style={{ opacity: likeOpacity }}
                />
                <ShoppingCart
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 text-white"
                  style={{ opacity: cartOpacity }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
