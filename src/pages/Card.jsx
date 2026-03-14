import { useCart } from "../context/CardContext";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";

const Card = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 md:p-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-6">

            {cart.map((item) => (

              <div
                key={item.product._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow rounded-lg p-4 gap-4"
              >

                {/* Product Info */}
                <div className="flex gap-4">

                  <img
                    src={item.product.image?.[0]}
                    alt={item.product.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                  />

                  <div>

                    <h3 className="font-semibold text-lg">
                      {item.product.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      ${item.product.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-2">

                      <button
                        onClick={() =>
                          decreaseQty(item.product._id, item.quantity)
                        }
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item.product._id, item.quantity)
                        }
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>


                {/* Right Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">

                  {/* Item Price */}
                  <div className="font-semibold text-lg">
                    ${item.product.price * item.quantity}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

            {/* Total Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t pt-6 gap-4">

              <h3 className="text-xl md:text-2xl font-bold">
                Total: ${total}
              </h3>

              <Link
                to="/product/checkout"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full md:w-auto text-center"
              >
                Checkout
              </Link>

            </div>

          </div>
        )}

      </div>
    </Layout>
  );
};

export default Card;