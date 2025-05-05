import React from 'react'
import Friendslist from './CommonComponent/Friendslist'

const Message = () => {
  return (
    <div className='flex w-full h-[85vh] p-2 gap-x-1 '>
      <Friendslist />
      <div className='bg-gray-300 w-full rounded-lg'>
        <div className="flex flex-col h-full animate-pulse bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">

          {/* Top User Info Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded w-16"></div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Received message */}
            <div className="flex">
              <div className="max-w-[70%] bg-gray-300 dark:bg-gray-700 rounded-xl rounded-bl-none p-3">
                <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded w-48"></div>
              </div>
            </div>

            {/* Sent message */}
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-gray-200 dark:bg-gray-600 rounded-xl rounded-br-none p-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-40 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-400 rounded w-32"></div>
              </div>
            </div>

            {/* Received message */}
            <div className="flex">
              <div className="max-w-[60%] bg-gray-300 dark:bg-gray-700 rounded-xl rounded-bl-none p-3">
                <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-500 rounded w-36"></div>
              </div>
            </div>

            {/* Sent message */}
            <div className="flex justify-end">
              <div className="max-w-[65%] bg-gray-200 dark:bg-gray-600 rounded-xl rounded-br-none p-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-44 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-400 rounded w-28"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Message input */}
        <div className="flex items-center px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {/* Attach icon placeholder */}
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full mr-3"></div>

          {/* Input placeholder */}
          <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-700 rounded-full">Not implement Yet</div>

          {/* Send icon placeholder */}
          <div className="ml-3 w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Message