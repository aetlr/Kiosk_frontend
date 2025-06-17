import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import MainMenu from "../components/MainMenu";

const categories = ["파스타", "사이드메뉴", "음료"];

const foodsByCategory = {
  파스타: [
    { name: "로제파스타", price: 14000 },
    { name: "알리오올리오", price: 13000 },
    { name: "봉골레", price: 13500 },
    { name: "까르보나라", price: 14500 },
    { name: "크림베이컨", price: 15000 },
  ],
  사이드메뉴: [],
  음료: [],
};

function CartOverlay({ cart, onClose, onRemove, onOrder }) {
  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  return (
    <div className="fixed top-0 right-0 h-full w-[400px] max-w-full bg-white shadow-2xl z-50 flex flex-col">
      <div className="p-6 border-b text-xl font-bold text-amber-900">장바구니</div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
        {cart.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">장바구니가 비어 있습니다.</div>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} className="bg-amber-50 rounded-xl p-5 shadow-md min-h-[120px] flex">
              {/* 좌측: 음식 정보 */}
              <div className="flex flex-col justify-between flex-1 h-full">
                <div>
                  <div className="font-semibold text-lg text-amber-900 mb-1">{item.name}</div>
                  <div className="text-base text-gray-700 mb-1">수량: {item.quantity}</div>
                  <div className="text-sm text-gray-700 mb-1">{item.optionsSummary}</div>
                </div>
              </div>
              {/* 우측: 가격/삭제 */}
              <div className="flex flex-col items-end justify-between ml-6">
                <div className="font-bold text-xl text-amber-900">{item.totalPrice.toLocaleString()}원</div>
                <button className="mt-3 text-xs text-red-500 hover:underline" onClick={() => onRemove(idx)}>삭제</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-6 border-t bg-amber-50">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg">합계</span>
          <span className="font-bold text-xl text-amber-900">{total.toLocaleString()}원</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400" onClick={onClose}>닫기</button>
          <button className="flex-1 py-2 rounded bg-amber-700 text-white font-semibold hover:bg-amber-800" onClick={onOrder}>주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // 장바구니 추가 함수 (MainMenu에 전달)
  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
    // setCartOpen(true); // 자동 오픈 제거
  };

  // 장바구니 삭제
  const handleRemove = (idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  // 주문하기(예시)
  const handleOrder = () => {
    alert("주문이 완료되었습니다!");
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen flex relative">
      <SideMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={setSelectedCategory}
        onCartClick={() => setCartOpen(true)}
      />
      <MainMenu foods={foodsByCategory[selectedCategory] || []} onAddToCart={handleAddToCart} title={selectedCategory} />
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          <CartOverlay
            cart={cart}
            onClose={() => setCartOpen(false)}
            onRemove={handleRemove}
            onOrder={handleOrder}
          />
        </>
      )}
    </div>
  );
}
