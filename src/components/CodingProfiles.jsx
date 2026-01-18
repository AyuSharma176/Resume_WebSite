import React, { useState, useEffect } from 'react'
import { SiLeetcode, SiCodeforces } from 'react-icons/si'

const CodingProfiles = () => {
  const [leetcodeData, setLeetcodeData] = useState(null)
  const [codeforcesData, setCodeforcesData] = useState(null)
  const [loading, setLoading] = useState({ leetcode: true, codeforces: true })
  const [error, setError] = useState({ leetcode: false, codeforces: false })

  // Replace these with your actual usernames
  const LEETCODE_USERNAME = 'ayusharmaa'
  const CODEFORCES_USERNAME = 'Ayusharma17'

  // Fetch LeetCode data
  useEffect(() => {
    // Prevent double API calls in React Strict Mode (dev mode)
    let isCancelled = false
    
    const fetchLeetcodeData = async () => {
      try {
        // Cache version - increment this to force refresh for all users
        const CACHE_VERSION = '5'
        const cachedVersion = localStorage.getItem('leetcode_cache_version')
        
        // Clear old cache if version changed OR if cached data has 0 problems
        const cachedData = localStorage.getItem('leetcode_data')
        const shouldClearCache = cachedVersion !== CACHE_VERSION || 
          (cachedData && JSON.parse(cachedData).totalSolved === 0)
        
        if (shouldClearCache) {
          console.log('🔄 Clearing cache - fetching fresh data...')
          localStorage.removeItem('leetcode_data')
          localStorage.removeItem('leetcode_cache_time')
          localStorage.setItem('leetcode_cache_version', CACHE_VERSION)
        }
        
        // Check localStorage cache first (cache for 1 hour)
        const cachedDataCheck = localStorage.getItem('leetcode_data')
        const cacheTime = localStorage.getItem('leetcode_cache_time')
        
        if (cachedDataCheck && cacheTime) {
          const parsedCache = JSON.parse(cachedDataCheck)
          // Only use cache if it has valid data (> 0 problems)
          if (parsedCache.totalSolved > 0) {
            const minutesSinceCache = (Date.now() - parseInt(cacheTime)) / (1000 * 60)
            if (minutesSinceCache < 60) {
              console.log('✅ Using cached LeetCode data (cached ' + minutesSinceCache.toFixed(0) + ' minutes ago)')
              if (!isCancelled) {
                setLeetcodeData(parsedCache)
                setLoading(prev => ({ ...prev, leetcode: false }))
              }
              return
            }
          }
        }

        console.log('🔄 Fetching fresh LeetCode data...')
        
        // Try to fetch from API with multiple endpoint fallbacks
        // Based on https://github.com/alfaarghya/alfa-leetcode-api
        const endpoints = [
          {
            url: `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`,
            transform: (data) => ({
              totalSolved: data.totalSolved || 0,
              easySolved: data.easySolved || 0,
              mediumSolved: data.mediumSolved || 0,
              hardSolved: data.hardSolved || 0,
              ranking: data.ranking || 0,
              contestRating: data.contestRating || 0,
              contestAttend: data.contestAttend || 0,
              contestGlobalRanking: data.contestGlobalRanking || 0
            })
          },
          {
            url: `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`,
            transform: (data) => ({
              totalSolved: data.solvedProblem || 0,
              easySolved: data.easySolved || 0,
              mediumSolved: data.mediumSolved || 0,
              hardSolved: data.hardSolved || 0,
              ranking: data.ranking || 0,
              contestRating: data.contestRating || 0,
              contestAttend: data.contestAttend || 0,
              contestGlobalRanking: data.contestGlobalRanking || 0
            })
          }
        ]

        let fetchSuccess = false
        let lastError = null
        let mainData = null
        
        for (const endpoint of endpoints) {
          try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
            
            const response = await fetch(endpoint.url, { signal: controller.signal })
            clearTimeout(timeoutId)
            
            if (response.status === 429) {
              console.log('⚠️ Rate limited on', endpoint.url)
              lastError = new Error('Rate limited')
              continue
            }
            
            if (response.ok) {
              const data = await response.json()
              console.log('📦 Raw API response:', data) // Debug log
              
              const transformedData = endpoint.transform(data)
              console.log('🔄 Transformed data:', transformedData) // Debug log
              
              // Validate the data - totalSolved should be a positive number
              if (transformedData.totalSolved > 0 && !isCancelled) {
                mainData = transformedData
                fetchSuccess = true
                break
              } else if (transformedData.totalSolved === 0) {
                console.log('⚠️ API returned 0 problems - trying next endpoint')
                lastError = new Error('Invalid data: 0 problems')
                continue
              }
            } else {
              lastError = new Error(`HTTP ${response.status}`)
            }
          } catch (err) {
            console.log('❌ Failed endpoint:', endpoint.url, err.message)
            lastError = err
            continue
          }
        }
        
        // If we got the main data, try to fetch contest data separately
        if (fetchSuccess && mainData) {
          try {
            console.log('🏆 Fetching contest data...')
            const contestResponse = await fetch(
              `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/contest`
            )
            
            if (contestResponse.ok) {
              const contestData = await contestResponse.json()
              console.log('📦 Contest API response:', contestData)
              
              // Merge contest data with main data
              mainData.contestRating = contestData.contestRating || 0
              mainData.contestAttend = contestData.contestAttend || 0
              mainData.contestGlobalRanking = contestData.contestGlobalRanking || 0
              console.log('✅ Contest data merged:', mainData)
            }
          } catch (err) {
            console.log('⚠️ Contest data fetch failed (continuing with main data):', err.message)
          }
          
          // Save the data
          if (!isCancelled) {
            setLeetcodeData(mainData)
            
            // Cache the successful result for 1 hour
            localStorage.setItem('leetcode_data', JSON.stringify(mainData))
            localStorage.setItem('leetcode_cache_time', Date.now().toString())
            console.log('✅ Fetched from alfa-leetcode-api:', mainData.totalSolved, 'problems solved')
          }
        }
        
        if (!fetchSuccess) {
          throw lastError || new Error('All API endpoints failed')
        }
        
      } catch (err) {
        console.error('❌ LeetCode API error:', err.message)
        if (!isCancelled) {
          setError(prev => ({ ...prev, leetcode: true }))
        }
      } finally {
        if (!isCancelled) {
          setLoading(prev => ({ ...prev, leetcode: false }))
        }
      }
    }

    if (LEETCODE_USERNAME && LEETCODE_USERNAME !== 'your_leetcode_username') {
      fetchLeetcodeData()
    } else {
      setLoading(prev => ({ ...prev, leetcode: false }))
    }

    // Cleanup function to prevent state updates after unmount
    return () => {
      isCancelled = true
    }
  }, [])

  // Fetch Codeforces data
  useEffect(() => {
    const fetchCodeforcesData = async () => {
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.info?handles=${CODEFORCES_USERNAME}`
        )
        if (!response.ok) throw new Error('Failed to fetch Codeforces data')
        const data = await response.json()
        if (data.status === 'OK' && data.result && data.result.length > 0) {
          setCodeforcesData(data.result[0])
        } else {
          throw new Error('No data found')
        }
      } catch (err) {
        console.error('Codeforces fetch error:', err)
        setError(prev => ({ ...prev, codeforces: true }))
      } finally {
        setLoading(prev => ({ ...prev, codeforces: false }))
      }
    }

    if (CODEFORCES_USERNAME && CODEFORCES_USERNAME !== 'your_codeforces_username') {
      fetchCodeforcesData()
    } else {
      setLoading(prev => ({ ...prev, codeforces: false }))
    }
  }, [])

  // Get rating color for Codeforces
  const getRatingColor = (rating) => {
    if (rating >= 2400) return '#ff0000' // Red
    if (rating >= 2100) return '#ff8c00' // Orange
    if (rating >= 1900) return '#aa00aa' // Purple
    if (rating >= 1600) return '#0000ff' // Blue
    if (rating >= 1400) return '#03a89e' // Cyan
    if (rating >= 1200) return '#00aa00' // Green
    return '#808080' // Gray
  }

  return (
    <section id="coding-profiles" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 relative inline-block">
          Competitive Programming
          <span className="absolute bottom-0 left-0 w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LeetCode Card */}
          <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 border border-slate-700/50 hover:border-yellow-500/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-600 text-white rounded-xl text-2xl shadow-md">
                <SiLeetcode />
              </div>
              <h3 className="text-2xl font-bold text-white">LeetCode</h3>
            </div>

            {loading.leetcode ? (
              <div className="space-y-4">
                <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded animate-pulse w-1/2"></div>
              </div>
            ) : error.leetcode || !leetcodeData ? (
              <div className="text-slate-400">
                <p className="mb-4">Unable to fetch LeetCode data</p>
                <a
                  href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 underline"
                >
                  View Profile →
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 p-4 rounded-lg col-span-2">
                    <p className="text-slate-400 text-sm mb-1">Total Solved</p>
                    <p className="text-3xl font-bold text-cyan-400">
                      {leetcodeData.totalSolved || 0}
                    </p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm mb-1">Easy</p>
                    <p className="text-2xl font-bold text-green-400">
                      {leetcodeData.easySolved || 0}
                    </p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm mb-1">Medium</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {leetcodeData.mediumSolved || 0}
                    </p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg col-span-2">
                    <p className="text-slate-400 text-sm mb-1">Hard</p>
                    <p className="text-2xl font-bold text-red-400">
                      {leetcodeData.hardSolved || 0}
                    </p>
                  </div>
                </div>
                {leetcodeData.ranking > 0 && (
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm mb-1">Global Ranking</p>
                    <p className="text-xl font-bold text-purple-400">
                      #{leetcodeData.ranking.toLocaleString()}
                    </p>
                  </div>
                )}
                {leetcodeData.contestRating > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm mb-1">Contest Rating</p>
                      <p className="text-xl font-bold text-orange-400">
                        {Math.round(leetcodeData.contestRating)}
                      </p>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <p className="text-slate-400 text-sm mb-1">Contests</p>
                      <p className="text-xl font-bold text-blue-400">
                        {leetcodeData.contestAttend || 0}
                      </p>
                    </div>
                  </div>
                )}
                <a
                  href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-300"
                >
                  View Profile →
                </a>
              </div>
            )}
          </div>

          {/* Codeforces Card */}
          <div className="bg-slate-800/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-slate-700/50 hover:border-blue-500/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700 text-white rounded-xl text-2xl shadow-md">
                <SiCodeforces />
              </div>
              <h3 className="text-2xl font-bold text-white">Codeforces</h3>
            </div>

            {loading.codeforces ? (
              <div className="space-y-4">
                <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded animate-pulse w-1/2"></div>
              </div>
            ) : error.codeforces || !codeforcesData ? (
              <div className="text-slate-400">
                <p className="mb-4">Unable to fetch Codeforces data</p>
                <a
                  href={`https://codeforces.com/profile/${CODEFORCES_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  View Profile →
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm mb-1">Current Rating</p>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: getRatingColor(codeforcesData.rating) }}
                    >
                      {codeforcesData.rating || 0}
                    </p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm mb-1">Max Rating</p>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: getRatingColor(codeforcesData.maxRating) }}
                    >
                      {codeforcesData.maxRating || 0}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm mb-1">Contests</p>
                    <p className="text-2xl font-bold text-cyan-400">
                      {codeforcesData.rating ? Math.floor(codeforcesData.rating / 100) : 0}+
                    </p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <p className="text-slate-400 text-sm mb-1">Rank</p>
                    <p className="text-lg font-bold text-purple-400">
                      {codeforcesData.rank || 'Unrated'}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://codeforces.com/profile/${CODEFORCES_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  View Profile →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CodingProfiles
