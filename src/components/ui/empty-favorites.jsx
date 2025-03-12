import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function EmptyFavorites() {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://assets5.lottiefiles.com/packages/lf20_ysrn2iwp.json", // Heart animation JSON
      });

      return () => anim.destroy();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <div ref={animationContainer} className="w-64 h-64 mb-6"></div>
      <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        You haven't added any products to your favorites. Start exploring and
        heart the items you love!
      </p>
      <Button asChild>
        <Link to="/shop">Browse Products</Link>
      </Button>
    </div>
  );
}
