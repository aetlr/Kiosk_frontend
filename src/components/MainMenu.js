import React, { useState } from "react";

export default function MainMenu({ foods, onAddToCart, title }) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState({});

  const handleCardClick = (food) => {
    setSelectedFood(food);
    setQuantity(1);
    if (food.options) {
      const initial = {};
      food.options.forEach(opt => {
        initial[opt.name] = {};
        opt.values.forEach(v => {
          initial[opt.name][v.value] = 0;
        });
      });
      setOptions(initial);
    } else {
      setOptions({});
    }
  };

  const handleClose = () => {
    setSelectedFood(null);
  };

  const handleAddToCart = () => {
    if (!selectedFood) return;
    // 옵션 요약 문자열 생성
    let optionsSummary = "";
    if (selectedFood.options) {
      optionsSummary = selectedFood.options.map(opt => {
        const picked = opt.values
          .map(v => {
            const cnt = options[opt.name]?.[v.value] || 0;
            return cnt > 0 ? `${v.label} x${cnt}` : null;
          })
          .filter(Boolean)
          .join(", ");
        return picked ? `${opt.name}: ${picked}` : null;
      }).filter(Boolean).join(" | ");
    }
    const totalPrice = (selectedFood.price + getOptionsPrice()) * quantity;
    onAddToCart && onAddToCart({
      name: selectedFood.name,
      price: selectedFood.price,
      quantity,
      options: JSON.parse(JSON.stringify(options)),
      optionsSummary,
      totalPrice,
    });
    setSelectedFood(null);
  };

  const handleOptionCount = (optionName, value, delta) => {
    setOptions(prev => ({
      ...prev,
      [optionName]: {
        ...prev[optionName],
        [value]: Math.max(0, (prev[optionName]?.[value] || 0) + delta),
      },
    }));
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const getOptionsPrice = () => {
    if (!selectedFood?.options) return 0;
    let sum = 0;
    selectedFood.options.forEach(opt => {
      opt.values.forEach(v => {
        const count = options[opt.name]?.[v.value] || 0;
        sum += (v.price || 0) * count;
      });
    });
    return sum;
  };

  return (
    <div className="w-4/5 bg-amber-50 p-6 overflow-y-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-900">{title}</h2>
        <span className="text-amber-600">테이블 번호 - 1</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {foods.map((food, idx) => (
          <div
            key={idx}
            className="bg-white border border-amber-200 rounded shadow flex flex-col items-center justify-between p-4 h-48 hover:bg-amber-100 transition cursor-pointer"
            onClick={() => handleCardClick(food)}
          >
            {/* 이미지 자리 */}
            <div className="w-full h-24 mb-2 rounded overflow-hidden">
              {food.image ? (
                <img 
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm" style={{ display: food.image ? 'none' : 'flex' }}>
                이미지 없음
              </div>
            </div>
            {/* 이름 + 가격 */}
            <div className="text-center">
              <p className="text-xl font-semibold text-amber-900">{food.name}</p>
              <p className="text-md text-gray-700">{food.price.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>

      {/* 오버레이 세부 주문창 */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl flex w-[1000px] max-w-[98vw] p-14 relative">
            {/* 왼쪽: 상품 이미지 */}
            <div className="w-96 h-96 rounded-2xl mr-14 flex-shrink-0 overflow-hidden shadow-lg">
              {selectedFood.image ? (
                <img 
                  src={selectedFood.image} 
                  alt={selectedFood.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-lg" style={{ display: selectedFood.image ? 'none' : 'flex' }}>
                이미지 없음
              </div>
            </div>
            {/* 오른쪽: 세부 주문 */}
            <div className="flex flex-col flex-1">
              <div className="mb-2">
                <span className="text-xl font-bold text-amber-900">{selectedFood.name}</span>
                <span className="ml-2 text-lg text-gray-700">{selectedFood.price.toLocaleString()}원</span>
              </div>
              {/* 옵션: 메뉴별 동적 렌더링 (라벨+플마버튼) */}
              {selectedFood.options && (
                <div className="flex flex-col gap-4 mb-6">
                  {selectedFood.options.map((opt, idx) => (
                    <div key={opt.name}>
                      <div className="block text-sm font-medium text-gray-700 mb-2">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.map(v => (
                          <div key={v.value} className="flex items-center bg-amber-100 rounded-full px-3 py-1">
                            <span className="mr-2 text-amber-900 text-sm">{v.label}</span>
                            <button
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-300 text-amber-900 font-bold mr-1"
                              onClick={() => handleOptionCount(opt.name, v.value, -1)}
                              disabled={options[opt.name]?.[v.value] === 0}
                            >-</button>
                            <span className="w-5 text-center text-amber-900">{options[opt.name]?.[v.value] || 0}</span>
                            <button
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-300 text-amber-900 font-bold ml-1"
                              onClick={() => handleOptionCount(opt.name, v.value, 1)}
                            >+</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* 수량 조절 */}
              <div className="flex items-center mb-4 mt-2">
                <span className="mr-2">수량</span>
                <button
                  className="w-8 h-8 rounded bg-amber-200 text-amber-900 font-bold"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="mx-3 text-lg">{quantity}</span>
                <button
                  className="w-8 h-8 rounded bg-amber-200 text-amber-900 font-bold"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              <div className="mt-auto">
                {/* 총 가격 */}
                <div className="mb-4 text-right text-lg font-semibold">
                  총 가격: {(
                    (selectedFood.price + getOptionsPrice()) * quantity
                  ).toLocaleString()}원
                </div>
                {/* 버튼 */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2 rounded bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400"
                    onClick={handleClose}
                  >
                    취소
                  </button>
                  <button
                    className="flex-1 py-2 rounded bg-amber-700 text-white font-semibold hover:bg-amber-800"
                    onClick={handleAddToCart}
                  >
                    장바구니 추가
                  </button>
                </div>
              </div>
            </div>
            {/* 닫기 버튼 (오른쪽 상단) */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 