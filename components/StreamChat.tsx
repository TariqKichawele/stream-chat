'use client';

import { createToken } from '@/lib/actions';
import React, { useCallback } from 'react'
import type { ChannelFilters, ChannelOptions, ChannelSort, Channel as ChannelType } from 'stream-chat';
import { 
    ChannelList, 
    Chat, 
    useCreateChatClient, 
    Window, 
    Channel, 
    ChannelHeader, 
    MessageList, 
    MessageInput, 
    Thread, 
    DefaultStreamChatGenerics
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { EmojiPicker } from 'stream-chat-react/emojis';
import { init, SearchIndex } from 'emoji-mart';
import data from '@emoji-mart/data'
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import CustomListContainer from './CustomListContainer';
init({ data });

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HomeIcon, MessageSquare, UsersRound, Scan, MessageCircleMore, Dock, Megaphone } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserButton } from '@clerk/nextjs'

interface StreamChatProps {
    userData: {
        id: string;
        name?: string;
        image?: string;
    }
}

const StreamChat = ({ userData }: StreamChatProps) => {

    const { resolvedTheme } = useTheme();

    const tokenProvider = useCallback(async () => {
        return await createToken(userData.id);
    }, [userData.id, createToken]);

    const client = useCreateChatClient({
        userData,
        tokenOrProvider: tokenProvider,
        apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    }); 

    const sort: ChannelSort<DefaultStreamChatGenerics> = { last_message_at: -1 };
    const filters: ChannelFilters<DefaultStreamChatGenerics> = { type: 'messaging', members: { $in: [userData.id] } };
    const options: ChannelOptions = { limit: 10 };

    if (!client) return <div>Setting up client & connection...</div>;

    return (
        <Chat 
            client={client}
            theme={cn(
                resolvedTheme === 'dark'
                    ? 'str-chat__theme-dark'
                    : 'str-chat__theme-light'
            )}
        >
            <aside className='inset-y z-20 flex h-full flex-col border-r'>
        <nav className='grid gap-1 px-2 py-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-lg'
                  aria-label='Playground'
                  asChild
                >
                  <Link href='/'>
                    <HomeIcon className='size-5' />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Home
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-lg bg-muted'
                  aria-label='Playground'
                >
                  <MessageSquare className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Chats
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-lg'
                  aria-label='Models'
                >
                  <UsersRound className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Communities
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-lg'
                  aria-label='API'
                >
                  <Scan className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Status
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-lg'
                  aria-label='Documentation'
                >
                  <MessageCircleMore className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Channels
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-lg'
                  aria-label='Settings'
                >
                  <Dock className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Tools
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-lg'
                  aria-label='Settings'
                >
                  <Megaphone className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Advertise
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <nav className='mt-auto grid gap-2 px-2 py-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeToggle />
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Theme
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className='flex items-center justify-center'>
            <UserButton />
          </div>
        </nav>
      </aside>
            <ChannelList 
                sort={sort}
                filters={filters}
                options={options}
                List={CustomListContainer}
                sendChannelsToList
            />

            <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
}

export default StreamChat