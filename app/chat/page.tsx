import StreamChat from '@/components/StreamChat';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const ChatPage = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const userData = {
        id: user.id,
        ...(user.fullName ? { name: user.fullName } : {}),
        ...(user.imageUrl ? { image: user.imageUrl } : {}),
    }
  return (
    <StreamChat userData={userData} />
  )
}

export default ChatPage