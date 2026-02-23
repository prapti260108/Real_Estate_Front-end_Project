import React from 'react'

export default function Footer() {
  return (
    <div>
        <footer className="bg-[#1A1A1A] px-8 py-12 text-sm text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-black">
              Privacy Notice
            </a>
            <a href="#" className="text-gray-400 hover:text-black">
              Terms of use
            </a>
          </div>

          <p className="mb-4 text-gray-400 leading-relaxed max-w-2xl">
            Please, be informed, that the intellectual property rights to all the photos, designs and other materials on
            this Site belong to "YODEZEEN GROUP" LLC. You may request permission to use them by contacting us at:
            privacy@yodezeen.com
          </p>

          <div className="flex justify-between items-end">
            <p className="text-gray-400">COPYRIGHT 2018. ALL RIGHTS RESERVED.</p>
            <div className="text-right text-gray-400">
              <p className="mb-1">DEVELOPED BY</p>
              <p className="font-medium">the first</p>
              <p className="font-medium">the last.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
