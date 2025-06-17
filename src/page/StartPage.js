import { useNavigate } from 'react-router-dom';

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" 
         style={{ backgroundImage: "url('pasta.png')" }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <img 
        src="logo.png" 
        alt="로고" 
        className="absolute top-8 left-8 w-80 h-auto z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      />
      <button 
        onClick={() => navigate('/order')}
        className="px-16 py-8 text-4xl font-bold text-amber-300
                   bg-amber-50/40 backdrop-blur-md rounded-2xl
                   border border-amber-200/50 shadow-lg
                   hover:bg-amber-50/50 transition-all duration-300
                   transform hover:scale-105
                   relative z-10
                   shadow-[0_0_20px_rgba(251,191,36,0.3)]"
      >
        주문하기
      </button>
    </div>
  );
}
