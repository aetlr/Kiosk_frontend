import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import MainMenu from "../components/MainMenu";
import PaymentOverlay from "../components/PaymentOverlay";
import NotificationOverlay from "../components/NotificationOverlay";

const categories = ["파스타", "사이드메뉴", "음료"];

const foodsByCategory = {
  파스타: [
    { 
      name: "로제파스타", 
      price: 14000,
      image: "/rose.jpg",
      options: [
        {
          name: "면 추가",
          values: [
            { label: "면 추가", value: "noodle_extra", price: 2000 }
          ]
        }
      ]
    },
    { 
      name: "알리오올리오", 
      price: 13000,
      image: "/alio.jpg",
      options: [
        {
          name: "면 추가",
          values: [
            { label: "면 추가", value: "noodle_extra", price: 2000 }
          ]
        }
      ]
    },
    { 
      name: "봉골레", 
      price: 13500,
      image: "/bongole.jpg",
      options: [
        {
          name: "면 추가",
          values: [
            { label: "면 추가", value: "noodle_extra", price: 2000 }
          ]
        }
      ]
    },
    { 
      name: "까르보나라", 
      price: 14500,
      image: "/carbo.jpg",
      options: [
        {
          name: "면 추가",
          values: [
            { label: "면 추가", value: "noodle_extra", price: 2000 }
          ]
        }
      ]
    },
    { 
      name: "크림베이컨", 
      price: 15000,
      image: "/cream.jpg",
      options: [
        {
          name: "면 추가",
          values: [
            { label: "면 추가", value: "noodle_extra", price: 2000 }
          ]
        }
      ]
    },
  ],
  사이드메뉴: [
    { 
      name: "미니감바스", 
      price: 8000,
      image: "/gambas.jpg"
    },
    { 
      name: "미니 피자", 
      price: 12000,
      image: "/pizza.jpg"
    },
    { 
      name: "샐러드", 
      price: 9000,
      image: "/salad.jpg"
    },
    { 
      name: "마늘바게트", 
      price: 4000,
      image: "/garlicbread.jpg"
    },
  ],
  음료: [
    { 
      name: "사이다", 
      price: 3000,
      image: "/cider.jpg"
    },
    { 
      name: "콜라",   
      price: 3000,
      image: "/cola.jpg"
    },
    { 
      name: "레몬에이드", 
      price: 4500,
      image: "/lemonade.jpg"
    },
    { 
      name: "아이스티", 
      price: 4000,
      image: "/icetea.jpg"
    },
  ],
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
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  let notificationId = React.useRef(0);

  // 알림 추가 함수
  const pushNotification = (notification) => {
    const id = notificationId.current++;
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  // 알림 제거 함수
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // 장바구니 추가 함수 (MainMenu에 전달)
  const handleAddToCart = (item) => {
    setCart(prev => [...prev, item]);
    pushNotification({
      message: `${item.name}이(가) 장바구니에 추가되었습니다!`,
      type: "success"
    });
  };

  // 장바구니 삭제
  const handleRemove = (idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  // 주문하기 - 결제페이지 열기
  const handleOrder = () => {
    setPaymentOpen(true);
    setCartOpen(false);
  };

  // 결제 완료 처리
  const handlePaymentComplete = () => {
    setCart([]);
    setPaymentOpen(false);
    pushNotification({
      message: "결제가 완료되었습니다! 주문이 접수되었습니다.",
      type: "success"
    });
  };

  // 직원호출 처리
  const handleStaffCall = () => {
    pushNotification({
      message: "직원이 호출되었습니다. 잠시만 기다려주세요.",
      type: "info"
    });
  };

  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen flex relative">
      <SideMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={setSelectedCategory}
        onCartClick={() => setCartOpen(true)}
        onStaffCall={handleStaffCall}
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
      {paymentOpen && (
        <PaymentOverlay
          cart={cart}
          total={total}
          onClose={() => setPaymentOpen(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
      {/* 알림 스택 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        {notifications.map((n, idx) => (
          <NotificationOverlay
            key={n.id}
            message={n.message}
            type={n.type}
            onClose={() => removeNotification(n.id)}
            style={{ zIndex: 50 + notifications.length - idx }}
          />
        ))}
      </div>
    </div>
  );
}

