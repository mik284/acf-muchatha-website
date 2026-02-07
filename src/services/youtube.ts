// YouTube API Types
interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

interface YouTubeSnippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  };
  playlistTitle?: string;
}

interface YouTubeContentDetails {
  duration: string;
  itemCount?: number;
}

interface YouTubePlaylistItem {
  id: string;
  snippet: YouTubeSnippet & {
    resourceId: {
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
  };
}

interface YouTubeVideoItem {
  id: string;
  snippet: YouTubeSnippet;
  contentDetails: YouTubeContentDetails;
}

interface YouTubePlaylistResponse {
  items: Array<{
    id: string;
    snippet: YouTubeSnippet;
    contentDetails: YouTubeContentDetails;
  }>;
}

interface YouTubeVideoResponse {
  items: YouTubeVideoItem[];
}

interface YouTubeChannelResponse {
  items: Array<{
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }>;
}

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
// const MAX_RESULTS = 50;

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoId: string;
  duration: string;
  playlistId?: string;
  playlistTitle?: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  itemCount: number;
  videos: YouTubeVideo[];
}

// Cache for storing API responses
const cache: Record<string, unknown> = {};

async function fetchFromYouTube<T>(url: string, cacheKey: string): Promise<T> {
  if (cache[cacheKey]) {
    return cache[cacheKey] as T;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }
    const data = await response.json() as T;
    cache[cacheKey] = data;
    return data;
  } catch (error) {
    console.error('Error fetching from YouTube API:', error);
    throw error;
  }
}

export async function fetchPlaylists(): Promise<YouTubePlaylist[]> {
  if (!API_KEY || !CHANNEL_ID) {
    console.error('YouTube API key or Channel ID is not configured');
    return [];
  }

  try {
    // Fetch all playlists from the channel
    const playlistsUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`;
    const playlistsData = await fetchFromYouTube<YouTubePlaylistResponse>(playlistsUrl, 'playlists');

    // Fetch videos for each playlist
    const playlists: YouTubePlaylist[] = [];
    
    for (const playlist of playlistsData.items) {
      const playlistVideos = await fetchPlaylistVideos(playlist.id);
      
      playlists.push({
        id: playlist.id,
        title: playlist.snippet.title,
        description: playlist.snippet.description,
        thumbnailUrl: playlist.snippet.thumbnails?.high?.url || '',
        itemCount: playlist.contentDetails.itemCount || 0,
        videos: playlistVideos,
      });
    }

    return playlists;
  } catch (error) {
    console.error('Error fetching YouTube playlists:', error);
    return [];
  }
}

async function fetchPlaylistVideos(playlistId: string): Promise<YouTubeVideo[]> {
  if (!API_KEY) return [];

  try {
    const playlistItemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
    const playlistItemsData = await fetchFromYouTube<{ items: YouTubePlaylistItem[] }>(playlistItemsUrl, `playlist_${playlistId}`);

    if (!playlistItemsData.items || playlistItemsData.items.length === 0) {
      return [];
    }

    // Get video details including duration
    const videoIds = playlistItemsData.items.map(item => item.contentDetails.videoId).join(',');
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${API_KEY}`;
    const videosData = await fetchFromYouTube<YouTubeVideoResponse>(videosUrl, `videos_${videoIds}`);

    return videosData.items.map((video) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      thumbnailUrl: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url || '',
      videoId: video.id,
      duration: formatDuration(video.contentDetails.duration),
      playlistId,
      playlistTitle: playlistItemsData.items[0].snippet.playlistTitle,
    }));
  } catch (error) {
    console.error(`Error fetching videos for playlist ${playlistId}:`, error);
    return [];
  }
}

export async function fetchSermons(): Promise<YouTubeVideo[]> {
  if (!API_KEY || !CHANNEL_ID) {
    console.error('YouTube API key or Channel ID is not configured');
    return [];
  }

  try {
    // First, get the uploads playlist ID from the channel
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
    const channelData = await fetchFromYouTube<YouTubeChannelResponse>(channelUrl, 'channel');
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found or no uploads playlist available');
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    
    // Get videos from the uploads playlist (videos not in any other playlist)
    return await fetchPlaylistVideos(uploadsPlaylistId);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

// Helper function to format ISO 8601 duration to HH:MM:SS
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
