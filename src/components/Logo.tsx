export default function Logo() {
    return (
        <div className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg"></div>
            ChurnInsight<span className="text-cyan-400">.17</span>
        </div>
    );
}