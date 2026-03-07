import React from "react";
import { Smile, Send } from "lucide-react";

export const ChatArea = ({
  messages,
  currentUserId,
  chatEndRef,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <main className="flex flex-col flex-1 bg-slate-50/50 relative">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="text-center pb-6 border-b border-slate-200/60 mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Discussion Started
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Today</p>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender.id === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={msg.sender.profile}
                  className="w-8 h-8 rounded-full shadow-sm mt-4"
                  alt="Avatar"
                />
              )}

              <div
                className={`flex flex-col max-w-md ${isMe ? "items-end" : "items-start"}`}
              >
                <div className="text-[11px] font-semibold text-slate-400 mb-1.5 px-1">
                  {isMe ? "You" : msg.sender.fullName}
                </div>

                <div
                  className={`px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-2xl rounded-tr-sm"
                      : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {isMe && (
                <img
                  src={msg.sender.profile}
                  className="w-8 h-8 rounded-full shadow-sm mt-4"
                  alt="Avatar"
                />
              )}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white border-t border-slate-200">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-50 focus-within:bg-white border border-slate-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 rounded-2xl px-2 py-2 shadow-sm transition-all"
        >
          <button
            type="button"
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors shrink-0"
          >
            <Smile size={20} />
          </button>

          <textarea
            rows="1"
            value={newMessage}
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 max-h-32 min-h-[40px] resize-none outline-none text-sm bg-transparent py-2.5 text-slate-700"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all mb-0.5 mr-0.5"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
      </div>
    </main>
  );
};
