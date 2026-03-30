"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, MessageSquare } from "lucide-react";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const chats = [
    { id: "1", name: "TechCorp HR", lastMessage: "Assalomu alaykum, arizangiz...", time: "10:30", unread: 2 },
    { id: "2", name: "InnovateCo", lastMessage: "Intervyu vaqti keldi", time: "09:15", unread: 0 },
  ];

  const messages = [
    { id: "1", sender: "them", text: "Assalomu alaykum!", time: "10:00" },
    { id: "2", sender: "me", text: "Va alaykum assalom!", time: "10:05" },
  ];

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Chat List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Xabarlar</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Qidirish..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100%-5rem)]">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                    selectedChat === chat.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{chat.name}</p>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">TechCorp HR</CardTitle>
                    <CardDescription>Online</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.sender === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="text-xs opacity-70">{msg.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardContent className="border-t pt-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Xabar yozish..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && setMessage("")}
                  />
                  <Button size="icon" onClick={() => setMessage("")}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Suhbat tanlang</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
