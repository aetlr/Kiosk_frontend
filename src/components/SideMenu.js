import React from "react";

export default function SideMenu({ categories, selectedCategory, onCategoryClick, onCartClick }) {
  return (
    <div className="w-1/5 bg-amber-900 p-4 flex flex-col justify-between">
      {/* 상단: 로고 + 메뉴 */}
      <div className="flex flex-col items-center gap-4">
        <img src="/logo_cut.png" alt="Logo" className="w-max h-32 object-contain" />
        {categories.map((menu, idx) => (
          <button
            key={idx}
            className={`w-full py-3 rounded text-lg transition font-semibold mb-1 ${selectedCategory === menu ? 'bg-amber-400 text-amber-900 shadow' : 'bg-amber-700 text-white hover:bg-amber-600'}`}
            onClick={() => onCategoryClick(menu)}
          >
            {menu}
          </button>
        ))}
      </div>
      {/* 하단: 주문내역 + 직원호출 + 장바구니 */}
      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="flex gap-2 w-full">
          <button className="flex-1 bg-white text-amber-900 py-2 rounded text-sm font-medium hover:bg-amber-100">
            주문내역
          </button>
          <button className="flex-1 bg-white text-amber-900 py-2 rounded text-sm font-medium hover:bg-amber-100">
            직원호출
          </button>
        </div>
        <button className="w-full bg-red-600 text-white text-lg py-4 rounded mt-2 hover:bg-red-700 transition" onClick={onCartClick}>
          장바구니
        </button>
      </div>
    </div>
  );
} 