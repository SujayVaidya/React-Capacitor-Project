import { useState } from "react";
import { ShoppingCart as CartIcon } from "lucide-react";
import CardStack, { SwipeAction } from "./components/CardStack";
import Modal from "./components/Modal";
import { products, type Product } from "./data/products";

export default function App() {
  const [liked, setLiked] = useState<Product[]>([]);
  const [disliked, setDisliked] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAction = (product: Product, action: SwipeAction) => {
    if (action === "right") setLiked((prev) => [...prev, product]);
    if (action === "left") setDisliked((prev) => [...prev, product]);
    if (action === "up") setCartItems((prev) => [...prev, product]);
  };

  const totalSwiped = liked.length + disliked.length + cartItems.length;
  const allDone = totalSwiped >= products.length;

  const handleRefresh = () => window.location.reload();

  return (
    <div className="w-screen h-screen relative bg-gradient-to-b from-pink-500 to-orange-500 overflow-hidden">
      {/* Title */}
      <header className="absolute top-10 lg:top-4 xl:top-4 left-4 flex items-center space-x-2 text-white text-2xl font-bold">
        <CartIcon className="w-8 h-8" />
        <span>Card Swiper</span>
      </header>

      {/* Cart & Details */}
      {!allDone && (
        <div className="absolute top-10 lg:top-4 xl:top-4 right-4 flex space-x-2">
          <button
            onClick={() => setShowCart(true)}
            disabled={!allDone && cartItems.length === 0}
            className="px-3 py-1 rounded bg-white bg-opacity-20 text-white disabled:opacity-50"
          >
            Cart ({cartItems.length})
          </button>
          <button
            onClick={() => setShowDetails(true)}
            disabled={!allDone && liked.length + disliked.length === 0}
            className="px-3 py-1 rounded bg-white bg-opacity-20 text-white disabled:opacity-50"
          >
            Details
          </button>
        </div>
      )}

      {/* Card area */}
      <div className="w-full h-full flex items-center justify-center">
        {!allDone && <CardStack onAction={handleAction} />}
      </div>

      {/* Done overlay */}
      {allDone && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4 bg-black bg-opacity-30">
          <p className="text-2xl font-semibold">
            You have reviewed all products.
          </p>

          <div className="flex flex-row justify-center items-center gap-5 space-x-2">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-white text-pink-600 rounded-md"
            >
              Refresh
            </button>
            <button
              onClick={() => setShowCart(true)}
              disabled={!allDone && cartItems.length === 0}
              className="px-4 py-2 bg-white text-pink-600 rounded-md"
            >
              Cart ({cartItems.length})
            </button>
            <button
              onClick={() => setShowDetails(true)}
              disabled={!allDone && liked.length + disliked.length === 0}
              className="px-4 py-2 bg-white text-pink-600 rounded-md"
            >
              Details
            </button>
          </div>
        </div>
      )}

      {/* Cart modal */}
      {showCart && (
        <Modal title="Cart Items" onClose={() => setShowCart(false)}>
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-8 h-8 object-cover rounded"
                />
                <span>{item.name}</span>
              </div>
            ))
          )}
        </Modal>
      )}

      {/* Details modal */}
      {showDetails && (
        <Modal title="Liked & Disliked" onClose={() => setShowDetails(false)}>
          <h3 className="font-semibold">Liked:</h3>
          {liked.length === 0 ? (
            <p>None</p>
          ) : (
            liked.map((item) => <p key={item.id}>• {item.name}</p>)
          )}
          <h3 className="font-semibold mt-2">Disliked:</h3>
          {disliked.length === 0 ? (
            <p>None</p>
          ) : (
            disliked.map((item) => <p key={item.id}>• {item.name}</p>)
          )}
        </Modal>
      )}
    </div>
  );
}
