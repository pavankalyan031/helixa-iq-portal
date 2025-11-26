import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const LinuxVideoPlayer = () => {
  const navigate = useNavigate()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState(new Set([0])) // Track watched videos by index
  const [player, setPlayer] = useState(null)
  const playerRef = useRef(null)

  // Load YouTube IFrame Player API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    } else {
      createPlayer()
    }

    function createPlayer() {
      const newPlayer = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        playerVars: {
          listType: 'playlist',
          list: 'PL0tP8lerTbX3eUtBFS0Ir4_aFqKuXWjYZ',
          index: currentVideoIndex,
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            console.log('YouTube player ready')
            setPlayer(event.target)
            // Load the specific video index
            event.target.playVideoAt(currentVideoIndex)
          },
          onStateChange: (event) => {
            // Mark video as watched when it starts playing
            if (event.data === window.YT.PlayerState.PLAYING) {
              setWatchedVideos(prev => new Set([...prev, currentVideoIndex]))
            }
          }
        }
      })
    }
  }, [])

  // Update player when video index changes
  useEffect(() => {
    if (player && player.playVideoAt) {
      console.log('Switching to video index:', currentVideoIndex)
      player.playVideoAt(currentVideoIndex)
    }
  }, [currentVideoIndex, player])

  // Linux Course playlist videos (selected essential ones)
  const videos = [
    { title: 'What is LINUX for Beginners? Understand Linux Distributions & Kernel [HINDI] | MPrashant', duration: '9:05' },
    { title: 'What is Virtualization? | Hypervisor Types | Virtual Machines [HINDI]', duration: '8:41' },
    { title: 'VirtualBox Setup - Linux Ubuntu & CentOS on Windows', duration: '9:24' },
    { title: 'Access Linux Server Remotely Using SSH - Putty | Windows CMD | GitBash | MobaXterm', duration: '12:38' },
    { title: 'WinScp Setup | Transfer Files Between Linux and Windows', duration: '3:35' },
    { title: 'What is SCP command in Linux? Transfer files between Linux Remote Servers', duration: '10:50' },
    { title: 'Kali Linux Tutorial 🔥 - VirtualBox Setup, SSH, and Decrypt Password | MPrashant', duration: '17:15' },
    { title: 'Linux for Beginners in One Video 🔥 100 Commands Explanation [HINDI] | MPrashant', duration: '2:48:25' },
    { title: 'MOST Frequently USED LINUX COMMANDS in JOB for Beginners [HINDI]', duration: '11:47' },
    { title: 'Linux Commands Starts from A to Z alphabet in Hindi | Quick Revision | MPrashant', duration: '10:39' },
    { title: 'Learn How to use vi / vim editor in Linux with examples in Hindi | MPrashant', duration: '23:31' },
    { title: 'How to Use Nano Editor in Linux | Hindi Tutorial', duration: '7:47' },
    { title: 'How to Use Pipe in Linux | Linux TEE and XARGS Command [HINDI]', duration: '19:26' },
    { title: 'Mastering Linux GREP Command with 15+ Practical Use Cases [HINDI]', duration: '22:53' },
    { title: 'What is Linux Pgrep, Fgrep, ZGrep, PDFGrep, Egrep, Grep Commands | MPrashant', duration: '8:03' },
    { title: 'LINUX FIND COMMAND Tutorial With Practical 12 UseCases or Examples [HINDI]', duration: '22:56' },
    { title: 'LINUX TIPS and TRICKS To Improve Productivity | Linux Script Command', duration: '17:50' },
    { title: 'Linux Wildcards in Hindi With Simple Examples | MPrashant', duration: '24:45' },
    { title: 'Linux Redirects | Linux Stdin Stdout Stderr [HINDI]', duration: '14:14' },
    { title: 'Linux Compression: tar, gzip, and zip Commands Explained', duration: '11:14' },
    { title: 'Understand Linux Hard & Soft Links | Linux LN command [HINDI]', duration: '15:21' },
    { title: 'How to set Environment Variables in Linux? [HINDI]', duration: '19:42' },
    { title: 'ALIAS in Linux To Boost your Productivity [HINDI] | MPrashant', duration: '18:05' },
    { title: 'What Is Linux File System in Hindi? | Linux FileSystem Explained for Beginners [HINDI]', duration: '26:22' },
    { title: 'Types Of Files In Linux | Mprashant', duration: '7:45' },
    { title: 'Linux Boot Process Explained [HINDI] | MPrashant', duration: '15:42' },
    { title: 'Linux File Permissions For Beginners [HINDI] | Linux CHMOD Command', duration: '17:07' },
    { title: 'Linux Access Control List (ACL) | Linux File Permissions Using getfacl & setfacl', duration: '9:15' },
    { title: 'Linux DISK SPACE Monitoring Commands - DF DU FREE [HINDI]', duration: '9:37' },
    { title: 'How to use the PS command in Linux | What is PS command | What is PS -ef?', duration: '11:22' },
    { title: 'How to Use Kill Command? | Linux Kill Command Tutorial in Hindi | MPrashant', duration: '8:59' },
    { title: 'Linux Service Management Using SYSTEMCTL Command | MPrashant', duration: '12:16' },
    { title: 'Top Command: A Linux Command for Quickly Seeing What is Running on Your System', duration: '12:35' },
    { title: 'How to Manage Processes on Linux with nohup, nice, bg, fg, jobs Commands', duration: '17:36' },
    { title: 'Understand Cron Job in Linux with Practical Example [HINDI] | MPrashant', duration: '18:58' },
    { title: 'Linux AT Command | Schedule Task in Linux To Run at Once | Linux Basic Commands for Beginners', duration: '8:52' },
    { title: 'Linux Anacron: Schedule Tasks on Your Terms | Anacrontab | MPrashant', duration: '16:21' },
    { title: 'How to Use Linux Ping Command to Troubleshoot Network Issues | Ping Command Tutorial in Hindi', duration: '16:53' },
    { title: 'How to Use Linux Netstat Command to Troubleshoot Network Issues | Netstat Command In Hindi', duration: '14:22' },
    { title: 'How to Use Linux TraceRoute for Network Troubleshooting | MPrashant', duration: '9:33' },
    { title: 'Master SHELL SCRIPTING in ONE VIDEO 🔥 for Beginners [HINDI] | MPrashant', duration: '5:10:16' },
    { title: 'Master Linux AWK: From Basics to Advanced Techniques | Hindi | MPrashant', duration: '1:16:57' },
    { title: 'Linux SED Command | SED Tutorial in Hindi | Linux for Beginners #6', duration: '40:56' },
    { title: 'Linux Package Management | Linux YUM, DNF, RPM | Rollback Patches', duration: '23:13' },
    { title: 'Linux User Account Management | USERADD, USERMOD, Examples | MPrashant', duration: '20:29' },
    { title: 'Linux Password Aging | Linux CHAGE Command | MPrashant', duration: '10:25' },
    { title: 'Linux SU and SUDO Commands | How to Give SUDO Access to a User using SUDOERS | MPrashant', duration: '16:20' },
    { title: 'Learn Linux SSH Basics - How to Connect to a Server | Linux SSH Tutorial Part-1', duration: '12:50' },
    { title: 'How to SSH Login Without a Password on a Linux Server | Linux SSH Tutorial Part-2', duration: '7:06' },
    { title: 'Linux FIREWALL Management - firewalld service, rules | MPrashant', duration: '37:29' },
    { title: 'What is SUID and SGID in Linux? | MPrashant', duration: '14:06' },
    { title: 'Linux Sticky Bit in Hindi | MPrashant', duration: '11:07' },
    { title: 'How to Change Default Permission in Linux with UMASK | MPrashant', duration: '9:10' },
    { title: 'Linux Chown, Chgrp Command in Hindi | Linux File Ownership Command', duration: '5:24' },
    { title: 'Linux POSTFIX Tutorial to send EMAIL | MPrashant', duration: '17:16' },
    { title: 'Linux Log Monitoring | How to Do Log Analysis? | MPrashant', duration: '19:47' },
    { title: 'How to Use Linux DMESG Command for System Monitor in Hindi |', duration: '9:41' },
    { title: 'Linux LogRotate with Example [HINDI] | MPrashant', duration: '22:00' },
    { title: 'Linux RSYNC Tutorial in [Hindi] | MPrashant', duration: '19:25' },
    { title: 'Linux Apache Web Server HTTPD | Setup with Example in Hindi | Beginners', duration: '10:11' },
    { title: 'What is NGINX WebServer With Example Setup on Linux [Hindi]', duration: '19:03' },
    { title: 'NGINX Reverse Proxy Setup with Example Using HTTPD [Hindi]', duration: '13:34' },
    { title: 'FTP in Linux | FTP Server in Linux | MPrashant', duration: '16:50' },
    { title: 'Learn Linux NFS Fast--You WON\'T BELIEVE What Happens Next! | MPrashant', duration: '16:33' },
    { title: 'Learn Linux SAMBA Server Fast--You WON\'T BELIEVE What Happens Next! | MPrashant', duration: '27:48' },
    { title: 'What is LVM in Linux with Example in Hindi | MPrashant', duration: '35:34' },
    { title: 'SELinux in Linux [HINDI] | MPrashant', duration: '22:45' },
    { title: 'Ultimate DNS Server & Apache Setup Guide with Custom Domain | DNS Config with Example | MPrashant', duration: '35:46' },
    { title: 'Mastering Linux AWK and CUT commands: Essential Linux skills for beginners', duration: '23:12' },
    { title: 'Discover How to Access Your Linux Server with Ease - Linux Cockpit! A Web Interface for Linux Server', duration: '10:03' },
    { title: 'PART 1 | 60 Linux Questions for Job Interview Preparation in Hindi in 60 min with Answer | Linux QnA', duration: '56:41' },
    { title: 'PART 2 | 70 Linux Questions for Job Interview Preparation in Hindi in 60 min with Answer | Linux QnA', duration: '1:06:56' },
    { title: '100 Linux Questions for Experienced, Job Interview & Exams | MPrashant', duration: '1:04:00' },
    { title: 'PART 3 | 50 Linux Shell Scripting Questions for Job Interview & Exam in Hindi | MPrashant', duration: '40:13' },
    { title: 'Linux Interview Question: How to Find Largest or Biggest file in a Linux Directory | In Hindi', duration: '12:21' },
    { title: 'Shell Scripting Project 1 | Linux Shell Scripting Project | Digital Clock Using Shell Scripting', duration: '9:19' },
    { title: 'Shell Scripting Project -2 | Archive Older Log Files | MPrashant', duration: '28:46' },
    { title: 'Shell Scripting Project -3 | Create Users on Linux using Shell Script | MPrashant', duration: '29:00' },
    { title: 'Get Started with MySQL and CRUD on Linux CLI | How to Install MySQL on Linux? | MPrashant', duration: '33:06' },
    { title: 'Linux Basic Commands in One Video | Linux for beginners in HINDI', duration: '45:45' },
    { title: 'How to Change Hostname in Linux? Change Hostname Ubuntu Hindi | MPrashant', duration: '1:23' },
    { title: 'How to Send Email from Linux using SendMail Hindi | Linux SENDMAIL Tutorial', duration: '10:02' },
    { title: 'How to Install and Setup JAVA on Linux? | Compile Java on Linux | MPrashant', duration: '11:57' },
    { title: 'How to Send Email in Linux using Python | Easy Way of Sending Email in Linux in Hindi', duration: '6:04' },
    { title: 'The Ultimate Guide to Linux Hardening: Boost Your System Security [HINDI]', duration: '16:36' },
    { title: 'Linux BOOT PROCESS Explained (UEFI, GRUB, Kernel & systemd) [HINDI] | MPrashant', duration: '23:54' }
  ]

  const handleVideoSelect = (videoIndex) => {
    console.log('Switching to video index:', videoIndex)
    setCurrentVideoIndex(videoIndex)
    // Mark video as watched
    setWatchedVideos(prev => new Set([...prev, videoIndex]))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const progressPercentage = (watchedVideos.size / videos.length) * 100

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/lms-portal')}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg">
                <img
                  src="/assets/images/ltsu-custom-logo.png"
                  alt="Helixa IQ Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">🐧 Linux Video Course</h1>
                <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`h-[calc(100vh-80px)] ${isFullscreen ? 'flex flex-col' : 'flex'}`}>
        {/* Video Player Section */}
        <div className={`${isFullscreen ? 'w-full' : 'w-1/2'} bg-gray-900 p-6`}>
          <div className="h-full">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 h-full">
              {/* Video Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">
                    {videos[currentVideoIndex]?.title || 'Linux Tutorial'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Duration: {videos[currentVideoIndex]?.duration || 'N/A'}
                  </p>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded-lg"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-7 7m0 0l7 7m-7-7h7m-7 7v7m7-7H3m7 7l-7-7m7 7V3m0 7H3" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <div
                  ref={playerRef}
                  className="w-full h-full"
                  id="youtube-player-linux"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className={`${isFullscreen ? 'w-full bg-gray-800 p-6' : 'w-1/2 bg-gray-800 border-l border-gray-700 p-6'} overflow-y-auto`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Linux Course Playlist</h2>
            <p className="text-gray-400 text-sm">Select a video to start watching</p>
          </div>

          <div className={`space-y-3 ${isFullscreen ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : ''}`}>
            {videos.map((video, index) => (
              <div
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  index === currentVideoIndex
                    ? 'bg-blue-600/20 border-blue-500'
                    : watchedVideos.has(index)
                    ? 'bg-green-600/10 border-green-500'
                    : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentVideoIndex
                      ? 'bg-blue-600 text-white'
                      : watchedVideos.has(index)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium truncate ${
                      index === currentVideoIndex ? 'text-white' : 'text-gray-300'
                    }`}>
                      {video.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      Duration: {video.duration}
                    </p>
                    {watchedVideos.has(index) && index !== currentVideoIndex && (
                      <div className="flex items-center mt-1">
                        <svg className="w-3 h-3 text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-400 text-xs">Watched</span>
                      </div>
                    )}
                  </div>
                  {index === currentVideoIndex && (
                    <div className="text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
            <h3 className="text-white font-medium mb-2">Course Progress</h3>
            <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-gray-400 text-xs">{watchedVideos.size} of {videos.length} videos completed ({Math.round(progressPercentage)}%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinuxVideoPlayer