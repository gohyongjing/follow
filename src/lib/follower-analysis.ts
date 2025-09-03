import JSZip from 'jszip';
import { ComparisonResult } from '@/types/follower-analysis';

export const extractFollowersAndFollowing = async (
  zipFile: File
): Promise<ComparisonResult> => {
  const zip = new JSZip();
  const zipContent = await zip.loadAsync(zipFile);

  let followers: string[] = [];
  let following: string[] = [];

  // Look for common file patterns in social media data exports
  const fileNames = Object.keys(zipContent.files);
  // Try to find followers and following files (including nested directories)
  const followersFile = fileNames.find(
    name =>
      (name.toLowerCase().includes('followers_') ||
        name.toLowerCase().endsWith('followers.json')) &&
      name.endsWith('.json') &&
      !name.includes('__MACOSX') &&
      !name.includes('/._') &&
      !name.includes('follow_requests') &&
      !name.includes('recently_unfollowed') &&
      !name.includes('close_friends')
  );

  const followingFile = fileNames.find(
    name =>
      name.toLowerCase().includes('following') &&
      name.endsWith('.json') &&
      !name.includes('__MACOSX') &&
      !name.includes('/._') &&
      !name.includes('follow_requests') &&
      !name.includes('recently_unfollowed') &&
      !name.includes('close_friends')
  );

  if (followersFile) {
    const followersContent =
      await zipContent.files[followersFile].async('string');
    followers = parseUserList(followersContent);
  }

  if (followingFile) {
    const followingContent =
      await zipContent.files[followingFile].async('string');
    following = parseUserList(followingContent);
  }

  // If we couldn't find specific files, try to parse all JSON files
  if (!followersFile || !followingFile) {
    for (const fileName of fileNames) {
      if (
        fileName.endsWith('.json') &&
        !fileName.includes('__MACOSX') &&
        !fileName.includes('/._') &&
        !fileName.includes('.DS_Store')
      ) {
        try {
          const content = await zipContent.files[fileName].async('string');
          const users = parseUserList(content);

          // Try to determine if this is followers or following based on file name or content
          if (
            fileName.toLowerCase().includes('followers') ||
            fileName.toLowerCase().includes('follower')
          ) {
            followers = users;
          } else if (
            fileName.toLowerCase().includes('following') ||
            fileName.toLowerCase().includes('follows')
          ) {
            following = users;
          } else if (followers.length === 0) {
            // Assume first file is followers if we haven't found any yet
            followers = users;
          } else if (following.length === 0) {
            // Assume second file is following
            following = users;
          }
        } catch (error) {
          console.warn(`Could not parse file ${fileName}:`, error);
        }
      }
    }
  }

  // Calculate comparison results
  const notFollowingBack = followers.filter(
    follower => !following.includes(follower)
  );
  const notFollowedBack = following.filter(
    followedUser => !followers.includes(followedUser)
  );
  const mutualFollowers = followers.filter(follower =>
    following.includes(follower)
  );

  return {
    followers,
    following,
    notFollowingBack,
    notFollowedBack,
    mutualFollowers,
  };
};
export const parseUserList = (content: string): string[] => {
  const users: string[] = [];

  try {
    // Parse as JSON
    const jsonData = JSON.parse(content);

    // Handle Instagram's specific structure
    if (
      jsonData.relationships_following &&
      Array.isArray(jsonData.relationships_following)
    ) {
      // This is the following file structure
      for (const item of jsonData.relationships_following) {
        if (item.string_list_data && Array.isArray(item.string_list_data)) {
          for (const dataItem of item.string_list_data) {
            if (dataItem.value && typeof dataItem.value === 'string') {
              users.push(dataItem.value);
            }
          }
        }
      }
    } else if (Array.isArray(jsonData)) {
      // This is the followers file structure (direct array)
      for (const item of jsonData) {
        if (item.string_list_data && Array.isArray(item.string_list_data)) {
          for (const dataItem of item.string_list_data) {
            if (dataItem.value && typeof dataItem.value === 'string') {
              users.push(dataItem.value);
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
  }

  return users;
};
