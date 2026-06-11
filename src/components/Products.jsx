import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { getProducts, categories, WHATSAPP_URL } from "../services/productsService";
import { KineticText } from "./ui/kinetic-text";
import { useCart } from "../hooks/useCart";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useScrollAnimation();
  const glowRef = useRef(null);
  const { addItem } = useCart();

  useEffect(() => {
    getProducts().then((result) => {
      setProducts(result.data || []);
      setLoading(false);
    });
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addItem(product, 1);
  };

  return (
    <section
      id="products"
      className="py-20 sm:py-28 bg-background relative overflow-hidden"
      ref={sectionRef}
    >
      <m.div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(45,122,58,0.15), transparent)",
        }}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Our Collection
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <KineticText text="Shop by Category" className="justify-center" />
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-emerald-400 mx-auto rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent hover:border-primary-500/30"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 mx-auto text-primary-500"
            >
              🌿
            </motion.div>
            <p className="text-foreground mt-4">Loading products...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden"
                >
                  <div className="relative aspect-square bg-gradient-to-br from-primary-50 to-gray-50 dark:from-primary-900/10 dark:to-gray-900 overflow-hidden">
                    <motion.img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{ willChange: "transform" }}
                    />
                    {product.badge && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-lg shadow-orange-500/40"
                      >
                        {product.badge}
                      </motion.span>
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider"
                    >
                      {product.category.replace("-", " ")}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.03 }}
                    className="p-5 space-y-3"
                  >
                    <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary-500 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {product.benefits && product.benefits.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                        className="flex flex-wrap gap-1.5"
                      >
                        {product.benefits.map((b, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.3 + i * 0.05,
                              type: "spring",
                              stiffness: 300,
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 text-xs font-medium border border-primary-100 dark:border-primary-900/20"
                          >
                            {b}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      className="flex items-center justify-between pt-2 border-t border-border"
                    >
                      <span className="font-heading text-xl font-bold text-primary-500">
                        {product.price}
                      </span>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-[45%] py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <span>Add to Cart</span>
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          animate={{ x: [0, 3, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <path d="M12 5v14M19 12H5" />
                        </motion.svg>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <p className="text-foreground text-lg">
              No products found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}