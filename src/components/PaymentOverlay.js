import React, { useState } from "react";

export default function PaymentOverlay({ cart, total, onClose, onPaymentComplete }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // 결제 처리 시뮬레이션 (2초 후 완료)
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-[600px] max-w-[95vw] p-8 relative">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">결제하기</h2>
          <p className="text-gray-600">주문 금액: {total.toLocaleString()}원</p>
        </div>

        {/* 주문 내역 요약 */}
        <div className="bg-amber-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-3">주문 내역</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name} x{item.quantity}
                  {item.optionsSummary && <span className="text-gray-500 ml-1">({item.optionsSummary})</span>}
                </span>
                <span className="font-medium">{item.totalPrice.toLocaleString()}원</span>
              </div>
            ))}
          </div>
        </div>

        {/* 결제 방법 선택 */}
        <div className="mb-6">
          <h3 className="font-semibold text-amber-900 mb-3">결제 방법</h3>
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-50">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center">
                <div className="w-8 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">💳</span>
                </div>
                <span>신용카드</span>
              </div>
            </label>
            
            <label className="flex items-center p-3 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-50">
              <input
                type="radio"
                name="paymentMethod"
                value="mobile"
                checked={paymentMethod === "mobile"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center">
                <div className="w-8 h-6 bg-green-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📱</span>
                </div>
                <span>모바일 결제</span>
              </div>
            </label>
            
            <label className="flex items-center p-3 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-50">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center">
                <div className="w-8 h-6 bg-gray-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">💵</span>
                </div>
                <span>현금</span>
              </div>
            </label>
          </div>
        </div>

        {/* 결제 금액 표시 */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">총 결제 금액</span>
            <span className="font-bold text-amber-900 text-xl">{total.toLocaleString()}원</span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-xl bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
            onClick={onClose}
            disabled={isProcessing}
          >
            취소
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 transition disabled:opacity-50"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                결제 처리 중...
              </div>
            ) : (
              "결제하기"
            )}
          </button>
        </div>

        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          disabled={isProcessing}
        >
          ×
        </button>
      </div>
    </div>
  );
} 